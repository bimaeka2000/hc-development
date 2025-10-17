import PengajuanIzin from '#models/pengajuan_izin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await PengajuanIzin.createMany([
      {
        user_id: 1,
        alasan: 'Menghadiri Pernikahan',
        file_pengajuan: 'file1.pdf',
      }
      
    ])
  }
}