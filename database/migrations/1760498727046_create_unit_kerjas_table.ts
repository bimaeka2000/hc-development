import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'unit_kerja'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Primary Key
      table.increments('id').primary()

      // Nama unit kerja
      table.string('unit_kerja', 100).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
