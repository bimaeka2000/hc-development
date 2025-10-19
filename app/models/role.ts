import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import Pegawai from './pegawai.js'
export default class Role extends BaseModel {
  static table = 'roles'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_role: string

  @column()
  declare status: string

  @hasOne(() => Pegawai)
  declare pegawai: HasOne<typeof Pegawai>
}
