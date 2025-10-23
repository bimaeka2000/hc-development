import { DateTime } from 'luxon'
import { BelongsTo, Has, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
import Role from '#models/role'
import Keluarga from '#models/keluarga'
import Dosen from '#models/dosen'
import UnitKerja from '#models/unit_kerja'
import StatusKepegawaian from '#models/status_kepegawaian'
import DataKesehatanFisik from '#models/data_kesehatan_fisik'
import RiwayatKesehatan from '#models/riwayat_kesehatan'
import DokumenPegawai from '#models/dokumen_pegawai'
import RiwayatPendidikan from '#models/riwayat_pendidikan'
import Suku from '#models/suku'
import Agama from '#models/agama'
import RiwayatGaji from './riwayat_gaji.js'
import Pelatihan from './pelatihan.js'
import Penghargaan from './penghargaan.js'
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

  @hasOne(() => Keluarga, {
    foreignKey: 'pegawai_id',
  })
  declare keluarga: HasOne<typeof Keluarga>

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  declare role: BelongsTo<typeof Role>

  @hasOne(() => Dosen, {
    foreignKey: 'pegawai_id',
  })
  declare dosen: HasOne<typeof Dosen>

  @belongsTo(() => StatusKepegawaian)
  declare statusKepegawaian: BelongsTo<typeof StatusKepegawaian>

  @hasOne(() => DataKesehatanFisik)
  declare dataKesehatanFisik: HasOne<typeof DataKesehatanFisik>

  @hasOne(() => RiwayatKesehatan)
  declare riwayatKesehatan: HasOne<typeof RiwayatKesehatan>

  @hasOne(() => DokumenPegawai)
  declare dokumen: HasOne<typeof DokumenPegawai>

  @hasOne(() => RiwayatPendidikan)
  declare pendidikan: HasOne<typeof RiwayatPendidikan>

  @belongsTo(() => Suku, { foreignKey: 'suku_id' })
  declare suku: BelongsTo<typeof Suku>

  @belongsTo(() => Agama, { foreignKey: 'agama_id' })
  declare agama: BelongsTo<typeof Agama>
}
