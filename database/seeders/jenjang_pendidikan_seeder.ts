import JenjangPendidikan from '#models/jenjang_pendidikan'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await JenjangPendidikan.createMany([
      {
        jenjang_pendidikan: 'SMA/SMK',
      },
      {
        jenjang_pendidikan: 'Diploma',
      },
      {
        jenjang_pendidikan: 'Sarjana',
      },
      {
        jenjang_pendidikan: 'Magister',
      },
      {
        jenjang_pendidikan: 'Doktor',
      },
    ])
  }
}