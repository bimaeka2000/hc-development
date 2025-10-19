import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'riwayat_kesehatan'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      // Relasi ke tabel pegawai
      table
        .integer('id_pegawai')
        .unsigned()
        .references('id')
        .inTable('pegawai')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      // Kolom data kesehatan
      table.string('jenis_penyakit', 100).nullable()
      table.text('keterangan').nullable()
      table.date('tanggal_diagnosa').nullable()
      table.enu('status_sembuh', ['sembuh', 'belum']).nullable()

      // Timestamp otomatis
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
