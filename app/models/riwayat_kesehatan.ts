import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RiwayatKesehatan extends BaseModel {
  static table = 'riwayat_kesehatan'

  @column({ isPrimary: true })
  declare id: number

  @column()
<<<<<<< HEAD
<<<<<<< HEAD
  declare pegawai_id: number
=======
<<<<<<< HEAD
  declare id_pegawai: number
=======
  declare pegawai_id: number
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
=======
  declare pegawai_id: number
>>>>>>> f3dd996 (update untuk push ke backup)

  @column()
  declare jenis_penyakit: string

  @column()
  declare keterangan: string

  @column()
  declare tanggal_diagnosa: Date

  @column()
  declare status_sembuh: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
