import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RiwayatKesehatan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare id_pegawai: number

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