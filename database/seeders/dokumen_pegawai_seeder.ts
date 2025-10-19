import DokumenPegawai from '#models/dokumen_pegawai'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await DokumenPegawai.createMany([
      {
<<<<<<< HEAD
<<<<<<< HEAD
        pegawai_id: 1,
=======
<<<<<<< HEAD
        pegawai_id: 3,
=======
        pegawai_id: 1,
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
=======
        pegawai_id: 1,
>>>>>>> f3dd996 (update untuk push ke backup)
        jenis_dokumen_id: 1,
        nama_file: 'testing',
        tanggal_upload: new Date('2024-10-25'),
      },
    ])
  }
}
