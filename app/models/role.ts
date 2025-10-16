import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Role extends BaseModel {
  static table = 'role'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_role: string

  @column()
  declare status: string


  @column.dateTime({ autoCreate: true })
  declare dibuat_pada: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare diperbarui_pada: DateTime
}