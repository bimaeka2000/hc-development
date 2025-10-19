import DokumenPegawai from '#models/dokumen_pegawai'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await DokumenPegawai.createMany([
      {
        pegawai_id: 1,
        jenis_dokumen_id: 1,
        nama_file: 'testing',
        tanggal_upload: new Date('2024-10-25'),
      },
    ])
  }
}
