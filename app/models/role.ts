import { BaseModel, column } from '@adonisjs/lucid/orm'
export default class Role extends BaseModel {
  static table = 'role'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_role: string

  @column()
  declare status: string

  @column()
  declare created_at: Date

  @column()
  declare updated_at: Date

}