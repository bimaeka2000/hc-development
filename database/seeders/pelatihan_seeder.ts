import Pelatihan from '#models/pelatihan'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Pelatihan.createMany([
      {
        pegawai_id: 1,
        nama_pelatihan: 'Pelatihan AdonisJS',
        penyelenggara: 'Dinas Tenaga Kerja',
        tahun: 2023,
      }
    ])
  }
}