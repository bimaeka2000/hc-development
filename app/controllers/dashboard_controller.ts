import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import User from '#models/user'
import Pegawai from '#models/pegawai'
import * as crypto from 'node:crypto'
import Hash from '@adonisjs/core/services/hash'
<<<<<<< HEAD
<<<<<<< HEAD

export default class DashboardController {

    async checkUser({ view, response, session }: HttpContext) {
=======
<<<<<<< HEAD
export default class DashboardController {
    async checkUser({ view, request, response, session }: HttpContext) {
=======
=======
>>>>>>> f3dd996 (update untuk push ke backup)

export default class DashboardController {
  async checkUser({ view, response, session }: HttpContext) {
    const userGoogle = session.get('user_google')
    // let user = await User.findBy('email', userGoogle.email)

<<<<<<< HEAD
    async checkUser({ view, response, session }: HttpContext) {
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
        const userGoogle = session.get('user_google')
        // let user = await User.findBy('email', userGoogle.email)
=======
    // saat membuat user dari Google payload
    const generated = crypto.randomBytes(16).toString('hex') // random 32-char string
    const hashed = await Hash.make(generated)
>>>>>>> f3dd996 (update untuk push ke backup)

    // Jalankan dalam TRANSACTION

    const trx = await db.transaction()

    try {
      // Cek user
      let user = await User.query({ client: trx }).where('email', userGoogle.email).first()
      if (!user) {
        // 1️⃣ Buat pegawai baru
        const pegawai = await Pegawai.create(
          {
            nama_lengkap: userGoogle.name,
            role_id: 2, // default pegawai
          },
          { client: trx }
        )

        // buat baru
        await User.create(
          {
            pegawai_id: pegawai.id, // dari hasil create Pegawai                    email: userGoogle.email,
            email: userGoogle.email,
            name: userGoogle.name,
            picture: userGoogle.picture,
            password: hashed,
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

<<<<<<< HEAD
                // buat baru
                await User.create({
                    pegawai_id: pegawai.id, // dari hasil create Pegawai                    email: userGoogle.email,
<<<<<<< HEAD
                    email: userGoogle.email,
=======
<<<<<<< HEAD
                    email: userGoogle.email, // dari hasil create Pegawai                    email: userGoogle.email,
=======
                    email: userGoogle.email,
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
                    name: userGoogle.name,
                    picture: userGoogle.picture,
                    password: hashed,
                }, { client: trx })


            } else {
                // update data kalau berubah
                user.name = userGoogle.name
                user.picture = userGoogle.picture
                await user.useTransaction(trx).save()
            }

<<<<<<< HEAD
            await trx.commit()
            // 🔁 Ambil ulang user supaya jadi instance model aktif
            user = await User.findByOrFail('email', userGoogle.email)


=======
<<<<<<< HEAD
            // 🔁 Ambil ulang user supaya jadi instance model aktif
            user = await User.findByOrFail('email', userGoogle.email)

            await trx.commit()
=======
            await trx.commit()
            // 🔁 Ambil ulang user supaya jadi instance model aktif
            user = await User.findByOrFail('email', userGoogle.email)


>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
            await User.accessTokens.create(
                user,
                ['*'],
                {
                    name: 'google-oauth2-token',
                    expiresIn: '30 days'
                }
            )

            // #TODO tampilkan alert selamat datang telah login di dashboard hc
            return view.render('layouts/dashboard', { user })
        } catch (error) {
            await trx.rollback()
            console.error(error)
            return response.badRequest({
                message: 'Gagal membuat data',
                error: error.message,
            })
        }
=======
      await User.accessTokens.create(user, ['*'], {
        name: 'google-oauth2-token',
        expiresIn: '30 days',
      })
>>>>>>> f3dd996 (update untuk push ke backup)

      // #TODO tampilkan alert selamat datang telah login di dashboard hc
      return view.render('layouts/dashboard', { user })
    } catch (error) {
      await trx.rollback()
      console.error(error)
      return response.badRequest({
        message: 'Gagal membuat data',
        error: error.message,
      })
    }
  }
}
