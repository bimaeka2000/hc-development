import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuestMiddleware {
  public async handle({ auth, response }: HttpContext, next: NextFn) {

    // Jika pengguna SUDAH LOGIN (auth.isAuthenticated atau auth.user terisi)
    if (auth.isAuthenticated) {
      // Redirect mereka ke dashboard (karena tidak perlu login lagi)
      return response.json({
        message: 'sudah login '
      })
      return response.redirect().toRoute('dashboard.index')
    }

    // Jika belum login, lanjutkan ke controller (render form login)
    await next()
  }
}