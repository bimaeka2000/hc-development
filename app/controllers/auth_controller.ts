import type { HttpContext } from '@adonisjs/core/http'
import { OAuth2Client } from 'google-auth-library'
import env from '#start/env'

export default class AuthController {
  private googleClient = new OAuth2Client({
    clientId: env.get('CLIENT_ID_SSO'),
    clientSecret: env.get('CLIENT_SECRET_SSO'),
    redirectUri: env.get('REDIRECT_URI_SSO'),
  })

  async redirectToGoogle({ response }: HttpContext) {
    const url = this.googleClient.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: [
        'email',
        'profile',
        'openid',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ],
      hd: 'satyaterrabhinneka.ac.id', // opsional, hanya izinkan domain ini
    })
    return response.redirect(url)
  }

  async googleCallback({ request, response, session }: HttpContext) {
    const code = request.input('code')

    if (!code) {
      return response.badRequest({ error: 'Missing authorization code' })
    }

    // Tukar code jadi token
    const { tokens } = await this.googleClient.getToken(code)
    this.googleClient.setCredentials(tokens)

    // Verifikasi ID Token
    const ticket = await this.googleClient.verifyIdToken({
      idToken: tokens.id_token!,
      audience: env.get('CLIENT_ID_SSO'),
    })
    const payload = ticket.getPayload()

    if (!payload?.email) return response.badRequest({ error: 'Email tidak ditemukan di Google' })
    //    #NOTE Simpan informasi user di session atau database sesuai kebutuhan aplikasi Anda
    response.cookie('user', payload.email, {
      httpOnly: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    })

    await session.put('user_google', payload)
    return response.redirect('/checkuser')
  }
}
