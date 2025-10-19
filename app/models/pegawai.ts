import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pegawai extends BaseModel {
  static table = 'pegawai'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare npy: string

  @column()
  declare nik: string

  @column()
  declare npwp: string

  @column()
  declare nama_lengkap: string

  @column()
  declare jenis_kelamin: string

  @column()
  declare tempat_lahir: string

  @column()
  declare tanggal_lahir: Date

  @column()
  declare agama_id: number

  @column()
  declare suku_id: number

  @column()
  declare alamat: string

  @column()
  declare no_hp: string

  @column()
  declare no_hp_darurat: string

  @column()
  declare email_pribadi: string

  @column()
  declare email_kantor: string

  @column()
  declare status_perkawinan: string

  @column()
  declare status_kepegawaian_id: number

  @column()
  declare unit_kerja_id: number

  @column()
  declare nomor_urut: number

  @column()
  declare foto: string

  @column()
  declare status: string

  @column()
  declare role_id: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
