import Guru from '#models/guru'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
      // Write your database queries inside the run method
      await Guru.createMany([
        {
          pegawai_id: 1,
          nuptk: "123456478",
          jenjang: 'SMA',
        }
      ])
    }
}