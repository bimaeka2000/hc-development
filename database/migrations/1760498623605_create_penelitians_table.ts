import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'penelitian'

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
      table.integer('tahun_mulai').nullable() // ganti dari YEAR ke INTEGER
      table.integer('tahun_selesai').nullable() // ganti dari YEAR ke INTEGER
      table.decimal('dana', 15, 2).nullable()
      table.string('sumber_dana', 255).nullable()
      table.string('peran', 100).nullable()
      table.text('keterangan').nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
