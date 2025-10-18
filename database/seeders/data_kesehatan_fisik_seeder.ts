import DataKesehatanFisik from '#models/data_kesehatan_fisik'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
export default class extends BaseSeeder {
  // #TODO Repair
  async run() {
    // Write your database queries inside the run method
    await DataKesehatanFisik.createMany([
      {
        pegawai_id: 1,
        tinggi_cm: 100,
        berat_kg: 200,
        golongan_darah: 'o',
        tekanan_darah: '190',
        alergi: 'tidak ada',
        disabilitas: 'tidak',
        catatan_kesehatan: 'sehat'
      }
    ])
  }
}