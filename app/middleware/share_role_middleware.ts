import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export default class ShareRoleMiddleware {
  public async handle({ session, view }: HttpContext, next: () => Promise<void>) {
    let userRole = null

    try {
      // Ambil data dari session (hasil login Google)
      const userGoogle = session.get('user_google')

      if (userGoogle?.email) {
        // Ambil user dari database berdasarkan email
        userRole = await User.query().where('email', userGoogle.email).first()
      }
    } catch (error) {
      console.error('❌ Middleware ShareUser error:', error)
    }

    // Bagi user ke semua view Edge (layout, partial, dll)
    view.share({ userRole })

    await next()
  }
}
