import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Role extends BaseModel {
  static table = 'roles'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_role: string

  @column()
  declare status: string
}
