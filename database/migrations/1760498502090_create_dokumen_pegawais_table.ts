import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dokumen_pegawai'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Primary key
      table.integer('pegawai_id').unsigned().nullable()
      table.integer('jenis_dokumen_id').unsigned().nullable()
      table.string('nama_file', 255).nullable()
      table
        .timestamp('tanggal_upload', { useTz: true })
        .defaultTo(this.now())
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}