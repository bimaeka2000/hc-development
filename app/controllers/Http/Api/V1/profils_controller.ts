import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'
import ApiResponse from '#services/api_response'
export default class ProfilsController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    return response.json({
      status: 'success',
      code: 200,
      message: 'Index Api V1 Profil',
    })
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
  async show({ response, params }: HttpContext) {
    try {
      const profil = await Pegawai.query()
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
      return response
        .status(200)
        .json(ApiResponse.success('Detail profil berhasil diambil dari tabel Pegawai', profil))
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json(ApiResponse.error('Profil tidak ditemukan', 404))
      }
      console.error(error)
      return response.status(500).json(ApiResponse.error('Terjadi kesalahan server', 500))
    }
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
