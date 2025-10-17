import Kelurga from '#models/keluarga'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Kelurga.createMany([
      {
        pegawai_id: 1,
        nama_keluarga: 'John Doe',
        hubungan: 'Suami',
        tanggal_lahir: new Date('1980-01-01'),
        pekerjaan: 'Karyawan',
        
      }
    ])
  }
}