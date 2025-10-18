import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jenis_dokumen'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('jenis_dokumen')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}