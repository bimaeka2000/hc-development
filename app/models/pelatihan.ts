import { DateTime } from 'luxon'
import type { BelongsTo, Has, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import Pegawai from './pegawai.js'
export default class Pelatihan extends BaseModel {
  static table = 'pelatihan'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare nama_pelatihan: string

  @column()
  declare penyelenggara: string

  @column()
  declare tahun: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @belongsTo(() => Pegawai, { foreignKey: 'pegawai_id' })
  declare pegawai: BelongsTo<typeof Pegawai>
}
