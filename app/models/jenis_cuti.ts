import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class JenisCuti extends BaseModel {
  static table = 'jenis_cuti'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare jenis_dokumen: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
