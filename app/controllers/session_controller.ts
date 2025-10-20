import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { middleware } from '#start/kernel'

export default class SessionController {
  async store({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      await User.accessTokens.create(user, ['*'], {
        name: 'bearer-token',
        expiresIn: '30 days',
      })

      return response.redirect().toRoute('dashboard.index')
      // #TODO tampilkan alert selamat datang telah login di dashboard hc
    } catch (error) {
      console.log(error.message)
      // return response.redirect().toPath('/login')
    }
  }

  async destroy({ request, auth, response }: HttpContext) {
    return await auth.use('api').invalidateToken()
  }

  async logOut({ auth, response }: HttpContext) {
    this.destroy
    await auth.use('web').logout()
    return response.redirect('/')
  }
}
