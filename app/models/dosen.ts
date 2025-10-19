import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Dosen extends BaseModel {
  static table = 'dosen'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare nidn: string

  @column()
  declare prodi: string

  @column()
  declare fakultas: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
