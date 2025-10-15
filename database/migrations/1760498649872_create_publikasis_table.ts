import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'publikasi'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // Foreign key ke tabel dosens
      table
        .integer('id_dosen')
        .unsigned()
        .references('id')
        .inTable('dosen')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.string('judul', 255).nullable()

      // ENUM sesuai dengan MySQL
      table.enu('jenis', ['jurnal', 'prosiding', 'buku', 'lainnya']).nullable()

      table.string('nama_media', 255).nullable()
      table.integer('tahun').nullable()
      table.string('link_publikasi', 255).nullable()
      table.text('keterangan').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}