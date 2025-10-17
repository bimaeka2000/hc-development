import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'

export default class ProfilCardsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    return view.render('dashboard/edit/profil')
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) {
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) { }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {
    const data = Pegawai.findBy('id', params.id)

  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const data = request.all();
    console.log(data)
    const pegawai = Pegawai.findBy('id', params.id)
  }
  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}