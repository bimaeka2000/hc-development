import { DateTime } from 'luxon'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import Pegawai from './pegawai.js'

export default class UnitKerja extends BaseModel {
  static table = 'unit_kerja'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare unit_kerja: string
}
