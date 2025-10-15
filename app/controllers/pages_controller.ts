import type { HttpContext } from '@adonisjs/core/http'

export default class PagesController {

    async Pegawai({ view }: HttpContext) {
        return view.render('dashboard/pegawai')
    }

    async PegawaiDetail({ view }: HttpContext) {
          return view.render('dashboard/pegawai_detail')
    }

    async Cuti({ view }: HttpContext) {
        return view.render('dashboard/cuti')
    }

    async Sakit({ view }: HttpContext) {
        return view.render('dashboard/sakit')
    }

    async Izin({ view }: HttpContext) {
        return view.render('dashboard/izin')
    }

    async Penelitian({ view }: HttpContext) {
        return view.render('dashboard/penelitian')
    }

    async Pengabdian({ view }: HttpContext) {
        return view.render('dashboard/pengabdian')
    }

    async Users({ view }: HttpContext) {
        return view.render('dashboard/users')
    }
}
