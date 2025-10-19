import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'

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
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ view, params }: HttpContext) {
    const pegawaiData = await Pegawai.query()
      .where('id', params.id)
      .preload('keluarga')
      .preload('role')
      .preload('dosen')
      .preload('dataKesehatanFisik')
      .preload('riwayatKesehatan')
      .preload('dokumen', (query) => {
        query.preload('jenisDokumen')
      })
      .preload('pendidikan', (query) => {
        query.preload('jenjangPendidikan')
      })
      .preload('suku')
      .preload('agama')
      .firstOrFail()

    return view.render('dashboard/pegawai_detail', {
      pegawaiData,
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
