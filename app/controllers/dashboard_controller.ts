import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import Pegawai from '#models/pegawai'
import * as crypto from 'node:crypto'
import Hash from '@adonisjs/core/services/hash'

export default class DashboardController {
  async checkUser({ request, response, session, auth }: HttpContext) {
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
            role: 'pegawai',
          },
          { client: trx }
        )

      } else {
        // update data kalau berubah
        user.name = userGoogle.name
        user.picture = userGoogle.picture
        await user.useTransaction(trx).save()
      }

      if (user) {
        await session.put('user_credentials', {
          // Gunakan pegawaiId dari instance User yang sudah ada/dibuat
          id: user.id,
        })
      }

      await trx.commit()
      // 🔁 Ambil ulang user supaya jadi instance model aktif
      user = await User.findByOrFail('email', userGoogle.email)

      if (!user) {
        // Harus gagal di sini jika ada masalah besar
        throw new Error('User instance not found after transaction.')
      }
      await User.accessTokens.create(user, ['*'], {
        name: 'bearer-token',
        expiresIn: '30 days',
      })

      await auth.use('web').login(user)

      // await auth.use('web').login(
      //   user,
      //   /**
      //    * Generate token when "remember_me" input exists
      //    */
      //   !!request.input('remember_me')
      // )

      await response.redirect().toRoute('dashboard.index')
      response.clearCookie('state')
      response.clearCookie('google_token')
      response.clearCookie('user')
    } catch (error) {
      await trx.rollback()
      return response.badRequest({
        message: 'Gagal membuat data',
        error: error.message,
      })
    }
  }

  async index({ view, session, auth, response }: HttpContext) {
    try {
      // 1️⃣ Coba ambil user dari session (Google SSO)
      const userGoogle = session.get('user_google')
      const userAuth = auth?.user
      let user = null

      if (userGoogle?.email) {
        user = await User.findBy('email', userGoogle.email)
      }
      // 2️⃣ Kalau tidak ada session, ambil dari auth guard (login manual)
      else if (userAuth) {
        user = userAuth
      }

      // 3️⃣ Kalau dua-duanya kosong, arahkan ke login
      if (!user) {
        return response.redirect().back()
      }

      // Debug log (untuk memastikan yang aktif)
      // console.log('🧠 Active User:', user.email, '| Login via:', userGoogle ? 'Google SSO' : 'Manual')

      // 4️⃣ Kirim ke view
      return view.render('layouts/dashboard', { user })

    } catch (error) {
      // console.error('❌ Dashboard index error:', error)
      return response.internalServerError('Terjadi kesalahan di server.')
    }
  }
  // async index({ view, session, response }: HttpContext) {
  //   const userGoogle = session.get('user_google')
  //   // jika belum login atau session kosong
  //   if (!userGoogle) {
  //     return response.redirect("/login")
  //   }

  //   const email = userGoogle.email
  //   const user = await User.findBy('email', email)

  //   if (!user) {
  //     return response.status(404).send('User tidak ditemukan')
  //   }

  //   return view.render('layouts/dashboard', { user })
  // }
}
