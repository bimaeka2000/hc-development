import { DateTime } from 'luxon'
import type { BelongsTo, Has, HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Pengabdian from './pengabdian.js'
import Penelitian from './penelitian.js'
import Publikasi from './publikasi.js'
export default class Dosen extends BaseModel {
  static table = 'dosen'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'pegawai_id' })
  declare pegawai_id: number

  @column()
  declare nidn: string

  @column()
  declare nuptk: string

  @column()
  declare fakultas: string

  @column()
  declare prodi: string

  @column()
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // 📌 Tambahan relasi ke tabel-tabel terkait dosen

  @hasMany(() => Pengabdian, { foreignKey: 'id_dosen' })
  declare pengabdian: HasMany<typeof Pengabdian>

  @hasMany(() => Penelitian, { foreignKey: 'id_dosen' })
  declare penelitian: HasMany<typeof Penelitian>

  @hasMany(() => Publikasi, { foreignKey: 'id_dosen' })
  declare publikasi: HasMany<typeof Publikasi>
}
