import { BaseSeeder } from '@adonisjs/lucid/seeders'
import StatusKepegawaian from '#models/status_kepegawaian'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await StatusKepegawaian.createMany([
      {
        status_kepegawaian: 'Tetap',
      },
      {
        status_kepegawaian: 'Kontrak',
      },
      {
        status_kepegawaian: 'Honorer',
      },
      {
        status_kepegawaian: 'Magang',
      },
    ])
  }
}
