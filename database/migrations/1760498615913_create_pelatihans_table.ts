import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pelatihan'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('pegawai_id')
        .unsigned()
        .references('id')
        .inTable('pegawai')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .nullable()

      table.string('nama_pelatihan', 150).nullable()
      table.string('penyelenggara', 150).nullable()
      table.integer('tahun').unsigned().nullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
