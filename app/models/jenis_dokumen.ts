import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo, Has, HasOne } from '@adonisjs/lucid/types/relations'
import DokumenPegawai from './dokumen_pegawai.js'

export default class JenisDokumen extends BaseModel {
  static table = 'jenis_dokumen'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare jenis_dokumen: string

  @belongsTo(() => DokumenPegawai)
  declare dokumenPegawaiId: BelongsTo<typeof DokumenPegawai>
}
