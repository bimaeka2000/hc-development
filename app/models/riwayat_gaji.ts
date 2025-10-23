import { DateTime } from 'luxon'
import type { BelongsTo, Has, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import Pegawai from './pegawai.js'
export default class RiwayatGaji extends BaseModel {
  static table = 'riwayat_gaji'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare gaji_pokok: string

  @column()
  declare tmt: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Pegawai, { foreignKey: 'pegawai_id' })
  declare pegawai: BelongsTo<typeof Pegawai>
}
