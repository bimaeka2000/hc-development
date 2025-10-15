import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UnitKerja extends BaseModel {
  static table = 'unit_kerja'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare unit_kerja: string

}