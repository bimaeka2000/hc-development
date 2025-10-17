
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RiwayatGaji extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number

  @column()
  declare gaji_pokok: number

  @column()
  declare tmt: Date

  
}