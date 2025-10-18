import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ShareUserMiddleware {
  public async handle({ auth, view, session }: HttpContext, next: () => Promise<void>) {
    // Pastikan sudah login
    const user = session.get('user_google')

    // Kirim user ke semua view Edge
    view.share({
      user: user || null,
    })

    await next()
  }


}