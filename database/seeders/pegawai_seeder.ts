import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Pegawai from '#models/pegawai'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Pegawai.createMany([
      // {
      //   npy: '102391289182',
      //   nik: '312541241212',
      //   npwp: '312312312132',
      //   nama_lengkap: 'Bima Eka Putra',
      //   jenis_kelamin: 'Laki-laki',
      //   tempat_lahir: 'Kota Medan',
      //   tanggal_lahir: new Date(),
      //   agama_id: 1,
      //   suku_id: 1,
      //   alamat: 'Kota Medan',
      //   no_hp: "08312375123",
      //   no_hp_darurat: "08213112312",
      //   email_pribadi: 'pribadi@gmail.com',
      //   email_kantor: 'kantor@gmail.com',
      //   status_perkawinan: 'Lajang',
      //   status_kepegawaian_id: 1,
      //   unit_kerja_id: 1,
      //   nomor_urut: 2,
      //   foto: '',
      //   status:


      // }
    ])
  }
}