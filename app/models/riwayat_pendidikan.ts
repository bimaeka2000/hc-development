import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import JenjangPendidikan from './jenjang_pendidikan.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class RiwayatPendidikan extends BaseModel {
  static table = 'riwayat_pendidikan'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'pegawai_id' })
  declare pegawai_id: number

  @belongsTo(() => JenjangPendidikan, { foreignKey: 'jenjang_id' })
  declare jenjangPendidikan: BelongsTo<typeof this.jenjangPendidikan>

  @column()
  declare jenjang_id: number

  @column()
  declare nama_instansi: string

  @column()
  declare jurusan: string

  @column()
  declare tahun_masuk: number

  @column()
  declare tahun_lulus: number

  @column()
  declare gelar: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
