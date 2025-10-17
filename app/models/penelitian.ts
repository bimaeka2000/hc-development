import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Penelitian extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_dosen: number

  @column()
  declare judul: string

  @column()
  declare tahun_mulai: number

  @column()
  declare tahun_selesai: number

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
}