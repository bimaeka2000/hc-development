import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Keluarga from '#models/keluarga'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Keluarga.createMany([
      {
        pegawai_id: 3,
        nama_keluarga: 'siti',
        hubungan: 'istri',
        tanggal_lahir: new Date(2000 - 30 - 20),
        pekerjaan: 'tukang cuci'

      }
    ])
  }
}