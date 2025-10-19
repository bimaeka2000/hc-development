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
import Suku from '#models/suku'
import Agama from '#models/agama'
export default class PegawaisController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const pegawais = await Pegawai.query().orderBy('id', 'asc')
    return view.render('dashboard/pegawai', { pegawais })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ view, params }: HttpContext) {
    const pegawaiData = await Pegawai.find(params.id)
    const keluarga = await Keluarga.findBy('pegawai_id', pegawaiData?.id)
    const role = await Role.findBy('id', pegawaiData?.role_id)
    const dosen = await Dosen.findBy('pegawai_id', pegawaiData?.id)
    const unitKerja = await UnitKerja.findBy('id', pegawaiData?.unit_kerja_id)
    const statusKepegawaian = await StatusKepegawaian.findBy(
      'id',
      pegawaiData?.status_kepegawaian_id
    )
    const dataKesehatanFisik = await DataKesehatanFisik.findBy('pegawai_id', pegawaiData?.id)
    const riwayatKesehatan = await RiwayatKesehatan.findBy('pegawai_id', pegawaiData?.id)
    const dokumen = await DokumenPegawai.findBy('pegawai_id', pegawaiData?.id)
    const jenisDokumen = await JenisDokumen.findBy('id', dokumen?.jenis_dokumen_id)
    const pendidikan = await RiwayatPendidikan.findBy('pegawai_id', pegawaiData?.id)
    const jenjangPendidikan = await JenjangPendidikan.findBy('id', pendidikan?.jenjang_id)
    const suku = await Suku.findBy('id', pegawaiData?.suku_id)
    const agama = await Agama.findBy('id', pegawaiData?.agama_id)
    return view.render('dashboard/pegawai_detail', {
      pegawaiData,
      keluarga,
      role,
      unitKerja,
      statusKepegawaian,
      dosen,
      dataKesehatanFisik,
      riwayatKesehatan,
      jenisDokumen,
      dokumen,
      pendidikan,
      suku,
      agama,
    })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
