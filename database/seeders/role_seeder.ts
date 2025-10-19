import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
=======
>>>>>>> f3dd996 (update untuk push ke backup)
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
<<<<<<< HEAD
      {
=======
>>>>>>> Stashed changes
        nama_role: 'dosen',
        status: 'aktif'
      },
      {
<<<<<<< Updated upstream
        nama_role: 'guru',
        status: 'aktif'
      },
      {
        nama_role: 'superadmin',
        status: 'aktif'
      },
=======
        nama_role: 'staff',
        status: 'aktif'
      },
      {
        nama_role: 'guru',
        status: 'aktif'
      },

>>>>>>> Stashed changes
=======

>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
=======
>>>>>>> f3dd996 (update untuk push ke backup)
    ])
  }
}
