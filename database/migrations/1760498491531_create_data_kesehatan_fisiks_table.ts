import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'data_kesehatan_fisik'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Primary key
      table.integer('id_pegawai').unsigned().nullable()
      table.integer('tinggi_cm').nullable()
      table.integer('berat_kg').nullable()
      table.string('golongan_darah', 5).nullable()
      table.string('tekanan_darah', 20).nullable()
      table.string('alergi', 255).nullable()
      table.string('disabilitas', 255).nullable()
      table.text('catatan_kesehatan').nullable()
      table
        .timestamp('created_at', { useTz: true })
        .defaultTo(this.now())
      table
        .timestamp('updated_at', { useTz: true })
        .defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}