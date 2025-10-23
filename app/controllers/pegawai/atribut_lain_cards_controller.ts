import type { HttpContext } from '@adonisjs/core/http'
import Dosen from '#models/dosen'
import Pegawai from '#models/pegawai'
export default class AtributLainCardsController {
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
  async show({ params, view, response }: HttpContext) {
    const id = params.id
    // return response.json(id)
    const dataAtributLain = await Dosen.query().where('pegawai_id', id)
    return response.json(dataAtributLain)
    return view.render('pegawai/edit/atribut-pegawai-lain', { dataAtributLain })
    // .preload('pegawai')
    // .firstOrFail()
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
