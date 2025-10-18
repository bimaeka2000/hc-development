import type { HttpContext } from '@adonisjs/core/http'
import { OAuth2Client } from 'google-auth-library'
import env from '#start/env'
import User from '#models/user'

export default class AuthController {

    private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

    async googleCallback({ request, auth, response, params }: HttpContext) {

        const token = request.input('credential')

        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()
        if (!payload) {
            return response.badRequest('Invalid Google token')
        }

        const { email, name } = payload

        // 🔹 Simpan atau temukan user di database
        const user = await User.firstOrCreate(
            { email },
            { name }
        )

        // ✅ Buat access token
        const bearerToken = await auth.use('api').createToken(user)

        // ✅ Kirim token ke frontend (bisa disimpan di localStorage / cookie secure)
        return response.json({
            message: 'Login berhasil via Google!',
            user,
            token: bea, // { type: 'bearer', token: 'xxx', expires_at: '...' }
        })
    }
}