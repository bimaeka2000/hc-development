import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RiwayatPendidikan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare jenjang_id: number

  @column()
  declare nama_instansi: string

  @column()
  declare jurusan: string

  @column()
  declare tahun_masuk: Date

  @column()
  declare tahun_lulus: Date

  @column()
  declare gelar: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}