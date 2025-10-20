import type { HttpContext } from '@adonisjs/core/http'

export default class AuthViewMiddleware {
  public async handle({ auth, view, response }: HttpContext, next: () => Promise<void>) {
    try {
      // ✅ Coba autentikasi dengan guard session (web)
      await auth.use('web').authenticate()
    } catch {
      // ❌ Jika gagal (belum login), tampilkan halaman 403
      return response.status(403).send(
        await view.render('errors/403', {
          message: 'Akses ditolak. Anda tidak memiliki izin untuk mengakses halaman ini.',
        })
      )
    }

    // ✅ Jika sudah login, lanjut ke request berikutnya
    await next()
  }
}
