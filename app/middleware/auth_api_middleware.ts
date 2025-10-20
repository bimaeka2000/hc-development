import type { HttpContext } from '@adonisjs/core/http'
import ApiResponse from '#services/api_response'

export default class AuthApiMiddleware {
  public async handle({ auth, response, request }: HttpContext, next: () => Promise<void>) {
    try {
      await auth.use('web').authenticate()
      await next()
    } catch {
      return response
        .status(403)
        .json(ApiResponse.error('Akses ditolak. Silakan login terlebih dahulu.', 403))
    }
  }
}
