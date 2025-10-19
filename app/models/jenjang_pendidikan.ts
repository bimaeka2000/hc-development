import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class JenjangPendidikan extends BaseModel {
  static table = 'jenjang_pendidikan'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare jenjang_pendidikan: string
}
