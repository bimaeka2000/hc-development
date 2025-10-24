import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user' // Asumsi Anda ingin mengimpor model User untuk tipe

export default class ShareUserMiddleware {
  public async handle({ auth, view, session, response, request }: HttpContext, next: () => Promise<void>) {

    const userGoogle = session.get('user_google')
    const userCredentials = session.get('user_credentials')
    const pegawaiId = (userCredentials && typeof userCredentials === 'object' && userCredentials.id)
      ? userCredentials.id
      : null

    let user = null

    try {
      // Cek user dari session (Google)

      if (userGoogle) {
        const idUser = await User.findBy('email', userGoogle.email)
        user = {
          id: idUser?.id,
          name: userGoogle.name,
          email: userGoogle.email,
          picture: userGoogle.picture,
          source: 'google',
        }
      }
      // Kalau tidak ada, ambil user manual dari auth guard
      else if (auth.user) {
        user = {
          id: auth.user.id,
          name: auth.user.name,
          email: auth.user.email,
          picture: auth.user.picture ?? null,
          source: 'manual',
        }

      }

      // Share ke semua view Edge
      view.share({ user })
    } catch (error) {

      view.share({ user: null })
    }
    await next()


  }
  // public async handle({ auth, view, session }: HttpContext, next: () => Promise<void>) {
  //   // Pastikan sudah login
  //   const user = session.get('user_google')

  //   // Kirim user ke semua view Edge
  //   view.share({
  //     user: user || null,
  //   })
  //   await next()
  // }


}
