import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Suku from '#models/suku'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Suku.createMany([
      {
        suku: 'Jawa'
      },
      {
        suku: 'Sunda'
      },
      {
        suku: 'Batak'
      },
      {
        suku: 'Minang'
      },
      {
        suku: 'Bugis'
      },
    ])
  }
}