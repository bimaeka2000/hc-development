import SuratKeputusan from '#models/surat_keputusan'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await SuratKeputusan.createMany([
      {
        pegawai_id: 1,
        nomor_sk: 'SK-USTB-001',
        tanggal_sk: new Date('2020-01-01'),
        keterangan: 'Keterangan SK 1',
        file_sk: 'file_sk_1.pdf',
      },
      {
        pegawai_id: 2,
        nomor_sk: 'SK-USTB-002',
        tanggal_sk: new Date('2021-01-01'),
        keterangan: 'Keterangan SK 2',
        file_sk: 'file_sk_2.pdf',
      },
    ])
  }
}