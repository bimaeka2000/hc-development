import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RiwayatGaji from '#models/riwayat_gaji'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await RiwayatGaji.createMany([
      {
        pegawai_id: 1,
        gaji_pokok: 5000000,
        tmt: new Date('2020-01-01')
      }
      
    ])
  }
}