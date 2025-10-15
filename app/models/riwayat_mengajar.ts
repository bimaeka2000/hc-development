import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RiwayatMengajar extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_dosen: number

  @column()
  declare semester: string

  @column()
  declare tahun_akademik: string

  @column()
  declare mata_kuliah: string

  @column()
  declare sks: number

  @column()
  declare program_studi: string

  @column()
  declare institusi: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}