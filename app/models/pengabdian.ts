import { DateTime } from 'luxon'
import type { BelongsTo, Has, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import Dosen from './dosen.js'
export default class Pengabdian extends BaseModel {
  static table = 'pengabdian'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_dosen: number

  @column()
  declare judul: string

  @column()
  declare tahun_mulai: Date

  @column()
  declare tahun_selesai: Date

  @column()
  declare dana: number

  @column()
  declare sumber_dana: string

  @column()
  declare peran: string

  @column()
  declare keterangan: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Dosen, { foreignKey: 'id_dosen' })
  declare dosen: BelongsTo<typeof Dosen>
}
