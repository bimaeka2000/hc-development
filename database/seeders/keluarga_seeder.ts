import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Keluarga from '#models/keluarga'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Keluarga.createMany([
      {
<<<<<<< HEAD
        pegawai_id: 1,
=======
<<<<<<< HEAD
        pegawai_id: 3,
=======
        pegawai_id: 1,
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
        nama_keluarga: 'siti',
        hubungan: 'istri',
        tanggal_lahir: new Date(2000 - 30 - 20),
        pekerjaan: 'tukang cuci'

      }
    ])
  }
}