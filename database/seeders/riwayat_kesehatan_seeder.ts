import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RiwayatKesehatan from '#models/riwayat_kesehatan'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await RiwayatKesehatan.createMany([
      {
        id_pegawai: 2,
        jenis_penyakit: 'tidak ada',
        keterangan: 'kosong',
        tanggal_diagnosa: new Date('2015-10-23'),
        status_sembuh: 'sembuh',
      },
    ])
  }
}
