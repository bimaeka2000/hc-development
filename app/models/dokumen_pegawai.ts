import { DateTime } from 'luxon'
import type { BelongsTo, Has, HasOne } from '@adonisjs/lucid/types/relations'

import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'

import JenisDokumen from './jenis_dokumen.js'

export default class DokumenPegawai extends BaseModel {
  static table = 'dokumen_pegawai'
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'pegawai_id' })
  declare pegawai_id: number

  @belongsTo(() => DokumenPegawai)
  declare jenisDokumenId: BelongsTo<typeof DokumenPegawai>

  @hasOne(() => DokumenPegawai, {
    foreignKey: 'pegawai_id', // defaults to userId
  })
  declare dokumenPegawai: HasOne<typeof DokumenPegawai>

  @belongsTo(() => JenisDokumen, { foreignKey: 'jenis_dokumen_id' })
  declare jenisDokumen: BelongsTo<typeof JenisDokumen>

  @column()
  declare jenis_dokumen_id: number

  @column()
  declare nama_file: string

  @column()
  declare tanggal_upload: Date

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
