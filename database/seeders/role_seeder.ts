import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        nama_role: 'admin',
        status: 'aktif',
      },
      {
        nama_role: 'pegawai',
        status: 'aktif',
      },
      {
        nama_role: 'atasan',
        status: 'aktif',
      },
      {
        nama_role: 'hrd',
        status: 'aktif',
      },
      {
        nama_role: 'dosen',
        status: 'aktif',
      },
      {
        nama_role: 'staff',
        status: 'aktif',
      },
      {
        nama_role: 'guru',
        status: 'aktif',
      },
    ])
  }
}
