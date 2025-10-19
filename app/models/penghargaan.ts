import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Penghargaan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare nama_penghargaan: string

  @column()
  declare instansi: string

  @column()
  declare tahun: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
