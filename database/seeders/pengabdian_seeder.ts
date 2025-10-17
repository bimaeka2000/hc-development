import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Pengabdian from '#models/pengabdian'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Pengabdian.createMany([
      {
        id_dosen: 1,
        judul: 'Pengabdian PDSI',
        tahun_mulai: 2023,
        tahun_selesai: 2024,
        dana: 1000000,
        sumber_dana: 'DANA',
        peran: 'Ketua Pengabdian',
        keterangan: 'Pengabdian tentang AdonisJS',
      }
    ])
  }
}