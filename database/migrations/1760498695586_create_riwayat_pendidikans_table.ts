import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'riwayat_pendidikan'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // Foreign key ke tabel pegawais
      table
        .integer('pegawai_id')
        .unsigned()
        .references('id')
        .inTable('pegawai')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      // Foreign key ke tabel jenjangs
      table
        .integer('jenjang_id')
        .unsigned()
        .references('id')
        .inTable('jenjang_pendidikan')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

      // Kolom utama
      table.string('nama_instansi', 255).nullable()
      table.string('jurusan', 255).nullable()
      table.integer('tahun_masuk').unsigned().nullable()
      table.integer('tahun_lulus').unsigned().nullable()
      table.string('gelar', 50).nullable()

      // Timestamp otomatis
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}