import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'
export default class PagesController {

    async Pegawai({ view }: HttpContext) {
        return view.render('dashboard/pegawai')
    }

    async PegawaiDetail({ view }: HttpContext) {

        const findById = await Pegawai.find(2)
        return view.render('dashboard/pegawai_detail', { findById })
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
        return view.render('dashboard/under-construction')
    }

    async Pengabdian({ view }: HttpContext) {
        return view.render('dashboard/under-construction')
    }

    async Users({ view }: HttpContext) {
        return view.render('dashboard/users')
    }
}
