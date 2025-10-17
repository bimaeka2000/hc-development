
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class CutiUser extends BaseModel {

  static table = 'cuti_user'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare pegawai_id: number
  
  @column()
  declare jenis_cuti: string

  @column()
  declare jumlah_cuti: string

}