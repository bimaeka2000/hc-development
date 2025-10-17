import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kategori_cuti'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('jenis_cuti',50).nullable()
      table.integer('jumlah_cuti').nullable()
      table.integer('status').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}