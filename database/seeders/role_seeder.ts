import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        nama_role: 'admin',
        status: 'aktif',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nama_role: 'pegawai',
        status: 'aktif',
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  }
}