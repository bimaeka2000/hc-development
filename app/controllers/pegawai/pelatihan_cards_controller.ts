import Pelatihan from '#models/pelatihan'
import type { HttpContext } from '@adonisjs/core/http'

export default class PelatihanCardsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

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
  async show({ params, view }: HttpContext) {
    const id = params.id
    // const dataPelatihan = Pelatihan.query().where('pegawai_id', id).firstOrFail()

    return view.render('pegawai/edit/pelatihan')
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
