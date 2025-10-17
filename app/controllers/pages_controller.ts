import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'
import Keluarga from '#models/keluarga'
import Role from '#models/role'
import UnitKerja from '#models/unit_kerja'
import StatusKepegawaian from '#models/status_kepegawaian'
import Dosen from '#models/dosen'
import DataKesehatanFisik from '#models/data_kesehatan_fisik'
import RiwayatKesehatan from '#models/riwayat_kesehatan'
export default class PagesController {

    async Pegawai({ view }: HttpContext) {
        // Load all pegawai for listing page
        const pegawais = await Pegawai.query().orderBy('id', 'asc')
        return view.render('dashboard/pegawai', { pegawais })
    }

    async PegawaiDetail({ view, request }: HttpContext) {
        // Prefer id from query string, else pick the first available pegawai
        const idParam = request.input('id')
        let pegawaiData = null as Pegawai | null
        if (idParam) {
            pegawaiData = await Pegawai.find(idParam)
        } else {
            pegawaiData = await Pegawai.first()
        }

        // Safely load related data only if we have a pegawai
        const keluarga = pegawaiData ? await Keluarga.findBy('pegawai_id', pegawaiData.id) : null
        const role = pegawaiData && pegawaiData.role_id ? await Role.find(pegawaiData.role_id) : null
        const dosen = pegawaiData ? await Dosen.findBy('pegawai_id', pegawaiData.id) : null
        const unitKerja = pegawaiData && pegawaiData.unit_kerja_id ? await UnitKerja.find(pegawaiData.unit_kerja_id) : null
        const statusKepegawaian = pegawaiData && pegawaiData.status_kepegawaian_id ? await StatusKepegawaian.find(pegawaiData.status_kepegawaian_id) : null
        const dataKesehatanFisik = pegawaiData ? await DataKesehatanFisik.findBy('id_pegawai', pegawaiData.id) : null
        const riwayatKesehatan = pegawaiData ? await RiwayatKesehatan.findBy('id_pegawai', pegawaiData.id) : null

        return view.render('dashboard/pegawai_detail', {
            pegawaiData,
            keluarga,
            role,
            unitKerja,
            statusKepegawaian,
            dosen,
            dataKesehatanFisik,
            riwayatKesehatan,
        })
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

    async EditPage({ view, params, request }: HttpContext) {
        const page = params.page || ''
        if (!/^[a-z0-9_-]+$/i.test(page)) {
            return view.render('dashboard/under-construction')
        }

        // If ?id= is provided, try to load the pegawai name for breadcrumb
        const id = request.input('id')
        let nama_lengkap = null
        if (id) {
            try {
                const p = await Pegawai.find(id)
                nama_lengkap = p?.nama_lengkap || null
            } catch (e) {
                // ignore
            }
        }

        return view.render(`dashboard/edit/${page}`, { nama_lengkap })
    }
}


