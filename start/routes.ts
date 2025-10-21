import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import './routes/api.js'
import './routes/web.js'

const PagesController = () => import('#controllers/pages_controller')
const PegawaisController = () => import('#controllers/pegawais_controller')
const SessionController = () => import('#controllers/session_controller')
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const ProfilCardsController = () => import('#controllers/profil_cards_controller')
const AtributAkademikCardsController = () => import('#controllers/atribut_akademik_cards_controller')
const AtributLainCardsController = () => import('#controllers/atribut_lain_cards_controller')
const DokumenCardsController = () => import('#controllers/dokumen_cards_controller')
const KeluargaCardsController = () => import('#controllers/keluarga_cards_controller')
const KesehatanFisikCardsController = () => import('#controllers/kesehatan_fisik_cards_controller')
const KuotaCutiCardsController = () => import('#controllers/kuota_cuti_cards_controller')
const PelatihanCardsController = () => import('#controllers/pelatihan_cards_controller')
const PendidikanCardsController = () => import('#controllers/pendidikan_cards_controller')
const PenelitianCardsController = () => import('#controllers/penelitian_cards_controller')
const PengabdianCardsController = () => import('#controllers/pengabdian_cards_controller')
const PengajuanCutiCardsController = () => import('#controllers/pengajuan_cuti_cards_controller')
const PengajuanIzinCardsController = () => import('#controllers/pengajuan_izin_cards_controller')
const PenghargaanCardsController = () => import('#controllers/penghargaan_cards_controller')
const PublikasiCardsController = () => import('#controllers/publikasi_cards_controller')
const RingkasanCardsController = () => import('#controllers/ringkasan_cards_controller')
// #NOTE Route login
router.get('/', async ({ view }) => {
  const role = 'admin'
  return view.render('layouts/dashboard', { role })
})

router.get('/welcome', async ({ view }) => {
  return view.render('welcome')
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
        router.resource('/atribut-akademik', AtributAkademikCardsController)
        router.resource('/atribut-lain', AtributLainCardsController)
        router.resource('/dokumen', DokumenCardsController)
        router.resource('/keluarga', KeluargaCardsController)
        router.resource('/kesehatan-fisik', KesehatanFisikCardsController)
        router.resource('/kuota-cuti', KuotaCutiCardsController)
        router.resource('/pelatihan', PelatihanCardsController)
        router.resource('/pendidikan', PendidikanCardsController)
        router.resource('/penelitian', PenelitianCardsController)
        router.resource('/pengabdian', PengabdianCardsController)
        router.resource('/pengajuan-cuti', PengajuanCutiCardsController)
        router.resource('/pengajuan-izin', PengajuanIzinCardsController)
        router.resource('/penghargaan', PenghargaanCardsController)
        router.resource('/ringkasan', RingkasanCardsController)
        router.resource('/publikasi', PublikasiCardsController)
        router.get('/cuti', [PagesController, 'Cuti'])
        router.get('/sakit', [PagesController, 'Sakit'])
        router.get('/izin', [PagesController, 'Izin'])
        router.get('/users', [PagesController, 'Users'])
      })
      .prefix('dashboard')
  })
// .use(middleware.authView())
// .use(middleware.auth({ guards: ['web'] })) // gunakan session guard


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
