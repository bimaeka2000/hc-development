import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Suku extends BaseModel {
  static table = 'suku'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare suku: string
}
