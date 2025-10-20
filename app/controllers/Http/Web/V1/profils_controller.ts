import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilsController {
  private url = 'http://localhost:3000'
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
    const apiUrl = `/api/v1 / profil / ${params.id}`
    const data = await fetch(apiUrl)
    const result = await data.json()

    return view.render('dasboard/edit/profil', {
      profil: result,
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
