
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Kelurga extends BaseModel {
  static table = 'keluarga'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare nama_keluarga: string

  @column()
  declare hubungan: string

  @column()
  declare tanggal_lahir: Date

  @column()
  declare pekerjaan: string

  
}