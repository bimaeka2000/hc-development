import RiwayatPendidikan from '#models/riwayat_pendidikan'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await RiwayatPendidikan.createMany([
      {
<<<<<<< HEAD
<<<<<<< HEAD
        pegawai_id: 1,
        jenjang_id: 1,
=======
<<<<<<< HEAD
        pegawai_id: 3,
        jenjang_id: 3,
=======
        pegawai_id: 1,
        jenjang_id: 1,
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
=======
        pegawai_id: 1,
        jenjang_id: 1,
>>>>>>> f3dd996 (update untuk push ke backup)
        nama_instansi: 'Universitas Sumatera Utara',
        jurusan: 'PGSD',
        tahun_masuk: 2019,
        tahun_lulus: 2023,
        gelar: 'S.Kom',
      },
    ])
  }
}
