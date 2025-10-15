import DataKesehatanFisik from '#models/data_kesehatan_fisik'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class extends BaseSeeder {
  // #TODO Repair
  async run() {
    // Write your database queries inside the run method
    DataKesehatanFisik.createMany([
      {
        id_pegawai: 1,
        tinggi_cm: 100,
        berat_kg: 200,

      }
    ])
  }
}