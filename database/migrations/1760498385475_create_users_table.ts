import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Primary key
      table.integer('pegawai_id').unsigned().nullable()
      table.string('username', 50).nullable()
      table.string('password', 255).nullable()
      table.enu('role', ['superadmin', 'admin', 'pegawai']).nullable()
      table.string('email', 100).nullable()
      table.string('otp', 6).nullable()
      table.dateTime('otp_expiry').nullable()
      table.boolean('is_active').nullable()
      table.string('email_pribadi', 100).nullable()
      table.string('reset_token', 255).nullable()
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