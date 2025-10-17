import KategoriCuti from '#models/kategori_cuti'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await KategoriCuti.createMany([
      {
        jenis_cuti: 'Cuti Tahunan',
        jumlah_cuti: 12,
        status: 1
      }
    ])
  }

}