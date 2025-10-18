import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RiwayatKesehatan extends BaseModel {
  static table = 'riwayat_kesehatan'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare jenis_penyakit: string

  @column()
  declare keterangan: string

  @column()
  declare tanggal_diagnosa: Date

  @column()
  declare status_sembuh: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}