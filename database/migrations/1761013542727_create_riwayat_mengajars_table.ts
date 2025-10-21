import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'riwayat_mengajar'

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

      // Kolom utama
      table.string('semester', 20).nullable()
      table.string('tahun_akademik', 10).nullable()
      table.string('mata_kuliah', 100).nullable()
      table.integer('sks').nullable()
      table.string('program_studi', 100).nullable()
      table.string('institusi', 100).nullable()

      // Timestamp otomatis
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
