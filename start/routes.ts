import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import './routes/api.js'
// import './routes/web.js'

const PagesController = () => import('#controllers/pages_controller')
const PegawaisController = () => import('#controllers/pegawai/pegawais_controller')
const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const ProfilCardsController = () => import('#controllers/pegawai/profil_cards_controller')
const AtributAkademikCardsController = () =>
  import('#controllers/pegawai/atribut_akademik_cards_controller')
const AtributLainCardsController = () =>
  import('#controllers/pegawai/atribut_lain_cards_controller')
const DokumenCardsController = () => import('#controllers/pegawai/dokumen_cards_controller')
const KeluargaCardsController = () => import('#controllers/pegawai/keluarga_cards_controller')
const KesehatanFisikCardsController = () =>
  import('#controllers/pegawai/kesehatan_fisik_cards_controller')
const KuotaCutiCardsController = () => import('#controllers/pegawai/kuota_cuti_cards_controller')
const PelatihanCardsController = () => import('#controllers/pegawai/pelatihan_cards_controller')
const PendidikanCardsController = () => import('#controllers/pegawai/pendidikan_cards_controller')
const PenelitianCardsController = () => import('#controllers/pegawai/penelitian_cards_controller')
const PengabdianCardsController = () => import('#controllers/pegawai/pengabdian_cards_controller')
const PengajuanCutiCardsController = () =>
  import('#controllers/cuti/pengajuan_cuti_cards_controller')
const PengajuanIzinCardsController = () =>
  import('#controllers/cuti/pengajuan_izin_cards_controller')
const PenghargaanCardsController = () => import('#controllers/pegawai/penghargaan_cards_controller')
const PublikasiCardsController = () => import('#controllers/pegawai/publikasi_cards_controller')
const RingkasanCardsController = () => import('#controllers/pegawai/ringkasan_cards_controller')
const CutiCardsController = () => import('#controllers/cuti/cuti_cards_controller')
const IzinCardsController = () => import('#controllers/pegawai/izin_cards_controller')
const SakitCardsController = () => import('#controllers/pegawai/sakit_cards_controller')
const GajiCardsController = () => import('#controllers/pegawai/gaji_cards_controller')
const JabatanCardsController = () => import('#controllers/pegawai/jabatan_cards_controller')
// #NOTE Route login
// Untuk development
router.get('/', async ({ view }) => {
  return view.render('login')
})

router.get('/welcome', async ({ view }) => {
  return view.render('welcome')
})
// #NOTE Login manual

// #NOTE SSO Goolgle OAuth2
router.get('/auth/google/redirect', [AuthController, 'redirectToGoogle']).as('google.redirect')
router.get('/auth/google/callback', [AuthController, 'googleCallback'])
router.get('/checkuser', [DashboardController, 'checkUser'])
router.post('/login', [SessionController, 'store']).as('login.manual')

// #NOTE Session routes
router.post('session', [SessionController, 'store'])
router.delete('destroy', [SessionController, 'destroy'])

router
  .group(() => {
    router.get('/logout', [SessionController, 'logOut']).as('logout')
    router.get('/dashboard', [DashboardController, 'index']).as('dashboard.index')
    router
      .group(() => {
        router.resource('/user', UsersController)
        router.resource('/pegawai', PegawaisController)
        router.resource('/profil', ProfilCardsController)
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
        router.resource('/jabatan', JabatanCardsController)
        router.resource('/cuti', CutiCardsController)
        router.resource('/izin', IzinCardsController)
        router.resource('/sakit', SakitCardsController)
        router.resource('/gaji', GajiCardsController)
      })
      .prefix('dashboard')
  })
  .use(middleware.authView())
  .use(middleware.shareRole())
  .use(middleware.auth({ guards: ['web'] })) // gunakan session guard

router.any('*', async ({ request, view, response }) => {
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



