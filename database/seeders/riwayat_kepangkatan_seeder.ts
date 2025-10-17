import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RiwayatKepangkatan from '#models/riwayat_kepangkatan'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await RiwayatKepangkatan.createMany([
      {
        pegawai_id: 1,
        pangkat: 'Pembina',
        golongan: 'IV/a',
        tmt: new Date('2020-01-01'),
      }
    ])
  }
}