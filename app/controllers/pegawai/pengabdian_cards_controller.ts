import Pengabdian from '#models/pengabdian'
import type { HttpContext } from '@adonisjs/core/http'

export default class PengabdianCardsController {
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
  async show({ view, params }: HttpContext) {
    const id = params.id
    // #TODO Ini ambil data dosen, query menggunakan id_role
    // const dataPengabdian = Pengabdian.query()
    return view.render('pegawai/edit/pengabdian')
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
