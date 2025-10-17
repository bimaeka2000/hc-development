import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class PengajuanCuti extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare user_id: number

  @column()
  declare kategori_cuti_id: number

  @column()
  declare file_pengajuan: string

  @column()
  declare jumlah_hari: number

  @column()
  declare izin_satu: number

  @column()
  declare izin_dua: number
  
  @column()
  declare izin_tiga: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}