import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UnitKerja from '#models/unit_kerja'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await UnitKerja.createMany([
      {
        unit_kerja: 'SD',
      },
      {
        unit_kerja: 'SMP',
      },
      {
        unit_kerja: 'SMA',
      },
      {
        unit_kerja: 'Universitas',
      },
    ])
  }
}
