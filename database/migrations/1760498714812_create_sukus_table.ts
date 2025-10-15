import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'suku'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      // Primary Key

      // Nama suku
      table.string('suku', 50).notNullable()

    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}