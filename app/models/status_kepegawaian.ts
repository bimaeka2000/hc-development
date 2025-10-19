import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class StatusKepegawaian extends BaseModel {
  static table = 'status_kepegawaian'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare status_kepegawaian: string
}
