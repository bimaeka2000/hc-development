import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Penelitian from '#models/penelitian'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Penelitian.createMany([
      {
        id_dosen: 1,
        judul: 'Penelitian AdonisJS',
        tahun_mulai: 2023,
        tahun_selesai: 2024,
        dana: 1000000,
        sumber_dana: 'DANA',
        peran: 'Ketua Peneliti',
        keterangan: 'Penelitian tentang AdonisJS',
      }
    ])
  }
}