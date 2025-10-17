import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Penghargaan from '#models/penghargaan'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Penghargaan.createMany([
      {
        pegawai_id: 1,
        nama_penghargaan: 'Penghargaan Karyawan Terbaik',
        instansi: 'PT. ABC',
        tahun: 2020,
      }
    ])
  }
}