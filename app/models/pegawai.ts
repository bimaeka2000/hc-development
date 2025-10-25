import { DateTime } from 'luxon'
import type { BelongsTo, Has, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne, belongsTo } from '@adonisjs/lucid/orm'
// ==== Relasi Model ====
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
import RiwayatGaji from '#models/riwayat_gaji'
import Pelatihan from '#models/pelatihan'
import Penghargaan from '#models/penghargaan'
import Penelitian from '#models/penelitian'
import Pengabdian from '#models/pengabdian'
import Publikasi from '#models/publikasi'

export default class Pegawai extends BaseModel {
  public static table = 'pegawai'

  // ==== Kolom Utama ====
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare npy: string | null

  @column()
  declare nik: string | null

  @column()
  declare npwp: string | null

  @column()
  declare nama_lengkap: string

  @column()
  declare jenis_kelamin: string | null

  @column()
  declare tempat_lahir: string | null

  @column.date()
  declare tanggal_lahir: DateTime | null

  @column()
  declare agama_id: number | null

  @column()
  declare suku_id: number | null

  @column()
  declare alamat: string | null

  @column()
  declare no_hp: string | null

  @column()
  declare no_hp_darurat: string | null

  @column()
  declare email_pribadi: string | null

  @column()
  declare email_kantor: string | null

  @column()
  declare status_perkawinan: string | null

  @column()
  declare status_kepegawaian_id: number | null

  @column()
  declare unit_kerja_id: number | null

  @column()
  declare nomor_urut: number | null

  @column()
  declare foto: string | null

  @column()
  declare status: string

  @column()
  declare role_id: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // ==== Relasi ====

  /** Role: setiap pegawai memiliki satu role */
  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  declare role: BelongsTo<typeof Role>

  /** Keluarga: satu pegawai bisa punya satu data keluarga */
  @hasOne(() => Keluarga, {
    foreignKey: 'pegawai_id',
  })
  declare keluarga: HasOne<typeof Keluarga>

  /** Dosen: satu pegawai punya data dosen */
  @hasOne(() => Dosen, {
    foreignKey: 'pegawai_id',
  })
  declare dosen: HasOne<typeof Dosen>

  /** Unit kerja */
  @belongsTo(() => UnitKerja, {
    foreignKey: 'unit_kerja_id',
  })
  declare unitKerja: BelongsTo<typeof UnitKerja>

  /** Status kepegawaian */
  @belongsTo(() => StatusKepegawaian, {
    foreignKey: 'status_kepegawaian_id',
  })
  declare statusKepegawaian: BelongsTo<typeof StatusKepegawaian>

  /** Data kesehatan fisik */
  @hasOne(() => DataKesehatanFisik, {
    foreignKey: 'pegawai_id',
  })
  declare dataKesehatanFisik: HasOne<typeof DataKesehatanFisik>

  /** Riwayat kesehatan */
  @hasOne(() => RiwayatKesehatan, {
    foreignKey: 'pegawai_id',
  })
  declare riwayatKesehatan: HasOne<typeof RiwayatKesehatan>

  /** Dokumen pegawai */
  @hasOne(() => DokumenPegawai, {
    foreignKey: 'pegawai_id',
  })
  declare dokumen: HasOne<typeof DokumenPegawai>

  /** Riwayat pendidikan */
  @hasOne(() => RiwayatPendidikan, {
    foreignKey: 'pegawai_id',
  })
  declare pendidikan: HasOne<typeof RiwayatPendidikan>

  /** Suku */
  @belongsTo(() => Suku, {
    foreignKey: 'suku_id',
  })
  declare suku: BelongsTo<typeof Suku>

  /** Agama */
  @belongsTo(() => Agama, {
    foreignKey: 'agama_id',
  })
  declare agama: BelongsTo<typeof Agama>

  @hasOne(() => RiwayatGaji, { foreignKey: 'pegawai_id' })
  declare riwayatGaji: HasOne<typeof RiwayatGaji>

  @belongsTo(() => UnitKerja, {
    foreignKey: 'unit_kerja_id', // kolom di Pegawai
  })

  declare unitkerja: BelongsTo<typeof UnitKerja>
  @hasOne(() => Pelatihan, { foreignKey: 'pegawai_id' })
  declare pelatihan: HasOne<typeof Pelatihan>

  @hasOne(() => Pengabdian, { foreignKey: 'pegawai_id' })
  declare pengabdian: HasOne<typeof Pengabdian>

  @hasOne(() => Penghargaan, { foreignKey: 'pegawai_id' })
  declare penghargaan: HasOne<typeof Penghargaan>

  @hasOne(() => Penelitian, { foreignKey: 'pegawai_id' })
  declare penelitian: HasOne<typeof Penelitian>

  @hasOne(() => Publikasi, { foreignKey: 'pegawai_id' })
  declare publikasi: HasOne<typeof Publikasi>
}
