import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class JenisDokumen extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare jenis_dokumen: string


}