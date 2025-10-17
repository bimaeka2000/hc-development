import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RiwayatMengajar from '#models/riwayat_mengajar'
export default class extends BaseSeeder {
  async run() {
    await RiwayatMengajar.createMany([
      {
        id_dosen: 1,
        semester: 'ganjil',
        tahun_akademik: '2020/2021',
        mata_kuliah: 'Matematika',
        sks: 3,
        program_studi: 'Teknik Informatika',
        institusi: 'Universitas ABC'
      }
      
    ])
  }
}