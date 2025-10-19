import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import Pegawai from '#models/pegawai'
import * as crypto from 'node:crypto'
import Hash from '@adonisjs/core/services/hash'
export default class DashboardController {
  async checkUser({ response, session, auth, request }: HttpContext) {
    const userGoogle = session.get('user_google')

    const generated = crypto.randomBytes(16).toString('hex') // random 32-char string
    const hashed = await Hash.make(generated)

    // Jalankan dalam TRANSACTION

    const trx = await db.transaction()

    try {
      // Cek user
      let user = await User.query({ client: trx }).where('email', userGoogle.email).first()

      if (!user) {
        // 1️⃣ Buat pegawai baru

        let pegawai = await Pegawai.create(
          {
            nama_lengkap: userGoogle.name,
            role_id: 2,
          },
          { client: trx }
        )

        // buat baru
        await User.create(
          {
            pegawai_id: pegawai.id,
            email: userGoogle.email,
            name: userGoogle.name,
            picture: userGoogle.picture,
            password: hashed,
            role: 'admin',
          },
          { client: trx }
        )
      } else {
        // update data kalau berubah
        user.name = userGoogle.name
        user.picture = userGoogle.picture
        await user.useTransaction(trx).save()
      }

      await trx.commit()
      // 🔁 Ambil ulang user supaya jadi instance model aktif
      user = await User.findByOrFail('email', userGoogle.email)

      await User.accessTokens.create(user, ['*'], {
        name: 'bearer-token',
        expiresIn: '30 days',
      })

      return response.redirect().toRoute('dashboard.index')
    } catch (error) {
      await trx.rollback()
      console.error(error)
      return response.badRequest({
        message: 'Gagal membuat data',
        error: error.message,
      })
    }
  }
  async index({ view, session }: HttpContext) {
    const userGoogle = session.get('user_google')
    const email = userGoogle?.email
    const user = await User.findBy('email', email)

    return view.render('layouts/dashboard', { user })
  }
}
