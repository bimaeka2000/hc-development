import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

export default class ShareRoleMiddleware {
  public async handle({ session, view, auth, response }: HttpContext, next: () => Promise<void>) {
    let userRole = null

    const userGoogle = session.get('user_google')

    if (userGoogle?.email) {
      userRole = await User.query().where('email', userGoogle.email).first()
    } else if (auth.user) {
      userRole = auth.user
    }

    // ✅ Selalu share meskipun null
    view.share({ userRole })

    await next()
  }
}
