import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'riwayat_gaji'

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

      table.decimal('gaji_pokok', 12, 2).nullable()
      table.date('tmt').nullable() // tanggal mulai berlaku gaji

      // timestamps opsional
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
