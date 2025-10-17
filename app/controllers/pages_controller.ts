import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'
import Keluarga from '#models/keluarga'
import Role from '#models/role'
import UnitKerja from '#models/unit_kerja'
import StatusKepegawaian from '#models/status_kepegawaian'
import Dosen from '#models/dosen'
import DataKesehatanFisik from '#models/data_kesehatan_fisik'
import RiwayatKesehatan from '#models/riwayat_kesehatan'
import DokumenPegawai from '#models/dokumen_pegawai'
import JenisDokumen from '#models/jenis_dokumen'
import RiwayatPendidikan from '#models/riwayat_pendidikan'
import JenjangPendidikan from '#models/jenjang_pendidikan'
export default class PagesController {

    async Pegawai({ view }: HttpContext) {
        // Load all pegawai for listing page
        const pegawais = await Pegawai.query().orderBy('id', 'asc')
        return view.render('dashboard/pegawai', { pegawais })
    }

    async PegawaiDetail({ view }: HttpContext) {

const pegawaiData = await Pegawai.find(2)
        const keluarga = await Keluarga.findBy('pegawai_id', pegawaiData?.id)
        const role = await Role.findBy('id', pegawaiData?.role_id)
        const dosen = await Dosen.findBy('pegawai_id', pegawaiData?.id)
        const unitKerja = await UnitKerja.findBy('id', pegawaiData?.unit_kerja_id)
        const statusKepegawaian = await StatusKepegawaian.findBy('id', pegawaiData?.status_kepegawaian_id)
        const dataKesehatanFisik = await DataKesehatanFisik.findBy('id_pegawai', pegawaiData?.id)
        const riwayatKesehatan = await RiwayatKesehatan.findBy('id_pegawai', pegawaiData?.id)
        const dokumen = await DokumenPegawai.findBy('pegawai_id', pegawaiData?.id)
        const jenisDokumen = await JenisDokumen.findBy('id', dokumen?.jenis_dokumen_id)
        const pendidikan = await RiwayatPendidikan.findBy('pegawai_id', pegawaiData?.id)
        const jenjangPendidikan = await JenjangPendidikan.findBy('id', pendidikan?.jenjang_id)
        return view.render('dashboard/pegawai_detail',
            {
                pegawaiData,
                keluarga,
                role,
                unitKerja,
                statusKepegawaian,
                dosen,
                dataKesehatanFisik,
                riwayatKesehatan,
                jenjangPendidikan,
                dokumen,
                pendidikan,
                jenisDokumen
            }
        )
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


