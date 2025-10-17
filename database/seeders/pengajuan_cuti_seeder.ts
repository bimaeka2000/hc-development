import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PengajuanCuti from '#models/pengajuan_cuti'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await PengajuanCuti.createMany([
      {
        user_id: 1,
        kategori_cuti_id: 1,
        file_pengajuan: 'file1.pdf',
        jumlah_hari : 2,
        izin_satu: 1,
        izin_dua: 1,
        izin_tiga: 1,
      }
    ])
  }
}