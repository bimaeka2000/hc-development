import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'role'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // Nama role
      table.string('nama_role', 50).notNullable()

      // Status enum: Aktif / Nonaktif
      table
        .enum('status', ['Aktif', 'Nonaktif'])
        .defaultTo('Aktif')

      // Waktu dibuat dan diperbarui
      table.dateTime('dibuat_pada').defaultTo(this.now())
      table
        .dateTime('diperbarui_pada')
        .defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}