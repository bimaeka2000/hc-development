import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Sertifikasi from '#models/sertifikasi'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Sertifikasi.createMany([
      {
        pegawai_id: 1,
        nama_sertifikasi: 'Sertifikasi A',
        nomor: 'USTB-1902',
        tahun: new Date('2020-01-01'),
      },
      {
        pegawai_id: 2,
        nama_sertifikasi: 'Sertifikasi B',
        nomor: 'USTB-1903',
        tahun: new Date('2021-01-01'),
      },
    ])
  }
}