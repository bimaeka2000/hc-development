import JenisDokumen from '#models/jenis_dokumen'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await JenisDokumen.createMany([
      {
        jenis_dokumen: 'KTP',
      },
      {
        jenis_dokumen: 'Ijazah',
      },
      {
        jenis_dokumen: 'KK',
      },
      {
        jenis_dokumen: 'SK Pengangkatan',
      },
      {
        jenis_dokumen: 'Sertifikat',
      },
    ])
  }
}
