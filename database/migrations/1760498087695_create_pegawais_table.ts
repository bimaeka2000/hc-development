import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pegawai'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Primary Key
      table.string('npy', 20).nullable()
      table.string('nik', 20).nullable()
      table.string('npwp', 25).nullable()
      table.string('nama_lengkap', 100).nullable()
      table.enu('jenis_kelamin', ['Laki-laki', 'Perempuan']).nullable()
      table.string('tempat_lahir', 100).nullable()
      table.date('tanggal_lahir').nullable()
      table.integer('agama_id').unsigned().nullable()
      table.integer('suku_id').unsigned().nullable()
      table.text('alamat').nullable()
      table.string('no_hp', 20).nullable()
      table.string('no_hp_darurat', 20).nullable()
      table.string('email_pribadi', 100).nullable()
      table.string('email_kantor', 100).nullable()
      table.enu('status_perkawinan', ['Lajang', 'Menikah', 'Cerai', 'Duda/Janda']).nullable()
      table.integer('status_kepegawaian_id').unsigned().nullable()
      table.integer('unit_kerja_id').unsigned().nullable()
      table.integer('nomor_urut').nullable()
      table.string('foto', 255).nullable()
      table.enu('status', ['aktif', 'nonaktif']).defaultTo('aktif')
      table
        .timestamp('created_at', { useTz: true })
        .defaultTo(this.now())
      table
        .timestamp('updated_at', { useTz: true })
        .defaultTo(this.now())
      table.integer('role_id').unsigned().nullable().defaultTo(1)

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}