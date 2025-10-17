
import { BaseModel, column } from '@adonisjs/lucid/orm'


export default class KategoriCuti extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare jenis_cuti: string

  @column()
  declare jumlah_cuti: number

  @column()
  declare status: number
}