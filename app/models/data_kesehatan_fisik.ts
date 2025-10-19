import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, belongsTo, hasMany } from '@adonisjs/lucid/orm'

import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Pegawai from './pegawai.js'

export default class DataKesehatanFisik extends BaseModel {
  static table = 'data_kesehatan_fisik'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'pegawai_id' })
  declare pegawaiId: number

  @column()
  declare tinggi_cm: number

  @column()
  declare berat_kg: number

  @column()
  declare golongan_darah: string

  @column()
  declare alergi: string
  @column()
  declare tekanan_darah: string

  @column()
  declare disabilitas: string

  @column()
  declare catatan_kesehatan: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
