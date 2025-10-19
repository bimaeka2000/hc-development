import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sertifikasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // Foreign key ke pegawai
      table
        .integer('pegawai_id')
        .unsigned()
        .references('id')
        .inTable('pegawai')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      // Nama sertifikasi
      table.string('nama_sertifikasi', 150).notNullable()

      // Nomor sertifikat
      table.string('nomor', 100).notNullable()

      // Tahun sertifikasi
      table.integer('tahun').unsigned().nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
