import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RiwayatGaji from '#models/riwayat_gaji'

export default class extends BaseSeeder {
  async run() {
    await RiwayatGaji.createMany([
      {
        pegawai_id: 2,
        gaji_pokok: 'Rp.50.000.000',
      },
      {
        pegawai_id: 3,
        gaji_pokok: 'Rp.50.000',
      },
    ])
    // Write your database queries inside the run method
  }
}
