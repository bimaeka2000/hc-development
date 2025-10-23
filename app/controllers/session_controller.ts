import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionController {
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await User.accessTokens.create(user, ['*'], {
        name: 'bearer-token',
        expiresIn: '30 days',
      })
      // const token = await auth.use('api').createToken(user)
      await auth.use('web').login(user) // return response.json(token)
      await response.redirect().toRoute('dashboard.index')
    } catch (error) {
      console.log(error.message)
      return response.redirect('/login')
    }
  }

  async destroy({ request, auth, response }: HttpContext) {
    return await auth.use('api').invalidateToken()
  }

  async logOut({ auth, response, session }: HttpContext) {
    // this.destroy
    session.forget('user_google')
    session.forget('user')

    response.clearCookie('state')
    response.clearCookie('google_token')
    response.clearCookie('user')
    response.clearCookie('adonis-session') // tambahkan ini kalau pakai session cookie

    await auth.use('web').logout()
    return response.redirect('/')
  }
}
