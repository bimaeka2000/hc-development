import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Role extends BaseModel {
<<<<<<< HEAD
<<<<<<< HEAD
  static table = 'roles'
=======
<<<<<<< HEAD
  static table = 'role'
=======
  static table = 'roles'
>>>>>>> e621cc5 ("Update Backend")
>>>>>>> 0fef1fd ("Update Backend")
=======
  static table = 'roles'
>>>>>>> f3dd996 (update untuk push ke backup)

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nama_role: string

  @column()
  declare status: string
}
