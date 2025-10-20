import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'
const PagesController = () => import('#controllers/pages_controller')
const ProfilCardsController = () => import('#controllers/profil_cards_controller')
const PegawaisController = () => import('#controllers/pegawais_controller')
const SessionController = () => import('#controllers/session_controller')
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const ProfilsControllerApi = () => import('#controllers/Http/Api/V1/profils_controller')
const ProfilsControllerWeb = () => import('#controllers/Http/Web/V1/profils_controller')

// #NOTE Route login
router.get('/', async ({ view }) => {
  return view.render('login')
})

// #NOTE SSO Goolgle OAuth2
router.get('/auth/google/redirect', [AuthController, 'redirectToGoogle']).as('google.redirect')
router.get('/auth/google/callback', [AuthController, 'googleCallback'])
router.get('/checkuser', [DashboardController, 'checkUser'])

// #NOTE Session routes
router.post('session', [SessionController, 'store'])
router.delete('destroy', [SessionController, 'destroy'])

router
  .group(() => {
    router.get('/logout', [SessionController, 'logOut']).as('logout')
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard.index')
    router
      .group(() => {
        router.resource('/pegawai', PegawaisController)
        router.get('/cuti', [PagesController, 'Cuti'])
        router.get('/sakit', [PagesController, 'Sakit'])
        router.get('/izin', [PagesController, 'Izin'])
        router.get('/penelitian', [PagesController, 'Penelitian'])
        router.get('/pengabdian', [PagesController, 'Pengabdian'])
        router.get('/users', [PagesController, 'Users'])
        router.get('/edit/:page', [PagesController, 'EditPage']).as('dashboard.edit')
        // #NOTE tambah semua web controller disini
        router.resource('web/profil', ProfilsControllerWeb)
      })
      .prefix('dashboard')
  })
  .use(middleware.authView())
  .use(middleware.auth({ guards: ['web'] })) // gunakan session guard

// #NOTE tambah semua api controller disini

router
  .group(() => {
    router.resource('profil', ProfilsControllerApi)
  })

  .prefix('/api/v1')
  .use(middleware.authApi()) // JSON 403 kalau belum login

router.get('*', async ({ request, view, response }) => {
  response.status(404)

  if (request.url().startsWith('/api/')) {
    return response.json({
      status: false,
      message: 'Endpoint tidak ditemukan',
      code: 404,
    })
  }

  return view.render('errors/404')
})
