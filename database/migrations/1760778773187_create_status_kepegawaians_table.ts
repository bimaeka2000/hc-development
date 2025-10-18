import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'status_kepegawaian'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      // Nama status kepegawaian
      table.string('status_kepegawaian', 50).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}