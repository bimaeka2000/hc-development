import router from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'

const ProfilsControllerApi = () => import('#controllers/Http/Api/V1/profils_controller')

router
  .group(() => {
    router.resource('/v1/profil', ProfilsControllerApi)
  })
  .prefix('/api')
  .use(middleware.authApi()) // JSON 403 kalau belum login
