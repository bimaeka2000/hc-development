import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'
import Agama from '#models/agama'
import Role from '#models/role'
import StatusKepegawaian from '#models/status_kepegawaian'
import Suku from '#models/suku'
import UnitKerja from '#models/unit_kerja'

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
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, session }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ view, params, response }: HttpContext) {
    const id = params.id
    const pegawaiData = await Pegawai.query()
      .where('id', id)
      .preload('keluarga')
      .preload('role')
      .preload('dosen', (dosenQuery) => {
        dosenQuery.preload('pengabdian').preload('penelitian').preload('publikasi')
      })
      .preload('dataKesehatanFisik')
      .preload('riwayatKesehatan')
      .preload('dokumen', (query) => {
        query.preload('jenisDokumen')
      })
      .preload('pendidikan', (query) => {
        query.preload('jenjangPendidikan')
      })
      .preload('statusKepegawaian')
      .preload('unitKerja')
      .preload('suku')
      .preload('agama')
      .preload('riwayatGaji')
      .preload('pelatihan')
      .preload('penghargaan')
      .firstOrFail()

    // return response.json(pegawaiData)
    const suku = await Suku.all()
    const agama = await Agama.all()
    const unitKerja = await UnitKerja.all()
    const statusKepegawaian = await StatusKepegawaian.all()
    const role = await Role.all()
    return view.render('dashboard/pegawai_detail', {
      pegawaiData,
      suku,
      agama,
      unitKerja,
      statusKepegawaian,
      role,
    })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
