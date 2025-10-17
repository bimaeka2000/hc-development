import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Publikasi from '#models/publikasi'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Publikasi.createMany([
      {
        id_dosen: 1,
        judul: 'Aplikasi ADONIS',
        jenis: 'Jurnal',
        nama_media: 'Media 1',
        tahun: new Date('2020-01-01'),
        link_publikasi: 'https://example.com/publikasi1',
        keterangan: 'Keterangan 1',
      }
    ])
  }
}