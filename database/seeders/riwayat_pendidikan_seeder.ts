import RiwayatPendidikan from '#models/riwayat_pendidikan'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await RiwayatPendidikan.createMany([
      {
        pegawai_id: 1,
        jenjang_id: 1,
        nama_instansi: 'Universitas Sumatera Utara',
        jurusan: 'PGSD',
        tahun_masuk: 2019,
        tahun_lulus: 2023,
        gelar: 'S.Kom',
      },
    ])
  }
}
