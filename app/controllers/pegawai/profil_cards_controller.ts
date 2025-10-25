import type { HttpContext } from '@adonisjs/core/http'
import Pegawai from '#models/pegawai'
import Suku from '#models/suku'
import Agama from '#models/agama'
import UnitKerja from '#models/unit_kerja'
import StatusKepegawaian from '#models/status_kepegawaian'
import { DateTime } from 'luxon'


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
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ response, request, session }: HttpContext) {
    /*
        #TODO :
        [] simpan data disini
        [] tambah data untuk status perkawinan di card profil
    */
    const allowedFields = [
      'agama_id',
      'suku_id',
      'status_kepegawaian_id',
      'unit_kerja_id',
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

    // bersihkan data kosong/null/undefined
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
    )

    try {

      // contoh: unique berdasarkan email kantor
      const pegawai = await Pegawai.updateOrCreate(
        { email_kantor: cleanData.pegawai_id }, // kondisi pencarian
        cleanData // data yang akan diupdate/dibuat
      )

      return response.ok({
        message: pegawai.$isLocal ? 'Pegawai baru berhasil dibuat' : 'Data pegawai berhasil diperbarui',
        data: pegawai,
      })
    } catch (error) {
      console.error('❌ Sync error:', error)
      return response.badRequest({
        message: 'Gagal menyimpan data pegawai',
        error: error.message,
      })
    }
  }

  /**
   * Show individual record
   */
  async show({ view, params, response }: HttpContext) {
    const id = params.id
    let suku = await Suku.all()
    let agama = await Agama.all()
    let unitKerja = await UnitKerja.all()
    let statusKepegawaian = await StatusKepegawaian.all()

    // const pegawaiData = await Pegawai.query()
    //   .where('id', id)
    //   .preload('keluarga')
    //   .preload('role')
    //   .preload('dosen')
    //   .preload('dataKesehatanFisik')
    //   .preload('riwayatKesehatan')
    //   .preload('dokumen', (query) => {
    //     query.preload('jenisDokumen')
    //   })
    //   .preload('pendidikan', (query) => {
    //     query.preload('jenjangPendidikan')
    //   })
    //   .preload('suku')
    //   .preload('agama')
    //   .first()

    return view.render('pegawai/edit/profil', {
      // pegawaiData,
      suku,
      agama,
      unitKerja,
      statusKepegawaian,
    })
  }

  /**
   * Edit individual record
   */
  async edit({ }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ response, request }: HttpContext) {
    const id = request.param('id')
  }
  async sync({ response, request, params }: HttpContext) {

    console.log(params.id)

    const allowedFields = [
      'agama_id',
      'suku_id',
      'status_kepegawaian_id',
      'unit_kerja_id',
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

    // bersihkan data kosong/null/undefined
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined && v !== '' && v !== null)
    )
    // ubah dari "DD/MM/YYYY" ke ISO "YYYY-MM-DD"
    if (cleanData.tanggal_lahir) {
      const parsed = DateTime.fromFormat(cleanData.tanggal_lahir, 'MM/dd/yyyy').toISODate()
      cleanData.tanggal_lahir = parsed
    }
    try {

      // contoh: unique berdasarkan email kantor
      await Pegawai.updateOrCreate(
        { id: params.id }, // kondisi pencarian
        cleanData // data yang akan diupdate/dibuat
      )
      return response.json(cleanData)
      return response.redirect().back()

    } catch (error) {
      console.error('❌ ERROR SYNC:', error)
      return response.redirect().back()
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}