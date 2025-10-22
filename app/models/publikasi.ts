import { DateTime } from 'luxon'
import type { BelongsTo, Has, HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Dosen from './dosen.js'
export default class Publikasi extends BaseModel {
  static table = 'publikasi'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_dosen: number

  @column()
  declare judul: string

  @column()
  declare jenis: string

  @column()
  declare nama_media: string

  @column()
  declare tahun: Date

  @column()
  declare link_publikasi: string

  @column()
  declare keterangan: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Dosen, { foreignKey: 'dosen_id' })
  declare dosen: BelongsTo<typeof Dosen>
}
