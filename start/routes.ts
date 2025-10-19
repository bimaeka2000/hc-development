import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'
const PagesController = () => import('#controllers/pages_controller')
const ProfilCardsController = () => import('#controllers/profil_cards_controller')
const PegawaisController = () => import('#controllers/pegawais_controller')
const SessionController = () => import('#controllers/session_controller')
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', async ({ view }) => {
  return view.render('login')
})

// #NOTE SSO Goolgle OAuth2
router.get('/auth/google/redirect', [AuthController, 'redirectToGoogle']).as('google.redirect')
router.get('/auth/google/callback', [AuthController, 'googleCallback'])

router.get('/logout', [SessionController, 'logOut']).as('logout')
// #NOTE Session routes
router.post('session', [SessionController, 'store'])
router.delete('destroy', [SessionController, 'destroy'])

router.get('/checkuser', [DashboardController, 'checkUser'])
router.get('/dashboard', [DashboardController, 'index']).as('dashboard.index')

router
  .group(() => {
    router.resource('/pegawai', PegawaisController)
    // router.get('/pegawai-detail/:id', [PagesController, 'PegawaiDetail'])
    router.resource('/edit/profil', ProfilCardsController)
    router.get('/cuti', [PagesController, 'Cuti'])
    router.get('/sakit', [PagesController, 'Sakit'])
    router.get('/izin', [PagesController, 'Izin'])
    router.get('/penelitian', [PagesController, 'Penelitian'])
    router.get('/pengabdian', [PagesController, 'Pengabdian'])
    router.get('/users', [PagesController, 'Users'])
    router.get('/edit/:page', [PagesController, 'EditPage']).as('dashboard.edit')
  })
  .prefix('dashboard')
  .use(middleware.shareUser())
