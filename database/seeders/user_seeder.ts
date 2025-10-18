import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'


export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        pegawai_id: 1,
        username: 'bimaekaputra',
        email_pribadi: 'bimaekaputra@satyaterrabhinneka.ac.id',
        password: 'bimaeka2000',
        otp: '123456',
        role: 'superadmin'
      }
    ])
  }
}