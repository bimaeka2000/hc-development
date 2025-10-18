/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import env from '#start/env'

import { middleware } from './kernel.js'
const PagesController = () => import('#controllers/pages_controller')
const ProfilCardsController = () => import('#controllers/profil_cards_controller')
const PegawaisController = () => import('#controllers/pegawais_controller')
const SessionController = () => import('#controllers/session_controller')
const AuthController = () => import('#controllers/auth_controller')


router.get('/', async ({ view }) => {
    const clientIdSso = env.get('CLIENT_ID_SSO')
    const redirectUri = env.get('REDIRECT_URI_SSO')
    console.log('Redirect URI SSO:', redirectUri)
    console.log('Redirect URI SSO:', clientIdSso)
    return view.render('sso/login', { clientIdSso, redirectUri })
})

router.post('http://localhost:3333/auth/google/callback', [AuthController, 'googleCallback'])


router.get('/logout', [SessionController, 'logOut']).as('logout')
router.post('session', [SessionController, 'store'])
router.delete('destroy', [SessionController, 'destroy'])
    .use(middleware.auth({ guards: ['api'] }))


router.get('/dashboard', async ({ view }) => {
    return view.render('layouts/dashboard')
})
    .as('dashboard.index')

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
