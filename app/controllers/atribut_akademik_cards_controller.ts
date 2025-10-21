import type { HttpContext } from '@adonisjs/core/http'
import Dosen from '#models/dosen'
export default class AtributAkademikCardsController {
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) { }

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
  async show({ params, view }: HttpContext) {
    const id = params.id
    const dataAktributAkademik = await Dosen.query()
      .where('pegawai_id', id)
      .preload('pegawai')
      .firstOrFail()
    return view.render('dashboard/edit/atribut_akademik')
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