import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'penghargaan'

  // #TODO ubat nama tabel itu tanpa s
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

      table.string('nama_penghargaan', 150).nullable()
      table.string('instansi', 150).nullable()
      table.integer('tahun').nullable() // ganti dari YEAR ke INTEGER agar kompatibel

      // timestamps opsional, tambahkan jika ingin melacak waktu input
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}