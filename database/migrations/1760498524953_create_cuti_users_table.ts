import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cuti_user'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('pegawai_id')
      .unsigned()
      .references('id')
      .inTable('pegawai')
      .onDelete('CASCADE')
      table.string('jenis_cuti', 40).nullable()
      table.string('jumlah_cuti', 40).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}