import Agama from '#models/agama'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Agama.createMany([
      {
        agama: 'Islam',
      },
      {
        agama: 'Kristen',
      },
      {
        agama: 'Katolik',
      },
      {
        agama: 'Hindu',
      },
      {
        agama: 'Budha',
      },
      {
        agama: 'Konghucu',
      },
    ])
  }
}
