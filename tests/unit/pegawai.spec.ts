import { test } from '@japa/runner'


test.group('Pegawai', () => {
  test('example test', async ({ assert }) => {
    console.log('testing')
  })
})

// ambil semua data pegawai
const Pegawai = (await import('#models/pegawai')).default
const findById = await Pegawai.find(5)
console.log(findById)
// creata data
// const bima = await Pegawai.create({ nama_lengkap: 'Bima', status: 'aktif' })
// console.log(bima)