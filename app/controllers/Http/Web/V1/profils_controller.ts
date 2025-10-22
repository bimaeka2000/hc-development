import Agama from '#models/agama'
import Role from '#models/role'
import StatusKepegawaian from '#models/status_kepegawaian'
import Suku from '#models/suku'
import UnitKerja from '#models/unit_kerja'
import { Redirect, type HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'

export default class ProfilsController {
  private url = 'http://localhost:3000/'
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
  async store({ response, request, view, session }: HttpContext) {
    session.flash('success', 'Data berhasil disimpan!')

    const allowedFields = [
      'agama_id',
      'suku_id',
      'status_kepegawaian',
      'unit_kerja',
      'role_id',
      'npy',
      'nik',
      'npwp',
      'jenis_kelamin',
      'tempat_lahir',
      'tanggal_lahir',
      'alamat',
      'no_hp',
      'no_hp_darurat',
      'nama_lengkap',
      'email_pribadi',
      'email_kantor',
      'status_perkawinan',
      'nomor_urut',
      'foto',
      'status',
    ]

    const data = request.only(allowedFields)
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
    )

    return response.redirect().back()
    await Pegawai.query().where('id', params.id).update(cleanData)
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const idParam = params.id
    const apiUrl = `${this.url}/api/v1/profil/${idParam}`
    const data = await fetch(apiUrl)
    const result = await data.json()
    const suku = await Suku.all()
    const agama = await Agama.all()
    const unitKerja = await UnitKerja.all()
    const statusKepegawaian = await StatusKepegawaian.all()
    const role = await Role.all()

    return view.render('dashboard/edit/profil', {
      idParam,
      profil: result,
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
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
