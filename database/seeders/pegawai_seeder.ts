import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Pegawai from '#models/pegawai'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Pegawai.createMany([
      {

      }
    ])
  }
}