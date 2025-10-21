import router from '@adonisjs/core/services/router'
import { middleware } from '../kernel.js'

const ProfilsControllerWeb = () => import('#controllers/Http/Web/V1/profils_controller')

router
    .group(() => {
        router.resource('/profil', ProfilsControllerWeb)
    })
    .prefix('dashboard')
// .use(middleware.authView())
// .use(middleware.auth({ guards: ['web'] })) // gunakan session guard
