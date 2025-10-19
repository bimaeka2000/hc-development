import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
export default class Keluarga extends BaseModel {
  static table = 'keluarga'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'pegawai_id' })
  declare pegawai_id: number

  @column()
  declare nama_keluarga: string

  @column()
  declare hubungan: string

  @column()
  declare tanggal_lahir: Date

  @column()
  declare pekerjaan: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
