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

router.get('/', async ({ view }) => {
    return view.render('layouts/dashboard')
})

router
    .group(() => {
        router.get('/pegawai', [PagesController, 'Pegawai'])
        router.get('/pegawai-detail', [PagesController, 'PegawaiDetail'])
        router.get('/cuti', [PagesController, 'Cuti'])
        router.get('/sakit', [PagesController, 'Sakit'])
        router.get('/izin', [PagesController, 'Izin'])
        router.get('/penelitian', [PagesController, 'Penelitian'])
        router.get('/pengabdian', [PagesController, 'Pengabdian'])
        router.get('/users', [PagesController, 'Users'])
    })
    .prefix('dashboard')

