import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Agama extends BaseModel {
  static table = 'agama'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare agama: string
}
