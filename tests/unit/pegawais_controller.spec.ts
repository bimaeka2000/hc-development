import { test } from '@japa/runner'
import PegawaisController from '#controllers/pegawai/pegawais_controller'

// We will stub model methods used by the controller.
// Since Japa doesn't include a mocking library by default, we'll use simple monkey-patching
// and restore originals after each test.

test.group('PegawaisController', (group) => {
  group.each.teardown(() => {
    // No global patches persisted across tests in this file
  })

  test('index should render dashboard/pegawai with ordered pegawais', async ({ assert }) => {
    const originalQuery = (await import('#models/pegawai')).default.query
    const pegawaiOrderBy = async () => [{ id: 1 }, { id: 2 }]

    // Patch Pegawai.query to return object with orderBy method
    ;(await import('#models/pegawai')).default.query = () => ({ orderBy: (_: string, __: string) => pegawaiOrderBy() }) as any

    const rendered: any[] = []
    const ctx: any = {
      view: {
        render: (tpl: string, data: any) => {
          rendered.push({ tpl, data })
          return `rendered:${tpl}`
        },
      },
    }

    const controller = new PegawaisController()
    const res = await controller.index(ctx)

    assert.equal(res, 'rendered:dashboard/pegawai')
    assert.deepEqual(rendered[0].data.pegawais, [{ id: 1 }, { id: 2 }])

    // restore
    ;(await import('#models/pegawai')).default.query = originalQuery
  })

  test('show should preload all relations and render detail view', async ({ assert }) => {
    const PegawaiModule = await import('#models/pegawai')
    const SukuModule = await import('#models/suku')
    const AgamaModule = await import('#models/agama')
    const UnitKerjaModule = await import('#models/unit_kerja')
    const StatusModule = await import('#models/status_kepegawaian')
    const RoleModule = await import('#models/role')

    const preloads: string[] = []

    // Stub Pegawai.query chain
    const fakeQuery = {
      where: (_: string, __: any) => fakeQuery,
      preload: (name: string, cb?: Function) => {
        preloads.push(name)
        if (cb) cb({ preload: (_n: string) => {} })
        return fakeQuery
      },
      firstOrFail: async () => ({ id: 10 }),
    }

    const originalPegawaiQuery = PegawaiModule.default.query
    PegawaiModule.default.query = () => fakeQuery as any

    // Stub static all() for referenced models
    const originalSukuAll = SukuModule.default.all
    const originalAgamaAll = AgamaModule.default.all
    const originalUnitAll = UnitKerjaModule.default.all
    const originalStatusAll = StatusModule.default.all
    const originalRoleAll = RoleModule.default.all

    SukuModule.default.all = async () => [{ id: 1, name: 'A' }] as any
    AgamaModule.default.all = async () => [{ id: 2, name: 'B' }] as any
    UnitKerjaModule.default.all = async () => [{ id: 3, name: 'C' }] as any
    StatusModule.default.all = async () => [{ id: 4, name: 'D' }] as any
    RoleModule.default.all = async () => [{ id: 5, name: 'E' }] as any

    const rendered: any[] = []
    const ctx: any = {
      params: { id: 10 },
      view: {
        render: (tpl: string, data: any) => {
          rendered.push({ tpl, data })
          return `rendered:${tpl}`
        },
      },
      response: {},
    }

    const controller = new PegawaisController()
    const res = await controller.show(ctx)

    assert.equal(res, 'rendered:dashboard/pegawai_detail')
    assert.deepInclude(rendered[0].data, {
      pegawaiData: { id: 10 },
    })
    assert.containsSubset(rendered[0].data, {
      suku: [{ id: 1, name: 'A' }],
      agama: [{ id: 2, name: 'B' }],
      unitKerja: [{ id: 3, name: 'C' }],
      statusKepegawaian: [{ id: 4, name: 'D' }],
      role: [{ id: 5, name: 'E' }],
    })

    // Ensure critical relations were preloaded
    const expectedPreloads = [
      'keluarga',
      'role',
      'dosen',
      'dataKesehatanFisik',
      'riwayatKesehatan',
      'dokumen',
      'pendidikan',
      'statusKepegawaian',
      'unitKerja',
      'suku',
      'agama',
      'riwayatGaji',
      'pelatihan',
      'penghargaan',
    ]
    expectedPreloads.forEach((rel) => assert.include(preloads, rel))

    // restore
    PegawaiModule.default.query = originalPegawaiQuery
    SukuModule.default.all = originalSukuAll
    AgamaModule.default.all = originalAgamaAll
    UnitKerjaModule.default.all = originalUnitAll
    StatusModule.default.all = originalStatusAll
    RoleModule.default.all = originalRoleAll
  })

  test('show should respect params.id when filtering', async ({ assert }) => {
    const PegawaiModule = await import('#models/pegawai')
    let capturedWhere: any[] = []

    const fakeQuery = {
      where: (col: string, val: any) => {
        capturedWhere.push([col, val])
        return fakeQuery
      },
      preload: (_: string) => fakeQuery,
      firstOrFail: async () => ({ id: 99 }),
    }

    const originalPegawaiQuery = PegawaiModule.default.query
    PegawaiModule.default.query = () => fakeQuery as any

    const ctx: any = { params: { id: 77 }, view: { render: () => '' } }
    const controller = new PegawaisController()
    await controller.show(ctx)

    assert.deepEqual(capturedWhere, [['id', 77]])

    PegawaiModule.default.query = originalPegawaiQuery
  })

  test('index should handle empty results', async ({ assert }) => {
    const PegawaiModule = await import('#models/pegawai')
    const originalPegawaiQuery = PegawaiModule.default.query
    PegawaiModule.default.query = () => ({ orderBy: async () => [] }) as any

    const rendered: any[] = []
    const ctx: any = { view: { render: (tpl: string, data: any) => (rendered.push({ tpl, data }), tpl) } }

    const controller = new PegawaisController()
    const res = await controller.index(ctx as any)

    assert.equal(res, 'dashboard/pegawai')
    assert.deepEqual(rendered[0].data.pegawais, [])

    PegawaiModule.default.query = originalPegawaiQuery
  })

  test('show should propagate firstOrFail rejection', async ({ assert }) => {
    const PegawaiModule = await import('#models/pegawai')

    const originalPegawaiQuery = PegawaiModule.default.query
    const fakeQuery = {
      where: () => fakeQuery,
      preload: () => fakeQuery,
      firstOrFail: async () => {
        throw Object.assign(new Error('Not found'), { status: 404 })
      },
    }
    PegawaiModule.default.query = () => fakeQuery as any

    const controller = new PegawaisController()

    try {
      await controller.show({ params: { id: 1 }, view: { render: () => '' } } as any)
      assert.fail('Expected error to be thrown')
    } catch (err: any) {
      assert.equal(err.status, 404)
      assert.match(err.message, /Not found/)
    }

    PegawaiModule.default.query = originalPegawaiQuery
  })
})
