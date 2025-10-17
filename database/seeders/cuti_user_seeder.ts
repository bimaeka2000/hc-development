import { BaseSeeder } from '@adonisjs/lucid/seeders'
import CutiUser from '#models/cuti_user'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await CutiUser.createMany([
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Tahunan',
        jumlah_cuti: '12'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Sakit',
        jumlah_cuti: '5'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Melahirkan',
        jumlah_cuti: '5'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Ibadah',
        jumlah_cuti: '4'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Tahunan',
        jumlah_cuti: '4'
      },
      
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Keluarga',
        jumlah_cuti: '5'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Pendidikan',
        jumlah_cuti: '3'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Sakit',
        jumlah_cuti: '4'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Sakit',
        jumlah_cuti: '1'
      },
      {
        pegawai_id: 1,
        jenis_cuti: 'Cuti Sakit',
        jumlah_cuti: '2'
      }
    ])
  }
}
