/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PagesController = () => import('#controllers/pages_controller')
const ProfilCardsController = () => import('#controllers/profil_cards_controller')
const PegawaisController = () => import('#controllers/pegawais_controller')

router.get('/', async ({ view }) => {
    return view.render('layouts/dashboard')
})

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
