// Dashboard script: handles sidebar, theme, charts, dynamic content and small interactions
document.addEventListener('DOMContentLoaded', () => {
  // ===== Global Toast Notification Utility =====
  function notifyToast(type = 'success', message = '', options = {}) {
    // type: success | error | warning | info
    const container = document.getElementById('globalToastContainer')
    if (!container) return console.warn('Toast container missing')
    const id = 't' + Date.now() + Math.random().toString(16).slice(2)
    const icons = {
      success: 'check-circle-fill',
      error: 'x-circle-fill',
      warning: 'exclamation-triangle-fill',
      info: 'info-circle-fill',
    }
    const colors = { success: 'success', error: 'danger', warning: 'warning', info: 'info' }
    const icon = icons[type] || icons.info
    const color = colors[type] || colors.info
    const delay = options.delay ?? 4000
    // build toast element
    const div = document.createElement('div')
    div.className = `toast align-items-center border-0 show fade shadow-sm mb-2 bg-${color} text-white` // .show for immediate display
    div.id = id
    div.setAttribute('role', 'alert')
    div.setAttribute('aria-live', 'polite')
    div.setAttribute('aria-atomic', 'true')
    div.innerHTML = `
			<div class="d-flex">
				<div class="toast-body d-flex align-items-start gap-2">
					<i class="bi bi-${icon} fs-5"></i>
					<div>${message}</div>
				</div>
				<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>`
    container.appendChild(div)
    // auto remove
    setTimeout(() => {
      div.classList.remove('show')
      div.addEventListener('transitionend', () => div.remove(), { once: true })
    }, delay)
    return div
  }

  // wire logout links by id if present
  const logoutSidebarEl = document.getElementById('logoutSidebar')
  const logoutDropdownEl = document.getElementById('logoutDropdown')
  if (logoutSidebarEl)
    logoutSidebarEl.addEventListener('click', (e) => {
      e.preventDefault()
      doLogout()
    })
  if (logoutDropdownEl)
    logoutDropdownEl.addEventListener('click', (e) => {
      e.preventDefault()
      doLogout()
    })

  // Safely get common elements (may not exist on every page now that we are multi-page)
  const body = document.body
  const sidebar = document.getElementById('sidebar')
  const btnToggleSidebar = document.getElementById('btnToggleSidebar')
  const btnCloseSidebar = document.getElementById('btnCloseSidebar')
  const btnTheme = document.getElementById('btnTheme')
  const lastUpdateEl = document.getElementById('lastUpdate')
  const yearEl = document.getElementById('year')
  const valDosen = document.getElementById('valDosen')
  const notifList = document.getElementById('notifList')
  const logBody = document.getElementById('logBody')
  // Limit refresh button lookup: prefer one with data-role if later added. Fallback to first .btn-primary inside dashboard section.
  let refreshBtn = document.querySelector('[data-role="refresh-dashboard"]')
  if (!refreshBtn && body.classList.contains('page-dashboard'))
    refreshBtn = document.querySelector('.btn-primary')

  // Persistence helpers (localStorage)
  const setPref = (k, v) => {
    try {
      localStorage.setItem(k, v)
    } catch (e) {}
  }
  const getPref = (k, def) => {
    try {
      return localStorage.getItem(k) ?? def
    } catch (e) {
      return def
    }
  }

  // Sidebar state
  function applySidebarState() {
    const collapsed = getPref('sidebarCollapsed', 'false') === 'true'
    if (collapsed) {
      body.classList.add('collapsed')
      sidebar.classList.add('sidebar-collapsed')
    } else {
      body.classList.remove('collapsed')
      sidebar.classList.remove('sidebar-collapsed')
    }
  }

  function toggleSidebarMobile() {
    if (window.innerWidth < 992) {
      sidebar.classList.toggle('show')
    } else {
      const isCollapsed = body.classList.toggle('collapsed')
      sidebar.classList.toggle('sidebar-collapsed')
      setPref('sidebarCollapsed', isCollapsed.toString())
    }
  }

  if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', toggleSidebarMobile)
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', toggleSidebarMobile)

  // Click outside to close (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 992 && sidebar.classList.contains('show')) {
      const clickedOutsideSidebar = !sidebar.contains(e.target)
      const clickedToggle =
        btnToggleSidebar && btnToggleSidebar.contains && btnToggleSidebar.contains(e.target)
      if (clickedOutsideSidebar && !clickedToggle) {
        sidebar.classList.remove('show')
      }
    }
  })

  // Theme toggle with persistence
  function applyTheme() {
    const theme = getPref(
      'theme',
      document.documentElement.getAttribute('data-bs-theme') || 'light'
    )
    document.documentElement.setAttribute('data-bs-theme', theme)
    btnTheme.innerHTML =
      theme === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>'
  }
  if (btnTheme) {
    btnTheme.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-bs-theme') || 'light'
      const next = current === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-bs-theme', next)
      btnTheme.innerHTML =
        next === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>'
      setPref('theme', next)
    })
  }

  // Dynamic values
  if (yearEl) yearEl.textContent = new Date().getFullYear()
  function updateLast() {
    if (lastUpdateEl) lastUpdateEl.textContent = new Date().toLocaleString('id-ID')
  }
  if (lastUpdateEl) updateLast()

  // Charts
  let trafficChart, fakultasChart
  let kepegChart
  function initCharts() {
    const trafficCanvas = document.getElementById('trafficChart')
    if (!trafficCanvas || !window.Chart) return // Skip charts when canvas not on this page
    const ctx = trafficCanvas.getContext('2d')
    trafficChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: 12 }, (_, i) => 'M-' + (i + 1)),
        datasets: [
          {
            label: 'Presensi',
            data: [120, 145, 132, 150, 160, 172, 168, 180, 190, 205, 198, 210],
            tension: 0.35,
            borderWidth: 2,
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13,110,253,.15)',
            fill: true,
            pointRadius: 3,
          },
          {
            label: 'Kegiatan Akademik',
            data: [80, 95, 90, 100, 110, 108, 115, 118, 125, 138, 142, 150],
            tension: 0.35,
            borderWidth: 2,
            borderColor: '#20c997',
            backgroundColor: 'rgba(32,201,151,.15)',
            fill: true,
            pointRadius: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { backgroundColor: 'rgba(0,0,0,.8)' },
        },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.1)' } },
          x: { grid: { display: false } },
        },
      },
    })

    const fakultasCanvas = document.getElementById('fakultasChart')
    if (fakultasCanvas) {
      const ctx2 = fakultasCanvas.getContext('2d')
      fakultasChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Admin', 'IT', 'Akademik', 'Keuangan', 'R&D', 'Lainnya'],
          datasets: [
            {
              data: [420, 310, 280, 190, 150, 120],
              backgroundColor: ['#0d6efd', '#6610f2', '#20c997', '#ffc107', '#dc3545', '#6c757d'],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: '60%',
          plugins: {
            legend: { position: 'bottom' },
          },
        },
      })
    }

    // small kepegawaian line (sparklike) chart
    const ctx3El = document.getElementById('kepegChart')
    if (ctx3El) {
      const ctx3 = ctx3El.getContext('2d')
      kepegChart = new Chart(ctx3, {
        type: 'line',
        data: {
          labels: [
            'W-11',
            'W-10',
            'W-9',
            'W-8',
            'W-7',
            'W-6',
            'W-5',
            'W-4',
            'W-3',
            'W-2',
            'W-1',
            'Minggu',
          ],
          datasets: [
            {
              label: 'Rekrutmen',
              data: [2, 1, 0, 3, 1, 0, 2, 1, 1, 0, 1, 3],
              borderColor: '#0d6efd',
              fill: false,
            },
          ],
        },
      })
    }
  }

  // Simulate data update / refresh
  function simulateRefresh() {
    // show small loading state
    if (refreshBtn) {
      refreshBtn.disabled = true
      refreshBtn.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i> Memuat...'
    }
    setTimeout(
      () => {
        // Update some numbers randomly
        const dosenCount = 120 + Math.floor(Math.random() * 20)
        if (valDosen) valDosen.textContent = dosenCount

        // Add a new log row
        const tr = document.createElement('tr')
        tr.innerHTML = `
				<td>${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</td>
				<td><span class="badge text-bg-primary-subtle text-primary">Dosen</span></td>
				<td>Sinkronisasi otomatis selesai</td>
				<td><span class="badge text-bg-success">Sukses</span></td>
				<td><button class="btn btn-sm btn-outline-primary"><i class="bi bi-eye"></i></button></td>`
        if (logBody) logBody.prepend(tr)

        // Add notification
        const li = document.createElement('li')
        li.className = 'list-group-item d-flex'
        li.innerHTML = `<i class="bi bi-info-circle text-primary me-2"></i><div>Sinkronisasi SIAKAD berhasil<div class="text-secondary small">Sekarang</div></div>`
        if (notifList) notifList.prepend(li)

        updateLast()

        if (refreshBtn) {
          if (refreshBtn) {
            refreshBtn.disabled = false
            refreshBtn.innerHTML = '<i class="bi bi-arrow-repeat me-1"></i> Refresh'
          }
        }
        notifyToast('success', 'Data dashboard berhasil diperbarui')
      },
      1200 + Math.random() * 1200
    )
  }

  // Wire refresh button (primary button in top bar)
  if (refreshBtn) {
    refreshBtn.addEventListener('click', simulateRefresh)
  }

  // Example simulated incoming log every 10-20 seconds
  if (logBody) {
    setInterval(
      () => {
        const tr = document.createElement('tr')
        const tags = ['Dosen', 'Unit', 'Auth', 'Sys']
        const tag = tags[Math.floor(Math.random() * tags.length)]
        tr.innerHTML = `
				<td>${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</td>
				<td><span class="badge text-bg-${tag === 'Dosen' ? 'primary' : tag === 'Unit' ? 'warning' : tag === 'Auth' ? 'danger' : 'secondary'}-subtle text-${tag === 'Dosen' ? 'primary' : tag === 'Unit' ? 'warning' : tag === 'Auth' ? 'danger' : 'secondary'}">${tag}</span></td>
				<td>Aktivitas acak: ${tag}</td>
				<td><span class="badge text-bg-success">Sukses</span></td>
				<td><button class="btn btn-sm btn-outline-primary"><i class="bi bi-eye"></i></button></td>`
        logBody.prepend(tr)
        while (logBody.children.length > 12) logBody.removeChild(logBody.lastChild)
        updateLast()
      },
      15000 + Math.random() * 5000
    )
  }

  // Initialize UI state and charts
  if (sidebar) applySidebarState()
  applyTheme()
  try {
    initCharts()
  } catch (e) {
    console.warn('Chart init skipped:', e.message)
  }

  // Legacy auto-highlight (filename-based). Do not override manual/server-side active classes.
  if (sidebar) {
    // If any link already has an active class (set by server or our manual mapping), leave it alone.
    if (!sidebar.querySelector('a.nav-link.active')) {
      const currentFilename = location.pathname.split('/').pop()
      ;[...sidebar.querySelectorAll('a.nav-link[href]')].forEach((a) => {
        const href = a.getAttribute('href')
        if (!href) return
        try {
          // Compare filename portion of the href to current filename
          const url = new URL(href, location.origin)
          const hrefFile = url.pathname.split('/').pop()
          if (hrefFile && hrefFile === currentFilename) a.classList.add('active')
        } catch (e) {
          // fallback for non-URL hrefs
          if (href === currentFilename) a.classList.add('active')
        }
      })
    }
  }

  // ================== Dynamic Breadcrumb ==================
  ;(function initBreadcrumb() {
    const file = location.pathname.split('/').pop() || 'index.html'
    if (/login\.html$/i.test(file)) return // skip login
    const map = {
      'index.html': [{ label: 'Dashboard' }],
      'pegawai.html': [{ label: 'Dashboard', href: 'index.html' }, { label: 'Pegawai' }],
      'pegawai-detail.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Pegawai', href: 'pegawai.html' },
        { label: 'Detail' },
      ],
      'pegawai-edit.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Pegawai', href: 'pegawai.html' },
        { label: 'Edit' },
      ],
      'users.html': [{ label: 'Dashboard', href: 'index.html' }, { label: 'Users' }],
      'penelitian.html': [{ label: 'Dashboard', href: 'index.html' }, { label: 'Penelitian' }],
      'pengabdian.html': [{ label: 'Dashboard', href: 'index.html' }, { label: 'Pengabdian' }],
      'pengajuan-sakit.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Cuti' },
        { label: 'Pengajuan Sakit' },
      ],
      'pengajuan-izin.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Cuti' },
        { label: 'Pengajuan Izin' },
      ],
      'cuti.html': [{ label: 'Dashboard', href: 'index.html' }, { label: 'Cuti' }],
      'pengajuan-cuti.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Cuti' },
        { label: 'Pengajuan Cuti' },
      ],
      'dokumen-pendukung.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Dokumen' },
        { label: 'Pendukung' },
      ],
      'dokumen-pegawai.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Dokumen' },
        { label: 'Pegawai' },
      ],
      'jenjang-pendidikan.html': [
        { label: 'Dashboard', href: 'index.html' },
        { label: 'Pendidikan' },
        { label: 'Jenjang' },
      ],
      'profil-dosen.html': [{ label: 'Dashboard', href: 'index.html' }, { label: 'Profil' }],
    }
    let trail = map[file]
    if (!trail) {
      // fallback: try to use navbar title as final label
      const navTitle = document.querySelector('.top-navbar h6, .top-navbar .navbar-brand')
      trail = [
        { label: 'Dashboard', href: 'index.html' },
        { label: navTitle?.textContent?.trim() || 'Halaman' },
      ]
    }
    // For detail & edit pages optionally append employee name if available
    if (file === 'pegawai-detail.html' || file === 'pegawai-edit.html') {
      try {
        const params = new URLSearchParams(location.search)
        const id = params.get('id')
        if (id) {
          const listRaw = localStorage.getItem('hc_pegawai_v1')
          if (listRaw) {
            const list = JSON.parse(listRaw)
            const peg = list.find((p) => String(p.id) === String(id))
            if (peg && peg.nama) {
              trail = trail.slice() // clone
              trail[trail.length - 1] = {
                label: trail[trail.length - 1].label,
                href: file === 'pegawai-detail.html' ? undefined : undefined,
              }
              trail.push({ label: peg.nama })
            }
          }
        }
      } catch (e) {}
    }
    const main = document.querySelector('main')
    if (!main) return
    // Prevent duplicate injection
    if (main.querySelector('nav[aria-label="breadcrumb"]')) return
    const nav = document.createElement('nav')
    nav.setAttribute('aria-label', 'breadcrumb')
    nav.className = 'mb-3 small'
    const ol = document.createElement('ol')
    ol.className = 'breadcrumb mb-0'
    trail.forEach((item, idx) => {
      const li = document.createElement('li')
      li.className = 'breadcrumb-item' + (idx === trail.length - 1 ? ' active' : '')
      if (idx !== trail.length - 1 && item.href) {
        const a = document.createElement('a')
        a.href = item.href
        a.textContent = item.label
        li.appendChild(a)
      } else {
        li.textContent = item.label
        if (idx === trail.length - 1) li.setAttribute('aria-current', 'page')
      }
      ol.appendChild(li)
    })
    nav.appendChild(ol)
    // Insert at top of main content
    main.insertBefore(nav, main.firstElementChild)
  })()

  // Klik kartu pegawai -> buka modal profil (jika modal & data tersedia)
  document.addEventListener('click', (e) => {
    const card = e.target.closest?.('#pegawaiCards .card[data-nip]')
    if (!card) return
    const nip = card.getAttribute('data-nip')
    if (!nip || !window.pegawaiData || !window.showPegawaiProfile) {
      return notifyToast('warning', 'Detail profil belum siap')
    }
    try {
      window.showPegawaiProfile(nip)
    } catch (err) {
      console.error(err)
      notifyToast('error', 'Gagal membuka profil pegawai')
    }
  })

  // (Profil page demo code removed as part of revert to original layout)

  // ====== Employee profile card logic (Data Pegawai) ======
  const pegawaiData = {
    1987001: {
      name: 'Adi Santoso',
      nip: '1987001',
      status: 'Aktif',
      statusColor: 'success',
      kepeg: {
        left: [
          ['Status Kepegawaian', 'PNS'],
          ['Gol/Pangkat', 'III/b'],
          ['Jabatan', 'Staf IT'],
          ['Unit', 'Unit IT'],
          ['TMT', '01-02-2020'],
        ],
        right: [
          ['Masa Kerja', '5 thn 7 bln'],
          ['Status Aktif', '<span class="badge text-bg-success">Aktif</span>'],
          ['Jenis', 'Pegawai Tetap'],
          ['No. SK', 'SK-IT-2024-08'],
          ['Penilaian', 'Baik (2024)'],
        ],
      },
      keluarga: [
        { nama: 'Lina Wijaya', hub: 'Istri', tgl: '1990-04-11', pek: 'Guru' },
        { nama: 'Dio Santoso', hub: 'Anak', tgl: '2015-09-02', pek: '-' },
      ],
      pribadi: {
        left: [
          ['Tempat Lahir', 'Jakarta'],
          ['Tanggal Lahir', '1987-05-12'],
          ['Jenis Kelamin', 'Laki-laki'],
          ['Agama', 'Islam'],
          ['Kewarganegaraan', 'Indonesia'],
        ],
        right: [
          ['Alamat', 'Jl. Mawar No. 8'],
          ['Telepon', '0812-8888-1111'],
          ['Email Pribadi', 'adi@mail.com'],
          ['Status Pernikahan', 'Menikah'],
          ['Golongan Darah', 'A'],
        ],
      },
      dokumen: {
        col1: [
          ['KTP', 'Terverifikasi', 'success'],
          ['NPWP', 'Terverifikasi', 'success'],
          ['BPJS', 'Proses', 'warning'],
        ],
        col2: [
          ['Ijazah S1', 'Lengkap', 'success'],
          ['Ijazah S2', 'Lengkap', 'success'],
          ['Ijazah S3', 'Lengkap', 'success'],
        ],
      },
      pendidikan: [
        { t: 'S1', i: 'Univ X', p: 'Teknik Informatika', y: '2009', g: 'S.T.' },
        { t: 'S2', i: 'Univ Y', p: 'Sistem Informasi', y: '2012', g: 'M.T.I.' },
      ],
    },
    1978015: {
      name: 'Rina Marlina',
      nip: '1978015',
      status: 'Cuti',
      statusColor: 'warning',
      kepeg: {
        left: [
          ['Status Kepegawaian', 'PNS'],
          ['Gol/Pangkat', 'IV/a'],
          ['Jabatan', 'Kepala Akademik'],
          ['Unit', 'Akademik'],
          ['TMT', '15-03-2018'],
        ],
        right: [
          ['Masa Kerja', '14 thn 2 bln'],
          ['Status Aktif', '<span class="badge text-bg-warning">Cuti</span>'],
          ['Jenis', 'Pegawai Tetap'],
          ['No. SK', 'SK-AKD-2025-02'],
          ['Penilaian', 'Sangat Baik (2024)'],
        ],
      },
      keluarga: [
        { nama: 'Bambang', hub: 'Suami', tgl: '1975-07-22', pek: 'Karyawan' },
        { nama: 'Nia', hub: 'Anak', tgl: '2010-01-19', pek: '-' },
      ],
      pribadi: {
        left: [
          ['Tempat Lahir', 'Bandung'],
          ['Tanggal Lahir', '1978-11-07'],
          ['Jenis Kelamin', 'Perempuan'],
          ['Agama', 'Islam'],
          ['Kewarganegaraan', 'Indonesia'],
        ],
        right: [
          ['Alamat', 'Jl. Kenanga No. 3'],
          ['Telepon', '0813-0000-2222'],
          ['Email Pribadi', 'rina@mail.com'],
          ['Status Pernikahan', 'Menikah'],
          ['Golongan Darah', 'O'],
        ],
      },
      dokumen: {
        col1: [
          ['KTP', 'Terverifikasi', 'success'],
          ['NPWP', 'Terverifikasi', 'success'],
        ],
        col2: [
          ['SK Pangkat Terakhir', '2025', 'info'],
          ['Sertifikat Pendidik', 'Aktif', 'success'],
        ],
      },
      pendidikan: [
        { t: 'S1', i: 'Univ A', p: 'Administrasi', y: '2000', g: 'S.Adm.' },
        { t: 'S2', i: 'Univ B', p: 'Manajemen', y: '2004', g: 'M.M.' },
      ],
    },
    1990023: {
      name: 'Hendra',
      nip: '1990023',
      status: 'Aktif',
      statusColor: 'success',
      kepeg: {
        left: [
          ['Status Kepegawaian', 'Kontrak'],
          ['Gol/Pangkat', '-'],
          ['Jabatan', 'Staf Keuangan'],
          ['Unit', 'Keuangan'],
          ['TMT', '10-01-2023'],
        ],
        right: [
          ['Masa Kerja', '1 thn 9 bln'],
          ['Status Aktif', '<span class="badge text-bg-success">Aktif</span>'],
          ['Jenis', 'Kontrak'],
          ['No. SK', 'SK-KEU-2023-10'],
          ['Penilaian', 'Baik (2024)'],
        ],
      },
      keluarga: [],
      pribadi: {
        left: [
          ['Tempat Lahir', 'Cirebon'],
          ['Tanggal Lahir', '1990-03-30'],
          ['Jenis Kelamin', 'Laki-laki'],
          ['Agama', 'Islam'],
          ['Kewarganegaraan', 'Indonesia'],
        ],
        right: [
          ['Alamat', 'Jl. Damai No. 5'],
          ['Telepon', '0812-1234-555'],
          ['Email Pribadi', 'hendra@mail.com'],
          ['Status Pernikahan', 'Lajang'],
          ['Golongan Darah', 'B'],
        ],
      },
      dokumen: {
        col1: [
          ['KTP', 'Terverifikasi', 'success'],
          ['NPWP', 'Terverifikasi', 'success'],
        ],
        col2: [['BPJS', 'Terverifikasi', 'success']],
      },
      pendidikan: [{ t: 'S1', i: 'Univ Negeri', p: 'Akuntansi', y: '2012', g: 'S.Ak.' }],
    },
  }

  const profileModalEl = document.getElementById('pegawaiProfileModal')
  const pfName = document.getElementById('pfName')
  const pfNip = document.getElementById('pfNip')
  const pfStatusBadge = document.getElementById('pfStatusBadge')
  const pfAvatar = document.getElementById('pfAvatar')
  const pfQuickStats = document.getElementById('pfQuickStats')
  const pfPrev = document.getElementById('pfPrev')
  const pfNext = document.getElementById('pfNext')
  const pfPrevSm = document.getElementById('pfPrevSm')
  const pfNextSm = document.getElementById('pfNextSm')
  const pfPrint = document.getElementById('pfPrint')
  const pfTagJenis = document.getElementById('pfTagJenis')
  const pfGolonganBadge = document.getElementById('pfGolonganBadge')
  const btnCopyNip = document.getElementById('btnCopyNip')
  const pfCountKeluarga = document.getElementById('pfCountKeluarga')
  const pfCountDokumen = document.getElementById('pfCountDokumen')
  const pfCountPendidikan = document.getElementById('pfCountPendidikan')
  const pfSearchKeluarga = document.getElementById('pfSearchKeluarga')
  const pfSearchDokumen = document.getElementById('pfSearchDokumen')
  const pfSearchPendidikan = document.getElementById('pfSearchPendidikan')
  const pfDokumenSummary = document.getElementById('pfDokumenSummary')
  // Edit mode controls
  const pfEditBtn = document.getElementById('pfEditBtn')
  const pfEditHead = document.getElementById('pfEditHead')
  const pfSaveBtn = document.getElementById('pfSaveBtn')
  const pfCancelBtn = document.getElementById('pfCancelBtn')
  const pfEditToolbar = document.getElementById('pfEditToolbar')
  const pfAddKeluarga = document.getElementById('pfAddKeluarga')
  const pfAddDokumen = document.getElementById('pfAddDokumen')
  const pfAddPendidikan = document.getElementById('pfAddPendidikan')

  const pegawaiKeys = Object.keys(pegawaiData)
  let currentPegawaiIndex = 0
  let profileModalInstance = null
  let currentEditing = false
  let originalSnapshot = null // deep clone of current data when entering edit
  if (profileModalEl && window.bootstrap) {
    profileModalInstance = bootstrap.Modal.getOrCreateInstance(profileModalEl)
  }

  function fillTableBody(tbodyEl, rows) {
    if (!tbodyEl) return
    tbodyEl.innerHTML = rows
      .map((r) => `<tr><th class="w-50">${r[0]}</th><td>${r[1]}</td></tr>`)
      .join('')
  }
  function fillSimpleList(listEl, rows) {
    if (!listEl) return
    listEl.innerHTML = rows
      .map(
        (r) =>
          `<li class="list-group-item d-flex justify-content-between align-items-center">${r[0]} <span class="badge text-bg-${r[2]}">${r[1]}</span></li>`
      )
      .join('')
  }

  function showPegawaiProfile(nip) {
    const data = pegawaiData[nip]
    if (!data) return
    // reset edit mode if switching
    if (currentEditing) toggleEditMode(false)
    currentPegawaiIndex = pegawaiKeys.indexOf(nip)
    pfName.textContent = data.name
    pfNip.textContent = data.nip
    pfStatusBadge.textContent = data.status
    pfStatusBadge.className = `badge text-bg-${data.statusColor}`
    pfAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=0D6EFD&color=fff`
    // Golongan & Jenis (if present in kepeg data) -> search by key names
    try {
      const golRow = [...data.kepeg.left, ...data.kepeg.right].find((r) => /Gol/i.test(r[0]))
      if (golRow) {
        pfGolonganBadge.style.display = ''
        pfGolonganBadge.textContent = golRow[1]
      } else pfGolonganBadge.style.display = 'none'
      const jenisRow = [...data.kepeg.left, ...data.kepeg.right].find((r) => /Jenis/i.test(r[0]))
      if (jenisRow) {
        pfTagJenis.style.display = ''
        pfTagJenis.textContent = jenisRow[1]
      } else pfTagJenis.style.display = 'none'
    } catch (e) {
      pfGolonganBadge && (pfGolonganBadge.style.display = 'none')
      pfTagJenis && (pfTagJenis.style.display = 'none')
    }
    // quick stats (example derived data)
    if (pfQuickStats) {
      const masaKerjaRow = data.kepeg.right.find((r) => r[0] === 'Masa Kerja')
      const masaKerja = masaKerjaRow ? masaKerjaRow[1] : '-'
      const pendidikanCount = data.pendidikan.length
      const dokumenLengkap = [...data.dokumen.col1, ...data.dokumen.col2].filter((d) =>
        ['Terverifikasi', 'Lengkap', 'Aktif'].includes(d[1])
      ).length
      const keluargaCount = data.keluarga.length
      pfQuickStats.innerHTML = `
				<div class="col-6 col-md-3">
					<div class="d-flex stat-chip align-items-center">
						<div class="stat-chip-icon stat-chip-accent-primary"><i class="bi bi-clock-history"></i></div>
						<div>
							<small>Masa Kerja</small>
							<div class="stat-chip-value">${masaKerja}</div>
						</div>
					</div>
				</div>
				<div class="col-6 col-md-3">
					<div class="d-flex stat-chip align-items-center">
						<div class="stat-chip-icon stat-chip-accent-success"><i class="bi bi-mortarboard"></i></div>
						<div>
							<small>Pendidikan</small>
							<div class="stat-chip-value">${pendidikanCount} Riwayat</div>
						</div>
					</div>
				</div>
				<div class="col-6 col-md-3">
					<div class="d-flex stat-chip align-items-center">
						<div class="stat-chip-icon stat-chip-accent-warning"><i class="bi bi-folder-check"></i></div>
						<div>
							<small>Dokumen OK</small>
							<div class="stat-chip-value">${dokumenLengkap}</div>
						</div>
					</div>
				</div>
				<div class="col-6 col-md-3">
					<div class="d-flex stat-chip align-items-center">
						<div class="stat-chip-icon stat-chip-accent-danger"><i class="bi bi-people"></i></div>
						<div>
							<small>Keluarga</small>
							<div class="stat-chip-value">${keluargaCount}</div>
						</div>
					</div>
				</div>`
    }
    // kepeg
    fillTableBody(document.getElementById('pfKepegLeft'), data.kepeg.left)
    fillTableBody(document.getElementById('pfKepegRight'), data.kepeg.right)
    // keluarga
    const kelBody = document.getElementById('pfKeluargaBody')
    const renderKeluarga = (filter = '') => {
      const rows = data.keluarga.filter(
        (k) =>
          !filter ||
          Object.values(k).some((v) => String(v).toLowerCase().includes(filter.toLowerCase()))
      )
      kelBody.innerHTML = rows.length
        ? rows
            .map(
              (k) =>
                `<tr><td>${k.nama}</td><td>${k.hub}</td><td>${k.tgl}</td><td>${k.pek}</td></tr>`
            )
            .join('')
        : '<tr><td colspan="4" class="text-secondary fst-italic">Tidak ada data</td></tr>'
    }
    renderKeluarga()
    if (pfCountKeluarga) pfCountKeluarga.textContent = data.keluarga.length
    // pribadi
    fillTableBody(document.getElementById('pfPribadiLeft'), data.pribadi.left)
    fillTableBody(document.getElementById('pfPribadiRight'), data.pribadi.right)
    // dokumen
    const dokCol1El = document.getElementById('pfDokumenCol1')
    const dokCol2El = document.getElementById('pfDokumenCol2')
    const allDocs = [...data.dokumen.col1, ...data.dokumen.col2]
    const renderDokumen = (filter = '') => {
      const fDocs = allDocs.filter(
        (d) =>
          !filter ||
          d[0].toLowerCase().includes(filter.toLowerCase()) ||
          d[1].toLowerCase().includes(filter.toLowerCase())
      )
      // split again roughly half for columns
      const mid = Math.ceil(fDocs.length / 2)
      const left = fDocs.slice(0, mid)
      const right = fDocs.slice(mid)
      fillSimpleList(dokCol1El, left)
      fillSimpleList(dokCol2El, right)
      if (pfCountDokumen) pfCountDokumen.textContent = allDocs.length
      if (pfDokumenSummary)
        pfDokumenSummary.textContent = `${allDocs.length} dokumen (${fDocs.length} ditampilkan)`
    }
    renderDokumen()
    // pendidikan
    const pendBody = document.getElementById('pfPendidikanBody')
    const renderPendidikan = (filter = '') => {
      const rows = data.pendidikan.filter(
        (p) =>
          !filter ||
          Object.values(p).some((v) => String(v).toLowerCase().includes(filter.toLowerCase()))
      )
      pendBody.innerHTML = rows
        .map(
          (p) =>
            `<tr><td>${p.t}</td><td>${p.i}</td><td>${p.p}</td><td>${p.y}</td><td>${p.g}</td></tr>`
        )
        .join('')
    }
    renderPendidikan()
    if (pfCountPendidikan) pfCountPendidikan.textContent = data.pendidikan.length
    // reset active tab to first
    try {
      profileModalEl.querySelectorAll('#pfTabs button').forEach((btn, i) => {
        btn.classList.toggle('active', i === 0)
      })
      profileModalEl.querySelectorAll('#pfTabsContent .tab-pane').forEach((pane, i) => {
        pane.classList.toggle('show', i === 0)
        pane.classList.toggle('active', i === 0)
      })
    } catch (e) {}
    profileModalInstance && profileModalInstance.show()

    // attach dynamic search handlers (debounced) each time to capture latest data
    function debounce(fn, ms) {
      let t
      return (...a) => {
        clearTimeout(t)
        t = setTimeout(() => fn(...a), ms)
      }
    }
    if (pfSearchKeluarga)
      pfSearchKeluarga.oninput = debounce((e) => renderKeluarga(e.target.value), 200)
    if (pfSearchDokumen)
      pfSearchDokumen.oninput = debounce((e) => renderDokumen(e.target.value), 200)
    if (pfSearchPendidikan)
      pfSearchPendidikan.oninput = debounce((e) => renderPendidikan(e.target.value), 200)
  }

  // expose to global so outside handlers (eg. card click earlier) can call them
  try {
    window.pegawaiData = pegawaiData
    window.showPegawaiProfile = showPegawaiProfile
  } catch (e) {}

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  // Central list of possible dokumen statuses & their Bootstrap color keys
  const DOC_STATUS_OPTIONS = [
    { text: 'Terverifikasi', color: 'success' },
    { text: 'Lengkap', color: 'success' },
    { text: 'Aktif', color: 'success' },
    { text: 'Proses', color: 'warning' },
    { text: 'Pending', color: 'info' },
    { text: 'Baru', color: 'secondary' },
    { text: 'Kadaluarsa', color: 'danger' },
  ]

  function buildStatusSelect(selectedText) {
    return `<select class="form-select form-select-sm pf-doc-status">${DOC_STATUS_OPTIONS.map((opt) => `<option value="${opt.text}" data-color="${opt.color}" ${opt.text === selectedText ? 'selected' : ''}>${opt.text}</option>`).join('')}</select>`
  }

  let currentEditScope = null // 'header' | 'content'
  function toggleEditMode(enable, scope = null) {
    if (enable) {
      if (currentEditing && currentEditScope !== scope) {
        removeEditableBehaviors()
      }
      currentEditScope = scope || 'content'
      currentEditing = true
      pfEditBtn.classList.add('d-none')
      pfSaveBtn.classList.remove('d-none')
      pfCancelBtn.classList.remove('d-none')
      pfEditToolbar.classList.toggle('d-none', currentEditScope !== 'content')
      profileModalEl.querySelector('.modal-profile-header').classList.add('editing')
      profileModalEl.classList.add('pf-editing')
      const currentKey = pegawaiKeys[currentPegawaiIndex]
      originalSnapshot = deepClone(pegawaiData[currentKey])
      makeTablesEditable(currentEditScope)
    } else {
      currentEditing = false
      currentEditScope = null
      pfEditBtn.classList.remove('d-none')
      pfSaveBtn.classList.add('d-none')
      pfCancelBtn.classList.add('d-none')
      pfEditToolbar.classList.add('d-none')
      profileModalEl.querySelector('.modal-profile-header').classList.remove('editing')
      profileModalEl.classList.remove('pf-editing')
      removeEditableBehaviors()
    }
  }

  function makeTablesEditable(scope) {
    // Convert text cells in kepeg & pribadi tables to editable inputs (excluding header th)
    if (scope === 'header' || scope === 'all') {
      // Make NIP editable (header area). Replace span text with input.
      if (pfNip && !pfNip.querySelector('input')) {
        const currentNip = pfNip.textContent.trim()
        pfNip.dataset.originalNip = currentNip // keep original for potential cancel logic (snapshot covers data; this is UI)
        pfNip.innerHTML = `<input type="text" class="form-control form-control-sm d-inline-block" style="width:160px" value="${currentNip.replace(/"/g, '&quot;')}">`
      }
      // Make Name editable
      if (pfName && !pfName.querySelector('input')) {
        const cloned = pfName.cloneNode(true)
        ;[...cloned.querySelectorAll('span')].forEach((s) => s.remove())
        const currentName = cloned.textContent.trim()
        const extraSpans = [...pfName.querySelectorAll('span')]
        pfName.innerHTML = `<input type="text" class="form-control form-control-sm d-inline-block me-2" style="width:220px" value="${currentName.replace(/"/g, '&quot;')}">`
        extraSpans.forEach((sp) => pfName.appendChild(sp))
      }
      // Status select
      if (pfStatusBadge && !pfStatusBadge.querySelector('select')) {
        const currentStatus = pfStatusBadge.textContent.trim()
        const statusOptions = [
          { t: 'Aktif', c: 'success' },
          { t: 'Cuti', c: 'warning' },
          { t: 'Nonaktif', c: 'secondary' },
          { t: 'Suspended', c: 'danger' },
          { t: 'Proses', c: 'info' },
        ]
        pfStatusBadge.innerHTML = `<select class="form-select form-select-sm pf-status-select" style="min-width:130px">${statusOptions.map((o) => `<option value="${o.t}" data-color="${o.c}" ${o.t === currentStatus ? 'selected' : ''}>${o.t}</option>`).join('')}</select>`
        pfStatusBadge.className = 'p-0 border-0 bg-transparent'
      }
      // show foto tools
      const photoEditWrap = document.getElementById('pfPhotoEditWrap')
      if (photoEditWrap) photoEditWrap.classList.remove('d-none')
    }
    // If scope is header only, don't alter tables/lists
    if (scope === 'header') return // Content scope: make kepeg & pribadi editable
    ;['pfKepegLeft', 'pfKepegRight', 'pfPribadiLeft', 'pfPribadiRight'].forEach((id) => {
      const tbody = document.getElementById(id)
      if (!tbody) return
      ;[...tbody.querySelectorAll('tr')].forEach((tr) => {
        const valCell = tr.querySelector('td')
        if (!valCell) return
        if (valCell.querySelector('input')) return
        valCell.classList.add('pf-editable-cell')
        const currentHtml = valCell.innerHTML
        const textOnly = currentHtml.replace(/<[^>]+>/g, '').trim()
        valCell.innerHTML = `<input type="text" value="${textOnly.replace(/"/g, '&quot;')}">`
      })
    })
    // Keluarga table rows -> each td (except actions to be added) becomes input
    const kelBody = document.getElementById('pfKeluargaBody')
    if (kelBody) {
      ;[...kelBody.querySelectorAll('tr')].forEach((tr) => {
        if (tr.querySelector('.pf-inline-actions')) return
        ;[...tr.children].forEach((td, i) => {
          const isEmptyRow = td.classList.contains('fst-italic')
          if (isEmptyRow) return
          const txt = td.textContent.trim()
          td.classList.add('pf-editable-cell', 'position-relative')
          td.innerHTML = `<input type="text" value="${txt.replace(/"/g, '&quot;')}">`
        })
        // append inline actions once per row
        const last = tr.lastElementChild
        const actionWrap = document.createElement('div')
        actionWrap.className = 'pf-inline-actions'
        actionWrap.innerHTML = `<button type="button" class="btn btn-sm btn-danger" data-act="del-row" title="Hapus"><i class="bi bi-trash"></i></button>`
        last.style.position = 'relative'
        last.appendChild(actionWrap)
      })
    }
    // Dokumen list items -> transform label part only (before badge)
    ;['pfDokumenCol1', 'pfDokumenCol2'].forEach((id) => {
      const ul = document.getElementById(id)
      if (!ul) return
      ;[...ul.querySelectorAll('li')].forEach((li) => {
        if (li.querySelector('input')) return
        const badge = li.querySelector('.badge')
        const originalText = li.childNodes[0].textContent.trim()
        const statusText = badge ? badge.textContent.trim() : 'Baru'
        // derive color from existing badge class or fallback
        let color = 'secondary'
        if (badge) {
          const match = badge.className.match(/text-bg-(\w+)/)
          if (match) color = match[1]
        }
        li.innerHTML = `
					<div class="pf-editable-cell flex-grow-1 me-2"><input type="text" value="${originalText.replace(/"/g, '&quot;')}"></div>
					<div class="pf-editable-cell me-2" style="min-width:130px">${buildStatusSelect(statusText)}</div>
					<span class="badge pf-doc-status-badge text-bg-${color}">${statusText}</span>
				`
        li.classList.add('position-relative', 'gap-2')
        const actionWrap = document.createElement('div')
        actionWrap.className = 'pf-inline-actions'
        actionWrap.innerHTML = `<button type="button" class="btn btn-sm btn-danger" data-act="del-doc" title="Hapus"><i class="bi bi-x-lg"></i></button>`
        li.appendChild(actionWrap)
        // wire select change -> live update badge
        const sel = li.querySelector('select.pf-doc-status')
        const liveBadge = li.querySelector('.pf-doc-status-badge')
        if (sel && liveBadge) {
          sel.addEventListener('change', () => {
            const opt = sel.selectedOptions[0]
            const c = opt.dataset.color || 'secondary'
            liveBadge.className = `badge pf-doc-status-badge text-bg-${c}`
            liveBadge.textContent = opt.value
          })
        }
      })
    })
    // Pendidikan table
    const pendBody = document.getElementById('pfPendidikanBody')
    if (pendBody) {
      ;[...pendBody.querySelectorAll('tr')].forEach((tr) => {
        ;[...tr.children].forEach((td) => {
          const val = td.textContent.trim()
          td.classList.add('pf-editable-cell')
          td.innerHTML = `<input type="text" value="${val.replace(/"/g, '&quot;')}">`
        })
        const action = document.createElement('td')
        action.innerHTML = `<div class="pf-inline-actions" style="position:static"><button type="button" class="btn btn-sm btn-danger" data-act="del-pend" title="Hapus"><i class="bi bi-trash"></i></button></div>`
        tr.appendChild(action)
      })
    }
    // (Header fields intentionally not editable in content scope)
  }

  function removeEditableBehaviors() {
    // simply re-render profile to restore original viewing cells
    const key = pegawaiKeys[currentPegawaiIndex]
    showPegawaiProfile(key)
    // hide photo edit UI
    const photoEditWrap = document.getElementById('pfPhotoEditWrap')
    if (photoEditWrap) photoEditWrap.classList.add('d-none')
  }

  function collectEditedData() {
    const key = pegawaiKeys[currentPegawaiIndex]
    const snapshot = deepClone(pegawaiData[key])
    // if NIP input present, update snapshot.nip (and name if we later enable name editing)
    const nipInput = pfNip ? pfNip.querySelector('input') : null
    if (nipInput) {
      const newNipVal = nipInput.value.trim()
      if (newNipVal) snapshot.nip = newNipVal
    }
    // name
    const nameInput = pfName ? pfName.querySelector('input') : null
    if (nameInput) {
      const newNameVal = nameInput.value.trim()
      if (newNameVal) snapshot.name = newNameVal
    }
    // status badge select
    const statusSelect = document.querySelector('.pf-status-select')
    if (statusSelect) {
      const opt = statusSelect.selectedOptions[0]
      snapshot.status = opt ? opt.value : snapshot.status
      snapshot.statusColor = opt ? opt.dataset.color || 'secondary' : snapshot.statusColor
      // also patch kepeg data 'Status Aktif' row if exists
      try {
        const allRows = [...snapshot.kepeg.left, ...snapshot.kepeg.right]
        const idxRight = snapshot.kepeg.right.findIndex((r) => /Status Aktif/i.test(r[0]))
        if (idxRight > -1)
          snapshot.kepeg.right[idxRight][1] =
            `<span class="badge text-bg-${snapshot.statusColor}">${snapshot.status}</span>`
        const idxLeft = snapshot.kepeg.left.findIndex((r) => /Status Aktif/i.test(r[0]))
        if (idxLeft > -1)
          snapshot.kepeg.left[idxLeft][1] =
            `<span class="badge text-bg-${snapshot.statusColor}">${snapshot.status}</span>`
      } catch (e) {}
    }
    // kepeg & pribadi
    function grabPairs(sectionId) {
      const tbody = document.getElementById(sectionId)
      if (!tbody) return []
      return [...tbody.querySelectorAll('tr')]
        .map((tr) => {
          const th = tr.querySelector('th')
          const inp = tr.querySelector('td input')
          if (!th || !inp) return null
          return [th.textContent.trim(), inp.value.trim() || '-']
        })
        .filter(Boolean)
    }
    snapshot.kepeg.left = grabPairs('pfKepegLeft')
    snapshot.kepeg.right = grabPairs('pfKepegRight')
    snapshot.pribadi.left = grabPairs('pfPribadiLeft')
    snapshot.pribadi.right = grabPairs('pfPribadiRight')
    // keluarga
    const kelRows = document.querySelectorAll('#pfKeluargaBody tr')
    snapshot.keluarga = [...kelRows]
      .map((tr) => {
        const tds = tr.querySelectorAll('td')
        if (tds.length < 4 || tr.querySelector('.fst-italic')) return null
        return {
          nama: tds[0].querySelector('input')?.value.trim() || '-',
          hub: tds[1].querySelector('input')?.value.trim() || '-',
          tgl: tds[2].querySelector('input')?.value.trim() || '-',
          pek: tds[3].querySelector('input')?.value.trim() || '-',
        }
      })
      .filter(Boolean)
    // dokumen
    function grabDocs(id) {
      const ul = document.getElementById(id)
      if (!ul) return []
      return [...ul.querySelectorAll('li')]
        .map((li) => {
          const nameInp = li.querySelector('input')
          const sel = li.querySelector('select.pf-doc-status')
          const badge = li.querySelector('.pf-doc-status-badge')
          if (!nameInp) return null
          let statusText = '-'
          let color = 'secondary'
          if (sel) {
            const opt = sel.selectedOptions[0]
            statusText = opt ? opt.value : '-'
            color = opt ? opt.dataset.color || 'secondary' : 'secondary'
          } else if (badge) {
            statusText = badge.textContent.trim()
            const m = badge.className.match(/text-bg-(\w+)/)
            if (m) color = m[1]
          }
          return [nameInp.value.trim() || '-', statusText, color]
        })
        .filter(Boolean)
    }
    const docsAll = [...grabDocs('pfDokumenCol1'), ...grabDocs('pfDokumenCol2')]
    const half = Math.ceil(docsAll.length / 2)
    snapshot.dokumen.col1 = docsAll.slice(0, half)
    snapshot.dokumen.col2 = docsAll.slice(half)
    // pendidikan
    const pendRows = document.querySelectorAll('#pfPendidikanBody tr')
    snapshot.pendidikan = [...pendRows]
      .map((tr) => {
        const inps = tr.querySelectorAll('input')
        if (inps.length < 5) return null
        return {
          t: inps[0].value.trim() || '-',
          i: inps[1].value.trim() || '-',
          p: inps[2].value.trim() || '-',
          y: inps[3].value.trim() || '-',
          g: inps[4].value.trim() || '-',
        }
      })
      .filter(Boolean)
    return snapshot
  }

  function addNewRowKeluarga() {
    const kelBody = document.getElementById('pfKeluargaBody')
    if (!kelBody) return
    if (kelBody.querySelector('.fst-italic')) kelBody.innerHTML = ''
    const tr = document.createElement('tr')
    tr.className = 'pf-row-added'
    tr.innerHTML =
      '<td class="pf-editable-cell"><input type="text" placeholder="Nama"></td><td class="pf-editable-cell"><input type="text" placeholder="Hubungan"></td><td class="pf-editable-cell"><input type="text" placeholder="YYYY-MM-DD"></td><td class="pf-editable-cell position-relative"><input type="text" placeholder="Pekerjaan"><div class="pf-inline-actions"><button type="button" class="btn btn-sm btn-danger" data-act="del-row" title="Hapus"><i class="bi bi-trash"></i></button></div></td>'
    kelBody.appendChild(tr)
    pfCountKeluarga.textContent = kelBody.querySelectorAll('tr').length
  }
  function addNewDokumen() {
    const col1 = document.getElementById('pfDokumenCol1')
    const li = document.createElement('li')
    li.className =
      'list-group-item d-flex justify-content-between align-items-center pf-row-added position-relative gap-2'
    // default status Baru
    li.innerHTML = `
			<div class="pf-editable-cell flex-grow-1 me-2"><input type="text" placeholder="Nama Dokumen"></div>
			<div class="pf-editable-cell me-2" style="min-width:130px">${buildStatusSelect('Baru')}</div>
			<span class="badge pf-doc-status-badge text-bg-secondary">Baru</span>
			<div class="pf-inline-actions"><button type="button" class="btn btn-sm btn-danger" data-act="del-doc" title="Hapus"><i class="bi bi-x-lg"></i></button></div>`
    col1.appendChild(li)
    // wire change for the newly added select
    const sel = li.querySelector('select.pf-doc-status')
    const liveBadge = li.querySelector('.pf-doc-status-badge')
    if (sel && liveBadge) {
      sel.addEventListener('change', () => {
        const opt = sel.selectedOptions[0]
        const c = opt.dataset.color || 'secondary'
        liveBadge.className = `badge pf-doc-status-badge text-bg-${c}`
        liveBadge.textContent = opt.value
      })
    }
    pfCountDokumen.textContent = parseInt(pfCountDokumen.textContent || '0') + 1
    pfDokumenSummary.textContent = `${pfCountDokumen.textContent} dokumen`
  }
  function addNewPendidikan() {
    const pendBody = document.getElementById('pfPendidikanBody')
    const tr = document.createElement('tr')
    tr.className = 'pf-row-added'
    tr.innerHTML =
      '<td class="pf-editable-cell"><input type="text" placeholder="Tingkat"></td><td class="pf-editable-cell"><input type="text" placeholder="Institusi"></td><td class="pf-editable-cell"><input type="text" placeholder="Program"></td><td class="pf-editable-cell"><input type="text" placeholder="Tahun"></td><td class="pf-editable-cell"><input type="text" placeholder="Gelar"></td><td><div class="pf-inline-actions" style="position:static"><button type="button" class="btn btn-sm btn-danger" data-act="del-pend" title="Hapus"><i class="bi bi-trash"></i></button></div></td>'
    pendBody.appendChild(tr)
    pfCountPendidikan.textContent = pendBody.querySelectorAll('tr').length
  }

  function handleInlineDelete(e) {
    const btn = e.target.closest('button')
    if (!btn) return
    const act = btn.getAttribute('data-act')
    if (!act) return
    if (act === 'del-row') {
      const tr = btn.closest('tr')
      tr?.remove()
      pfCountKeluarga.textContent = document.querySelectorAll('#pfKeluargaBody tr').length
      notifyToast('warning', 'Baris keluarga dihapus')
    } else if (act === 'del-doc') {
      const li = btn.closest('li')
      li?.remove()
      pfCountDokumen.textContent = document.querySelectorAll(
        '#pfDokumenCol1 li, #pfDokumenCol2 li'
      ).length
      pfDokumenSummary.textContent = `${pfCountDokumen.textContent} dokumen`
      notifyToast('warning', 'Dokumen dihapus')
    } else if (act === 'del-pend') {
      const tr = btn.closest('tr')
      tr?.remove()
      pfCountPendidikan.textContent = document.querySelectorAll('#pfPendidikanBody tr').length
      notifyToast('warning', 'Riwayat pendidikan dihapus')
    }
  }

  if (pfEditBtn) pfEditBtn.addEventListener('click', () => toggleEditMode(true, 'content'))
  if (pfEditHead) pfEditHead.addEventListener('click', () => toggleEditMode(true, 'header'))
  if (pfCancelBtn)
    pfCancelBtn.addEventListener('click', () => {
      // restore snapshot if exists
      if (originalSnapshot) {
        const key = pegawaiKeys[currentPegawaiIndex]
        pegawaiData[key] = deepClone(originalSnapshot)
      }
      toggleEditMode(false)
      showPegawaiProfile(pegawaiKeys[currentPegawaiIndex])
      notifyToast('info', 'Perubahan dibatalkan')
    })
  if (pfSaveBtn)
    pfSaveBtn.addEventListener('click', () => {
      const key = pegawaiKeys[currentPegawaiIndex]
      const newData = collectEditedData()
      // If NIP changed we need to re-key the object and update pegawaiKeys & current index
      const oldNip = pegawaiData[key].nip
      pegawaiData[key] = newData // temp assignment
      if (newData.nip && newData.nip !== oldNip) {
        // Prevent collision: if another entry uses the new NIP, append suffix
        let finalNip = newData.nip
        let counter = 1
        while (finalNip !== oldNip && pegawaiData[finalNip] && finalNip !== key) {
          finalNip = newData.nip + '-' + counter++
        }
        if (finalNip !== key) {
          // reassign under new key
          pegawaiData[finalNip] = newData
          delete pegawaiData[key]
          // rebuild key list
          pegawaiKeys.splice(pegawaiKeys.indexOf(key), 1, finalNip)
          currentPegawaiIndex = pegawaiKeys.indexOf(finalNip)
        }
      }
      // basic validation example: ensure at least name & nip not empty
      if (!newData.name) newData.name = pfName.textContent.trim()
      toggleEditMode(false)
      showPegawaiProfile(key)
      notifyToast('success', 'Data pegawai berhasil disimpan')
    })
  if (pfAddKeluarga)
    pfAddKeluarga.addEventListener('click', () => {
      addNewRowKeluarga()
      notifyToast('info', 'Baris keluarga baru ditambahkan')
    })
  if (pfAddDokumen)
    pfAddDokumen.addEventListener('click', () => {
      addNewDokumen()
      notifyToast('info', 'Dokumen baru ditambahkan')
    })
  if (pfAddPendidikan)
    pfAddPendidikan.addEventListener('click', () => {
      addNewPendidikan()
      notifyToast('info', 'Riwayat pendidikan baru ditambahkan')
    })
  profileModalEl?.addEventListener('click', (e) => currentEditing && handleInlineDelete(e))

  // sync listing table
  refreshPegawaiTable()
  // Re-render Data Pegawai table after edits
  function refreshPegawaiTable() {
    const tbody = document.getElementById('pegawaiTableBody')
    if (!tbody) return
    function findValue(rows, labelRegex) {
      const row = rows.find((r) => labelRegex.test(r[0]))
      return row ? row[1].replace(/<[^>]+>/g, '') : '-'
    }
    const rowsHtml = pegawaiKeys
      .map((k) => {
        const d = pegawaiData[k]
        const allKepeg = [...d.kepeg.left, ...d.kepeg.right]
        const unit = findValue(allKepeg, /Unit/i)
        const jab = findValue(allKepeg, /Jabatan/i)
        return `<tr data-nip="${d.nip}">
				<td>${d.nip}</td>
				<td><button class="btn btn-link p-0 profile-link" data-nip="${d.nip}">${d.name}</button></td>
				<td>${unit}</td>
				<td>${jab}</td>
				<td><span class="badge text-bg-${d.statusColor}">${d.status}</span></td>
			</tr>`
      })
      .join('')
    tbody.innerHTML = rowsHtml
  }

  function showPrevPegawai() {
    if (pegawaiKeys.length < 2) return
    currentPegawaiIndex = (currentPegawaiIndex - 1 + pegawaiKeys.length) % pegawaiKeys.length
    showPegawaiProfile(pegawaiKeys[currentPegawaiIndex])
  }
  function showNextPegawai() {
    if (pegawaiKeys.length < 2) return
    currentPegawaiIndex = (currentPegawaiIndex + 1) % pegawaiKeys.length
    showPegawaiProfile(pegawaiKeys[currentPegawaiIndex])
  }

  ;[pfPrev, pfPrevSm].forEach((btn) => btn && btn.addEventListener('click', showPrevPegawai))
  ;[pfNext, pfNextSm].forEach((btn) => btn && btn.addEventListener('click', showNextPegawai))
  if (pfPrint)
    pfPrint.addEventListener('click', () => {
      window.print()
      notifyToast('info', 'Mencetak profil pegawai')
    })
  if (btnCopyNip)
    btnCopyNip.addEventListener('click', () => {
      try {
        navigator.clipboard.writeText(pfNip.textContent.trim())
        btnCopyNip.classList.add('copied')
        btnCopyNip.innerHTML = '<i class="bi bi-check2"></i>'
        setTimeout(() => {
          btnCopyNip.classList.remove('copied')
          btnCopyNip.innerHTML = '<i class="bi bi-clipboard"></i>'
        }, 1200)
      } catch (e) {}
    })

  if (profileModalEl) {
    document.getElementById('pegawaiTableBody')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.profile-link')
      if (btn) {
        showPegawaiProfile(btn.getAttribute('data-nip'))
      }
    })
  }

  // small UI handlers for logbook and cuti
  const logForm = document.getElementById('logForm')
  const logList = document.getElementById('logList')
  if (logForm && logList) {
    logForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const input = document.getElementById('logInput')
      if (input && input.value.trim()) {
        const li = document.createElement('li')
        li.className = 'list-group-item'
        li.textContent = `[${new Date().toLocaleTimeString()}] ${input.value.trim()}`
        logList.prepend(li)
        input.value = ''
        notifyToast('success', 'Log aktivitas ditambahkan')
      }
    })
  }

  // Simple hash-based navigation for in-file sections
  // Removed hash-based SPA navigation (replaced by multi-page structure)

  // ================= Cuti Page Enhancements =================
  ;(function initCutiPage() {
    const tbody = document.getElementById('tbodyCuti')
    if (!tbody) return // not on cuti page
    const filterSearch = document.getElementById('filterSearchCuti')
    const filterStatus = document.getElementById('filterStatusCuti')
    const filterJenis = document.getElementById('filterJenisCuti')
    const filterTahun = document.getElementById('filterTahunCuti')
    const btnReset = document.getElementById('btnResetFilterCuti')
    const btnAjukan = document.getElementById('btnAjukanCuti')
    const modalEl = document.getElementById('modalAjukanCuti')
    const formAjukan = document.getElementById('formAjukanCuti')
    const countEl = document.getElementById('countCuti')
    const activityList = document.getElementById('activityCuti')
    const btnRefreshAct = document.getElementById('btnRefreshCutiActivity')
    let modalInstance = null
    if (modalEl && window.bootstrap) modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl)

    const rawData = [
      {
        id: 1,
        tgl: '2025-10-01',
        nama: 'Adi Santoso',
        jenis: 'tahunan',
        mulai: '2025-10-10',
        selesai: '2025-10-12',
        hari: 3,
        status: 'disetujui',
        alasan: 'Liburan keluarga',
      },
      {
        id: 2,
        tgl: '2025-09-28',
        nama: 'Rina Marlina',
        jenis: 'sakit',
        mulai: '2025-09-28',
        selesai: '2025-09-30',
        hari: 3,
        status: 'disetujui',
        alasan: 'Pemulihan kesehatan',
      },
      {
        id: 3,
        tgl: '2025-10-03',
        nama: 'Hendra',
        jenis: 'tahunan',
        mulai: '2025-10-20',
        selesai: '2025-10-22',
        hari: 3,
        status: 'proses',
        alasan: 'Acara keluarga',
      },
      {
        id: 4,
        tgl: '2025-09-25',
        nama: 'Dewi Lestari',
        jenis: 'lainnya',
        mulai: '2025-10-05',
        selesai: '2025-10-05',
        hari: 1,
        status: 'ditolak',
        alasan: 'Keperluan pribadi',
      },
      {
        id: 5,
        tgl: '2025-10-04',
        nama: 'Yusuf',
        jenis: 'tahunan',
        mulai: '2025-10-07',
        selesai: '2025-10-08',
        hari: 2,
        status: 'diajukan',
        alasan: 'Trip singkat',
      },
      {
        id: 6,
        tgl: '2025-10-04',
        nama: 'Sinta',
        jenis: 'sakit',
        mulai: '2025-10-04',
        selesai: '2025-10-06',
        hari: 3,
        status: 'diajukan',
        alasan: 'Demam tinggi',
      },
      {
        id: 7,
        tgl: '2025-09-30',
        nama: 'Bambang',
        jenis: 'tahunan',
        mulai: '2025-10-15',
        selesai: '2025-10-17',
        hari: 3,
        status: 'disetujui',
        alasan: 'Rekreasi',
      },
      {
        id: 8,
        tgl: '2025-10-02',
        nama: 'Lina',
        jenis: 'melahirkan',
        mulai: '2025-10-18',
        selesai: '2025-12-18',
        hari: 62,
        status: 'proses',
        alasan: 'Persiapan persalinan',
      },
      {
        id: 9,
        tgl: '2025-10-05',
        nama: 'Agus',
        jenis: 'tahunan',
        mulai: '2025-10-25',
        selesai: '2025-10-27',
        hari: 3,
        status: 'diajukan',
        alasan: 'Family time',
      },
    ]
    let data = rawData.slice()

    function statusBadge(st) {
      const map = {
        diajukan: 'status-diajukan',
        proses: 'status-proses',
        disetujui: 'status-disetujui',
        ditolak: 'status-ditolak',
      }
      const label = {
        diajukan: 'Diajukan',
        proses: 'Proses',
        disetujui: 'Disetujui',
        ditolak: 'Ditolak',
      }
      return `<span class="badge status-badge ${map[st] || 'status-diajukan'}">${label[st] || st}</span>`
    }
    function jenisLabel(j) {
      return (
        { tahunan: 'Tahunan', sakit: 'Sakit', melahirkan: 'Melahirkan', lainnya: 'Lainnya' }[j] || j
      )
    }
    function fmtPeriode(r) {
      return r.mulai === r.selesai ? r.mulai : `${r.mulai} → ${r.selesai}`
    }

    function renderYears() {
      if (!filterTahun) return
      const years = Array.from(new Set(data.map((d) => d.tgl.slice(0, 4)))).sort()
      filterTahun.innerHTML =
        '<option value="">Tahun: Semua</option>' +
        years.map((y) => `<option value="${y}">${y}</option>`).join('')
    }

    function renderTable() {
      const q = (filterSearch?.value || '').toLowerCase()
      const st = filterStatus?.value || ''
      const jn = filterJenis?.value || ''
      const th = filterTahun?.value || ''
      const rows = data.filter((r) => {
        return (
          (!q || Object.values(r).some((v) => String(v).toLowerCase().includes(q))) &&
          (!st || r.status === st) &&
          (!jn || r.jenis === jn) &&
          (!th || r.tgl.startsWith(th))
        )
      })
      tbody.innerHTML = rows
        .map(
          (r) => `<tr data-id="${r.id}">
				<td>${r.tgl}</td>
				<td>${r.nama}</td>
				<td>${jenisLabel(r.jenis)}</td>
				<td>${fmtPeriode(r)}</td>
				<td class="text-center">${r.hari}</td>
				<td>${statusBadge(r.status)}</td>
				<td>${r.alasan}</td>
				<td><button class="btn btn-sm btn-outline-primary" data-act="detail"><i class="bi bi-eye"></i></button></td>
			</tr>`
        )
        .join('')
      if (countEl) countEl.textContent = rows.length
    }

    function pushActivity(text, type = 'info') {
      if (!activityList) return
      const li = document.createElement('li')
      li.innerHTML = `${text}<div class=\"activity-meta\">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>`
      activityList.prepend(li)
      while (activityList.children.length > 10) activityList.removeChild(activityList.lastChild)
    }

    ;['input', 'change'].forEach((ev) => {
      filterSearch?.addEventListener(ev, renderTable)
      filterStatus?.addEventListener(ev, renderTable)
      filterJenis?.addEventListener(ev, renderTable)
      filterTahun?.addEventListener(ev, renderTable)
    })
    btnReset?.addEventListener('click', () => {
      ;['filterSearchCuti', 'filterStatusCuti', 'filterJenisCuti', 'filterTahunCuti'].forEach(
        (id) => {
          const el = document.getElementById(id)
          if (el) el.value = ''
        }
      )
      renderTable()
    })
    btnAjukan?.addEventListener('click', () => {
      // preset tanggal
      const today = new Date().toISOString().slice(0, 10)
      const tglInput = document.getElementById('cutiTanggalAjukan')
      if (tglInput) tglInput.value = today
      modalInstance?.show()
    })
    formAjukan?.addEventListener('submit', (e) => {
      e.preventDefault()
      const nama = document.getElementById('cutiNama').value.trim()
      const jenis = document.getElementById('cutiJenis').value
      const tgl = document.getElementById('cutiTanggalAjukan').value
      const mulai = document.getElementById('cutiMulai').value
      const selesai = document.getElementById('cutiSelesai').value
      const hari = parseInt(document.getElementById('cutiDurasi').value || '1', 10)
      const alasan = document.getElementById('cutiAlasan').value.trim()
      if (!nama || !tgl || !mulai || !selesai) return notifyToast('error', 'Form belum lengkap')
      const newRow = {
        id: Date.now(),
        tgl,
        nama,
        jenis,
        mulai,
        selesai,
        hari,
        status: 'diajukan',
        alasan,
      }
      data.push(newRow)
      renderYears()
      renderTable()
      modalInstance?.hide()
      notifyToast('success', 'Pengajuan cuti ditambahkan')
      pushActivity(`<strong>${nama}</strong> mengajukan cuti ${jenisLabel(jenis)} (${hari}h)`)
      formAjukan.reset()
    })
    btnRefreshAct?.addEventListener('click', () => {
      pushActivity('Sinkronisasi status cuti...')
      setTimeout(() => {
        pushActivity('Status terbaru diperbarui')
        notifyToast('info', 'Aktivitas diperbarui')
      }, 600)
    })
    tbody.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-act="detail"]')
      if (!btn) return
      const tr = btn.closest('tr')
      if (!tr) return
      const id = tr.getAttribute('data-id')
      const row = data.find((r) => String(r.id) === id)
      if (!row) return
      notifyToast('info', `Detail: ${row.nama} (${jenisLabel(row.jenis)})`)
    })

    // initial render
    renderYears()
    renderTable()
    pushActivity('Inisialisasi halaman cuti')
  })()

  // ================= Penelitian Page =================
  ;(function initPenelitian() {
    const tbody = document.getElementById('tbodyPenelitian')
    if (!tbody) return
    const search = document.getElementById('filterPenelitianSearch')
    const status = document.getElementById('filterPenelitianStatus')
    const bidang = document.getElementById('filterPenelitianBidang')
    const tahun = document.getElementById('filterPenelitianTahun')
    const reset = document.getElementById('btnPenelitianReset')
    const addBtn = document.getElementById('btnPenelitianTambah')
    const actList = document.getElementById('activityPenelitian')
    const refreshAct = document.getElementById('btnPenelitianRefresh')
    const countEl = document.getElementById('countPenelitian')
    const dist = {
      prop: document.getElementById('statProp'),
      review: document.getElementById('statReview'),
      didanai: document.getElementById('statDidanai'),
      selesai: document.getElementById('statSelesai'),
    }
    const bars = {
      prop: document.getElementById('barProp'),
      review: document.getElementById('barReview'),
      didanai: document.getElementById('barDidanai'),
      selesai: document.getElementById('barSelesai'),
    }
    let data = [
      {
        id: 1,
        judul: 'Optimasi Jaringan Kampus',
        ketua: 'Adi',
        bidang: 'saintek',
        mulai: '2025-01',
        selesai: '2025-10',
        status: 'didanai',
        dana: 120,
      },
      {
        id: 2,
        judul: 'Sistem Arsip Digital',
        ketua: 'Rina',
        bidang: 'saintek',
        mulai: '2025-03',
        selesai: '2025-11',
        status: 'review',
        dana: 0,
      },
      {
        id: 3,
        judul: 'Perilaku Belajar Daring',
        ketua: 'Lina',
        bidang: 'sosial',
        mulai: '2024-09',
        selesai: '2025-02',
        status: 'selesai',
        dana: 40,
      },
      {
        id: 4,
        judul: 'Model AI Presensi',
        ketua: 'Hendra',
        bidang: 'saintek',
        mulai: '2025-04',
        selesai: '2025-12',
        status: 'proposal',
        dana: 0,
      },
      {
        id: 5,
        judul: 'Literasi Keuangan UMKM',
        ketua: 'Dedi',
        bidang: 'humaniora',
        mulai: '2025-02',
        selesai: '2025-09',
        status: 'didanai',
        dana: 55,
      },
    ]
    function badge(st) {
      const map = {
        proposal: 'secondary',
        review: 'warning',
        didanai: 'success',
        selesai: 'primary',
      }
      const label = {
        proposal: 'Proposal',
        review: 'Review',
        didanai: 'Didanai',
        selesai: 'Selesai',
      }
      return `<span class="badge text-bg-${map[st] || 'secondary'}">${label[st] || st}</span>`
    }
    function years() {
      return Array.from(new Set(data.map((d) => d.mulai.slice(0, 4))))
    }
    function fillYears() {
      tahun.innerHTML =
        '<option value="">Tahun: Semua</option>' +
        years()
          .sort()
          .map((y) => `<option>${y}</option>`)
          .join('')
    }
    function pushAct(txt) {
      if (!actList) return
      const li = document.createElement('li')
      li.innerHTML = `${txt}<div class="activity-meta">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>`
      actList.prepend(li)
      while (actList.children.length > 10) actList.removeChild(actList.lastChild)
    }
    function render() {
      const q = (search?.value || '').toLowerCase()
      const st = status?.value || ''
      const bd = bidang?.value || ''
      const th = tahun?.value || ''
      const rows = data.filter(
        (r) =>
          (!q || [r.judul, r.ketua].some((v) => v.toLowerCase().includes(q))) &&
          (!st || r.status === st) &&
          (!bd || r.bidang === bd) &&
          (!th || r.mulai.startsWith(th))
      )
      tbody.innerHTML = rows
        .map(
          (r) =>
            `<tr data-id="${r.id}"><td>${r.judul}</td><td>${r.ketua}</td><td>${r.bidang}</td><td>${r.mulai}–${r.selesai}</td><td>${badge(r.status)}</td><td class="text-end">${r.dana}</td><td><button class="btn btn-sm btn-outline-primary" data-act="detail"><i class="bi bi-eye"></i></button></td></tr>`
        )
        .join('')
      if (countEl) countEl.textContent = rows.length // distribusi
      const totals = { proposal: 0, review: 0, didanai: 0, selesai: 0 }
      data.forEach((d) => {
        if (totals[d.status] !== undefined) totals[d.status]++
      })
      const totalAll = data.length || 1
      dist.prop.textContent = totals.proposal
      dist.review.textContent = totals.review
      dist.didanai.textContent = totals.didanai
      dist.selesai.textContent = totals.selesai
      bars.prop.style.width = (totals.proposal / totalAll) * 100 + '%'
      bars.review.style.width = (totals.review / totalAll) * 100 + '%'
      bars.didanai.style.width = (totals.didanai / totalAll) * 100 + '%'
      bars.selesai.style.width = (totals.selesai / totalAll) * 100 + '%'
    }
    ;['input', 'change'].forEach((ev) =>
      [search, status, bidang, tahun].forEach((el) => el && el.addEventListener(ev, render))
    )
    reset?.addEventListener('click', () => {
      ;[search, status, bidang, tahun].forEach((el) => el && (el.value = ''))
      render()
    })
    addBtn?.addEventListener('click', () => {
      const newObj = {
        id: Date.now(),
        judul: 'Proposal Baru ' + Date.now().toString().slice(-4),
        ketua: 'User',
        bidang: 'saintek',
        mulai: new Date().getFullYear() + '-07',
        selesai: new Date().getFullYear() + '-12',
        status: 'proposal',
        dana: 0,
      }
      data.push(newObj)
      render()
      pushAct('Proposal baru ditambahkan')
      notifyToast('success', 'Proposal ditambahkan')
    })
    refreshAct?.addEventListener('click', () => {
      pushAct('Sinkronisasi status penelitian...')
      setTimeout(() => pushAct('Sinkronisasi selesai'), 700)
    })
    tbody.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-act="detail"]')
      if (!b) return
      const id = b.closest('tr').getAttribute('data-id')
      const row = data.find((r) => String(r.id) === id)
      if (row) notifyToast('info', 'Detail: ' + row.judul)
    })
    fillYears()
    render()
    pushAct('Inisialisasi halaman penelitian')
  })()

  // ================= Pengabdian Page =================
  ;(function initPengabdian() {
    const tbody = document.getElementById('tbodyPengabdian')
    if (!tbody) return
    const search = document.getElementById('filterPengabdianSearch')
    const status = document.getElementById('filterPengabdianStatus')
    const tahun = document.getElementById('filterPengabdianTahun')
    const reset = document.getElementById('btnPengabdianReset')
    const addBtn = document.getElementById('btnPengabdianTambah')
    const act = document.getElementById('activityPengabdian')
    const refresh = document.getElementById('btnPengabdianRefresh')
    const count = document.getElementById('countPengabdian')
    const statPlan = document.getElementById('statPgPlan'),
      statRun = document.getElementById('statPgRun'),
      statDone = document.getElementById('statPgDone')
    const barPlan = document.getElementById('barPgPlan'),
      barRun = document.getElementById('barPgRun'),
      barDone = document.getElementById('barPgDone')
    let data = [
      {
        id: 1,
        judul: 'Pelatihan Digital Desa',
        koor: 'Adi',
        lokasi: 'Desa Sentosa',
        mulai: '2025-02',
        selesai: '2025-05',
        status: 'selesai',
        dana: 40,
      },
      {
        id: 2,
        judul: 'Pemberdayaan UMKM',
        koor: 'Rina',
        lokasi: 'Kota A',
        mulai: '2025-06',
        selesai: '2025-11',
        status: 'berjalan',
        dana: 55,
      },
      {
        id: 3,
        judul: 'Edukasi Kesehatan',
        koor: 'Lina',
        lokasi: 'Kecamatan B',
        mulai: '2025-07',
        selesai: '2025-09',
        status: 'berjalan',
        dana: 28,
      },
      {
        id: 4,
        judul: 'Program Literasi Anak',
        koor: 'Hendra',
        lokasi: 'Desa Cemerlang',
        mulai: '2025-08',
        selesai: '2025-12',
        status: 'perencanaan',
        dana: 0,
      },
    ]
    function badge(s) {
      const map = { perencanaan: 'secondary', berjalan: 'warning', selesai: 'success' }
      const label = { perencanaan: 'Perencanaan', berjalan: 'Berjalan', selesai: 'Selesai' }
      return `<span class="badge text-bg-${map[s] || 'secondary'}">${label[s] || s}</span>`
    }
    function years() {
      return Array.from(new Set(data.map((d) => d.mulai.slice(0, 4))))
    }
    function fillYears() {
      tahun.innerHTML =
        '<option value="">Tahun: Semua</option>' +
        years()
          .sort()
          .map((y) => `<option>${y}</option>`)
          .join('')
    }
    function pushAct(t) {
      if (!act) return
      const li = document.createElement('li')
      li.innerHTML = `${t}<div class="activity-meta">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>`
      act.prepend(li)
      while (act.children.length > 10) act.removeChild(act.lastChild)
    }
    function render() {
      const q = (search?.value || '').toLowerCase()
      const st = status?.value || ''
      const th = tahun?.value || ''
      const rows = data.filter(
        (r) =>
          (!q || [r.judul, r.koor, r.lokasi].some((v) => v.toLowerCase().includes(q))) &&
          (!st || r.status === st) &&
          (!th || r.mulai.startsWith(th))
      )
      tbody.innerHTML = rows
        .map(
          (r) =>
            `<tr data-id="${r.id}"><td>${r.judul}</td><td>${r.koor}</td><td>${r.lokasi}</td><td>${r.mulai}–${r.selesai}</td><td>${badge(r.status)}</td><td class="text-end">${r.dana}</td><td><button class="btn btn-sm btn-outline-primary" data-act="detail"><i class="bi bi-eye"></i></button></td></tr>`
        )
        .join('')
      if (count) count.textContent = rows.length
      const totals = { perencanaan: 0, berjalan: 0, selesai: 0 }
      data.forEach((d) => {
        if (totals[d.status] !== undefined) totals[d.status]++
      })
      const total = data.length || 1
      statPlan.textContent = totals.perencanaan
      statRun.textContent = totals.berjalan
      statDone.textContent = totals.selesai
      barPlan.style.width = (totals.perencanaan / total) * 100 + '%'
      barRun.style.width = (totals.berjalan / total) * 100 + '%'
      barDone.style.width = (totals.selesai / total) * 100 + '%'
    }
    ;['input', 'change'].forEach((ev) =>
      [search, status, tahun].forEach((el) => el && el.addEventListener(ev, render))
    )
    reset?.addEventListener('click', () => {
      ;[search, status, tahun].forEach((el) => el && (el.value = ''))
      render()
    })
    addBtn?.addEventListener('click', () => {
      const n = {
        id: Date.now(),
        judul: 'Program Baru ' + Date.now().toString().slice(-3),
        koor: 'User',
        lokasi: 'Lokasi X',
        mulai: new Date().getFullYear() + '-09',
        selesai: new Date().getFullYear() + '-12',
        status: 'perencanaan',
        dana: 0,
      }
      data.push(n)
      render()
      pushAct('Program baru ditambahkan')
      notifyToast('success', 'Program ditambahkan')
    })
    refresh?.addEventListener('click', () => {
      pushAct('Sinkronisasi status program...')
      setTimeout(() => pushAct('Status program diperbarui'), 650)
    })
    tbody.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-act="detail"]')
      if (!b) return
      const id = b.closest('tr').getAttribute('data-id')
      const row = data.find((r) => String(r.id) === id)
      if (row) notifyToast('info', 'Detail: ' + row.judul)
    })
    fillYears()
    render()
    pushAct('Inisialisasi halaman pengabdian')
  })()

  // ================= Rekrutmen Page =================
  ;(function initRekrutmen() {
    const tbody = document.getElementById('tbodyRekrutmen')
    if (!tbody) return
    const qEl = document.getElementById('recSearch')
    const stEl = document.getElementById('recStatus')
    const posEl = document.getElementById('recPosisi')
    const reset = document.getElementById('recReset')
    const add = document.getElementById('recTambah')
    const act = document.getElementById('activityRekrutmen')
    const refresh = document.getElementById('recRefreshAkt')
    const count = document.getElementById('countPelamar')
    const statIds = {
      baru: 'statRecBaru',
      screening: 'statRecScreening',
      interview: 'statRecInterview',
      lulus: 'statRecLulus',
      gagal: 'statRecGagal',
    }
    const barIds = {
      baru: 'barRecBaru',
      screening: 'barRecScreening',
      interview: 'barRecInterview',
      lulus: 'barRecLulus',
      gagal: 'barRecGagal',
    }
    function gi(id) {
      return document.getElementById(id)
    }
    const stats = {}
    const bars = {}
    Object.keys(statIds).forEach((k) => {
      stats[k] = gi(statIds[k])
      bars[k] = gi(barIds[k])
    })
    let data = [
      {
        id: 1,
        nama: 'Ani',
        posisi: 'administrasi',
        tgl: '2025-09-28',
        status: 'interview',
        kontak: 'ani@mail.com',
      },
      {
        id: 2,
        nama: 'Budi',
        posisi: 'teknisi',
        tgl: '2025-09-25',
        status: 'screening',
        kontak: 'budi@mail.com',
      },
      {
        id: 3,
        nama: 'Citra',
        posisi: 'keuangan',
        tgl: '2025-09-20',
        status: 'lulus',
        kontak: 'citra@mail.com',
      },
      {
        id: 4,
        nama: 'Dedi',
        posisi: 'administrasi',
        tgl: '2025-10-01',
        status: 'baru',
        kontak: 'dedi@mail.com',
      },
      {
        id: 5,
        nama: 'Eka',
        posisi: 'teknisi',
        tgl: '2025-10-02',
        status: 'baru',
        kontak: 'eka@mail.com',
      },
    ]
    function badge(st) {
      const map = {
        baru: 'secondary',
        screening: 'info',
        interview: 'warning',
        lulus: 'success',
        gagal: 'danger',
      }
      const label = {
        baru: 'Baru',
        screening: 'Screening',
        interview: 'Interview',
        lulus: 'Lulus',
        gagal: 'Gagal',
      }
      return `<span class="badge text-bg-${map[st] || 'secondary'}">${label[st] || st}</span>`
    }
    function pushAct(t) {
      if (!act) return
      const li = document.createElement('li')
      li.innerHTML = `${t}<div class="activity-meta">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>`
      act.prepend(li)
      while (act.children.length > 10) act.removeChild(act.lastChild)
    }
    function render() {
      const q = (qEl?.value || '').toLowerCase()
      const st = stEl?.value || ''
      const ps = posEl?.value || ''
      const rows = data.filter(
        (r) =>
          (!q || [r.nama, r.posisi].some((v) => v.toLowerCase().includes(q))) &&
          (!st || r.status === st) &&
          (!ps || r.posisi === ps)
      )
      tbody.innerHTML = rows
        .map(
          (r) =>
            `<tr data-id="${r.id}"><td>${r.nama}</td><td>${r.posisi}</td><td>${r.tgl}</td><td>${badge(r.status)}</td><td>${r.kontak}</td><td><button class="btn btn-sm btn-outline-primary" data-act="detail"><i class="bi bi-eye"></i></button></td></tr>`
        )
        .join('')
      if (count) count.textContent = rows.length // stats
      const totals = { baru: 0, screening: 0, interview: 0, lulus: 0, gagal: 0 }
      data.forEach((d) => {
        if (totals[d.status] !== undefined) totals[d.status]++
      })
      const ttl = data.length || 1
      Object.keys(totals).forEach((k) => {
        stats[k].textContent = totals[k]
        bars[k].style.width = (totals[k] / ttl) * 100 + '%'
      })
    }
    ;['input', 'change'].forEach((ev) =>
      [qEl, stEl, posEl].forEach((el) => el && el.addEventListener(ev, render))
    )
    reset?.addEventListener('click', () => {
      ;[qEl, stEl, posEl].forEach((el) => el && (el.value = ''))
      render()
    })
    add?.addEventListener('click', () => {
      notifyToast('info', 'Form tambah lowongan belum diimplementasikan')
    })
    refresh?.addEventListener('click', () => {
      pushAct('Sinkronisasi status rekrutmen...')
      setTimeout(() => pushAct('Status diperbarui'), 600)
    })
    tbody.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-act="detail"]')
      if (!b) return
      const id = b.closest('tr').getAttribute('data-id')
      const row = data.find((r) => String(r.id) === id)
      if (row) notifyToast('info', 'Detail Pelamar: ' + row.nama)
    })
    render()
    pushAct('Inisialisasi halaman rekrutmen')
  })()

  // ================= Mutasi & Kenaikan Page =================
  ;(function initMutasi() {
    const tbody = document.getElementById('tbodyMutasi')
    if (!tbody) return
    const search = document.getElementById('muSearch')
    const jenis = document.getElementById('muJenis')
    const status = document.getElementById('muStatus')
    const reset = document.getElementById('muReset')
    const add = document.getElementById('muTambah')
    const act = document.getElementById('activityMutasi')
    const refresh = document.getElementById('muAktRefresh')
    const count = document.getElementById('countMutasi')
    const statAj = document.getElementById('statMuAjukan')
    const statAp = document.getElementById('statMuApprove')
    const statRe = document.getElementById('statMuReject')
    const barAj = document.getElementById('barMuAjukan')
    const barAp = document.getElementById('barMuApprove')
    const barRe = document.getElementById('barMuReject')
    let data = [
      {
        id: 1,
        nama: 'Dedi',
        jenis: 'mutasi',
        unitLama: 'Lab Komputer',
        unitBaru: 'Teknik',
        status: 'diajukan',
        efektif: '2025-11-01',
      },
      {
        id: 2,
        nama: 'Eka',
        jenis: 'kenaikan',
        unitLama: 'Keuangan',
        unitBaru: 'Keuangan',
        status: 'disetujui',
        efektif: '2025-10-10',
      },
      {
        id: 3,
        nama: 'Fajar',
        jenis: 'mutasi',
        unitLama: 'Perpustakaan',
        unitBaru: 'Logistik',
        status: 'ditolak',
        efektif: '2025-09-15',
      },
    ]
    function badge(st) {
      const map = { diajukan: 'warning', disetujui: 'success', ditolak: 'danger' }
      return `<span class="badge text-bg-${map[st] || 'secondary'}">${st.charAt(0).toUpperCase() + st.slice(1)}</span>`
    }
    function jenisBadge(j) {
      return `<span class="badge text-bg-${j === 'mutasi' ? 'info' : 'success'}">${j === 'mutasi' ? 'Mutasi' : 'Kenaikan'}</span>`
    }
    function pushAct(t) {
      if (!act) return
      const li = document.createElement('li')
      li.innerHTML = `${t}<div class="activity-meta">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>`
      act.prepend(li)
      while (act.children.length > 10) act.removeChild(act.lastChild)
    }
    function render() {
      const q = (search?.value || '').toLowerCase()
      const jv = jenis?.value || ''
      const sv = status?.value || ''
      const rows = data.filter(
        (r) =>
          (!q || [r.nama, r.unitLama, r.unitBaru].some((v) => v.toLowerCase().includes(q))) &&
          (!jv || r.jenis === jv) &&
          (!sv || r.status === sv)
      )
      tbody.innerHTML = rows
        .map(
          (r) =>
            `<tr data-id="${r.id}"><td>${r.nama}</td><td>${jenisBadge(r.jenis)}</td><td>${r.unitLama}</td><td>${r.unitBaru}</td><td>${badge(r.status)}</td><td>${r.efektif}</td><td><button class="btn btn-sm btn-outline-primary" data-act="detail"><i class="bi bi-eye"></i></button></td></tr>`
        )
        .join('')
      if (count) count.textContent = rows.length
      const totals = { diajukan: 0, disetujui: 0, ditolak: 0 }
      data.forEach((d) => {
        if (totals[d.status] !== undefined) totals[d.status]++
      })
      const ttl = data.length || 1
      statAj.textContent = totals.diajukan
      statAp.textContent = totals.disetujui
      statRe.textContent = totals.ditolak
      barAj.style.width = (totals.diajukan / ttl) * 100 + '%'
      barAp.style.width = (totals.disetujui / ttl) * 100 + '%'
      barRe.style.width = (totals.ditolak / ttl) * 100 + '%'
    }
    ;['input', 'change'].forEach((ev) =>
      [search, jenis, status].forEach((el) => el && el.addEventListener(ev, render))
    )
    reset?.addEventListener('click', () => {
      ;[search, jenis, status].forEach((el) => el && (el.value = ''))
      render()
    })
    add?.addEventListener('click', () => {
      notifyToast('info', 'Form ajukan mutasi/kenaikan belum diimplementasikan')
    })
    refresh?.addEventListener('click', () => {
      pushAct('Sinkronisasi status mutasi...')
      setTimeout(() => pushAct('Status mutasi diperbarui'), 650)
    })
    tbody.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-act="detail"]')
      if (!b) return
      const id = b.closest('tr').getAttribute('data-id')
      const row = data.find((r) => String(r.id) === id)
      if (row) notifyToast('info', 'Detail: ' + row.nama)
    })
    render()
    pushAct('Inisialisasi halaman mutasi')
  })()

  // ================= Data Pegawai Page (enhanced list) =================
  ;(function initDataPegawai() {
    const tbody = document.getElementById('pegawaiTableBody')
    if (!tbody) return
    const search = document.getElementById('pegawaiSearchInput')
    const unit = document.getElementById('pegFilterUnit')
    const jenis = document.getElementById('pegFilterJenis')
    const refresh = document.getElementById('btnRefreshPegawai')
    const count = document.getElementById('countPegawai')
    let data = [
      {
        nip: '19801212 200501 1 001',
        nama: 'Dr. Andi Saputra',
        jenis: 'Dosen',
        unit: 'Teknik',
        jabatan: 'Lektor',
        status: 'aktif',
      },
      {
        nip: '19850505 201001 2 002',
        nama: 'Siti Aminah',
        jenis: 'Tendik',
        unit: 'Keuangan',
        jabatan: 'Staf Keuangan',
        status: 'aktif',
      },
      {
        nip: '19791201 200003 1 003',
        nama: 'Budi Santoso',
        jenis: 'Tendik',
        unit: 'Akademik',
        jabatan: 'Staf Administrasi',
        status: 'cuti',
      },
      {
        nip: '19900203 201801 1 004',
        nama: 'Hendra',
        jenis: 'Tendik',
        unit: 'Keuangan',
        jabatan: 'Staf Keuangan',
        status: 'aktif',
      },
      {
        nip: '1987001',
        nama: 'Adi Santoso',
        jenis: 'Tendik',
        unit: 'IT',
        jabatan: 'Staf IT',
        status: 'aktif',
      },
    ]
    function statusBadge(st) {
      const map = { aktif: 'success', cuti: 'warning', nonaktif: 'secondary' }
      return `<span class="badge text-bg-${map[st] || 'secondary'}">${st.charAt(0).toUpperCase() + st.slice(1)}</span>`
    }
    function render() {
      const q = (search?.value || '').toLowerCase()
      const u = unit?.value || ''
      const j = jenis?.value || ''
      const rows = data.filter(
        (r) =>
          (!q || [r.nama, r.nip].some((v) => v.toLowerCase().includes(q))) &&
          (!u || r.unit === u) &&
          (!j || r.jenis === j)
      )
      tbody.innerHTML = rows
        .map(
          (r) =>
            `<tr data-nip="${r.nip}"><td>${r.nama}</td><td>${r.nip}</td><td>${r.jenis}</td><td>${r.unit}</td><td>${r.jabatan}</td><td>${statusBadge(r.status)}</td><td><button class="btn btn-sm btn-outline-primary profile-link" data-nip="${r.nip}"><i class="bi bi-person-vcard"></i></button></td></tr>`
        )
        .join('')
      if (count) count.textContent = rows.length
    }
    ;['input', 'change'].forEach((ev) =>
      [search, unit, jenis].forEach((el) => el && el.addEventListener(ev, render))
    )
    refresh?.addEventListener('click', () => {
      notifyToast('info', 'Data pegawai disegarkan')
      render()
    })
    // profile link reuse existing global handler (shows modal)
    render()
  })()

  // ================= Logbook Page =================
  ;(function initLogbook() {
    const tbody = document.getElementById('tbodyLogbook')
    if (!tbody) return
    const search = document.getElementById('logSearch')
    const kat = document.getElementById('logKategori')
    const tgl = document.getElementById('logTanggal')
    const reset = document.getElementById('btnLogReset')
    const add = document.getElementById('btnLogTambah')
    const act = document.getElementById('activityLog')
    const refresh = document.getElementById('btnLogAktRefresh')
    const count = document.getElementById('countLog')
    const modalEl = document.getElementById('modalLogTambah')
    const form = document.getElementById('formLogTambah')
    let modalInst = null
    if (modalEl && window.bootstrap) modalInst = bootstrap.Modal.getOrCreateInstance(modalEl)
    const statS = document.getElementById('statLogSistem')
    const statP = document.getElementById('statLogPegawai')
    const statK = document.getElementById('statLogKeamanan')
    const barS = document.getElementById('barLogSistem')
    const barP = document.getElementById('barLogPegawai')
    const barK = document.getElementById('barLogKeamanan')
    let data = [
      {
        id: 1,
        waktu: new Date().toISOString(),
        kategori: 'sistem',
        pesan: 'Inisialisasi aplikasi',
        user: 'system',
      },
      {
        id: 2,
        waktu: new Date(Date.now() - 3600e3).toISOString(),
        kategori: 'pegawai',
        pesan: 'Update data pegawai',
        user: 'admin',
      },
      {
        id: 3,
        waktu: new Date(Date.now() - 7200e3).toISOString(),
        kategori: 'keamanan',
        pesan: 'Login gagal 2x',
        user: 'auth-service',
      },
    ]
    function fmt(ts) {
      const d = new Date(ts)
      return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    }
    function badge(k) {
      const map = { sistem: 'primary', pegawai: 'success', keamanan: 'danger' }
      return `<span class="badge text-bg-${map[k] || 'secondary'}">${k}</span>`
    }
    function pushAct(t) {
      if (!act) return
      const li = document.createElement('li')
      li.innerHTML = `${t}<div class="activity-meta">${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>`
      act.prepend(li)
      while (act.children.length > 10) act.removeChild(act.lastChild)
    }
    function render() {
      const q = (search?.value || '').toLowerCase()
      const k = kat?.value || ''
      const day = tgl?.value || ''
      const rows = data.filter(
        (r) =>
          (!q || r.pesan.toLowerCase().includes(q)) &&
          (!k || r.kategori === k) &&
          (!day || r.waktu.startsWith(day))
      )
      tbody.innerHTML = rows
        .sort((a, b) => b.waktu.localeCompare(a.waktu))
        .map(
          (r) =>
            `<tr><td>${fmt(r.waktu)}</td><td>${badge(r.kategori)}</td><td>${r.pesan}</td><td>${r.user}</td><td><button class="btn btn-sm btn-outline-primary" data-act="detail"><i class="bi bi-eye"></i></button></td></tr>`
        )
        .join('')
      if (count) count.textContent = rows.length
      const totals = { sistem: 0, pegawai: 0, keamanan: 0 }
      data.forEach((d) => {
        if (totals[d.kategori] !== undefined) totals[d.kategori]++
      })
      const ttl = data.length || 1
      statS.textContent = totals.sistem
      statP.textContent = totals.pegawai
      statK.textContent = totals.keamanan
      barS.style.width = (totals.sistem / ttl) * 100 + '%'
      barP.style.width = (totals.pegawai / ttl) * 100 + '%'
      barK.style.width = (totals.keamanan / ttl) * 100 + '%'
    }
    ;['input', 'change'].forEach((ev) =>
      [search, kat, tgl].forEach((el) => el && el.addEventListener(ev, render))
    )
    reset?.addEventListener('click', () => {
      ;[search, kat, tgl].forEach((el) => el && (el.value = ''))
      render()
    })
    add?.addEventListener('click', () => {
      modalInst?.show()
    })
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const kategori = document.getElementById('logNewKategori').value
      const pesan = document.getElementById('logNewPesan').value.trim()
      const user = document.getElementById('logNewUser').value.trim()
      if (!pesan) return
      data.push({ id: Date.now(), waktu: new Date().toISOString(), kategori, pesan, user })
      modalInst?.hide()
      form.reset()
      render()
      notifyToast('success', 'Log ditambahkan')
      pushAct('Log baru dibuat')
    })
    refresh?.addEventListener('click', () => {
      pushAct('Sinkronisasi log...')
      setTimeout(() => pushAct('Log up-to-date'), 500)
    })
    render()
    pushAct('Inisialisasi halaman logbook')
  })()
})

// ===== Additional Enhancements (Light Blue Theme, Calendar, Global Alert) =====
;(function () {
  const body = document.body
  if (!body.classList.contains('theme-light-blue')) body.classList.add('theme-light-blue')

  // Simple reusable alert modal (creates once)
  function ensureAlertModal() {
    if (document.getElementById('globalAlertModal')) return
    const div = document.createElement('div')
    div.innerHTML = `<div class="modal fade" id="globalAlertModal" tabindex="-1" aria-hidden="true">
			<div class="modal-dialog modal-sm modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header py-2"><h6 class="modal-title fw-semibold small mb-0" id="globalAlertTitle">Informasi</h6>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Tutup"></button></div>
					<div class="modal-body py-3">
						<div id="globalAlertIcon" class="mb-2 text-primary"><i class="bi bi-info-circle"></i></div>
						<div id="globalAlertMessage" class="small"></div>
					</div>
					<div class="modal-footer py-2"><button class="btn btn-primary btn-sm" data-bs-dismiss="modal">OK</button></div>
				</div>
			</div>
		</div>`
    document.body.appendChild(div.firstElementChild)
  }
  ensureAlertModal()
  window.showGlobalAlert = function (
    msg,
    title = 'Berhasil',
    icon = 'check-circle-fill',
    variant = 'success'
  ) {
    ensureAlertModal()
    try {
      document.getElementById('globalAlertTitle').textContent = title
      const iconEl = document.getElementById('globalAlertIcon')
      iconEl.className = 'mb-2 text-' + variant
      iconEl.innerHTML = `<i class="bi bi-${icon}"></i>`
      document.getElementById('globalAlertMessage').textContent = msg
      const modalInst = bootstrap.Modal.getOrCreateInstance(
        document.getElementById('globalAlertModal')
      )
      modalInst.show()
    } catch (e) {
      alert(msg)
    }
  }

  // Hook profile save events (profil-dosen page) using MutationObserver
  if (window.location.pathname.endsWith('profil-dosen.html')) {
    const saveBtn = document.getElementById('btnToggleEdit')
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (saveBtn.classList.contains('btn-primary')) {
          // just finished save (button reverted to edit state)
          setTimeout(() => showGlobalAlert('Perubahan profil berhasil disimpan'), 200)
        }
      })
    }
  }

  // Build mini calendar on dashboard if placeholder exists
  ;(function buildMiniCalendar() {
    const calWrap = document.getElementById('miniCalendar')
    if (!calWrap) return
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth()
    const first = new Date(year, month, 1)
    const last = new Date(year, month + 1, 0)
    const startDay = first.getDay()
    const days = []
    for (let i = 0; i < startDay; i++) days.push(null)
    for (let d = 1; d <= last.getDate(); d++) days.push(d)
    while (days.length % 7 !== 0) days.push(null)
    function cell(day) {
      if (day === null) return '<td class="empty"></td>'
      const cls = day === now.getDate() ? 'today' : 'day'
      return `<td class="${cls}">${day}</td>`
    }
    let html =
      '<table class="calendar-mini table table-bordered table-sm mb-0"><thead><tr><th>Min</th><th>Sen</th><th>Sel</th><th>Rab</th><th>Kam</th><th>Jum</th><th>Sab</th></tr></thead><tbody>'
    for (let w = 0; w < days.length / 7; w++) {
      const slice = days.slice(w * 7, w * 7 + 7)
      html += '<tr>' + slice.map(cell).join('') + '</tr>'
    }
    html += '</tbody></table>'
    calWrap.innerHTML = html
  })()

  // Enhance Cuti section in index (single-page version) if exists
  ;(function enhanceCuti() {
    const cutiSection = document.getElementById('page-cuti')
    if (!cutiSection) return
    // add history panel if not yet
    if (!document.getElementById('cutiHistory')) {
      const card = document.createElement('div')
      card.className = 'card mt-3'
      card.innerHTML = `<div class="card-header bg-body-tertiary d-flex align-items-center"><span class="fw-semibold small">Riwayat Pengajuan</span><span class="badge rounded-pill text-bg-primary ms-2" id="cutiHistCount">0</span></div>
			<div class="card-body">
				<div class="row g-3">
					<div class="col-md-6">
						<div class="small fw-semibold mb-1">Pengajuan Cuti / Izin Terbaru</div>
						<ul id="cutiHistory" class="history-list mb-0"></ul>
					</div>
					<div class="col-md-6">
						<div class="small fw-semibold mb-1">Pengajuan Sakit & Izin (Scrollable)</div>
						<div class="scroll-table border rounded p-2" id="cutiIzinScroll"><table class="table table-bordered table-sm mb-0">
							<thead class="table-light"><tr><th>Nama</th><th>Tipe</th><th>Tgl Mulai</th><th>Durasi</th><th>Status</th></tr></thead>
							<tbody id="cutiIzinTbody"></tbody>
						</table></div>
					</div>
				</div>
			</div>`
      cutiSection.appendChild(card)
    }
    // dataset simulation
    const base = [
      {
        nama: 'Rina Marlina',
        tipe: 'Tahunan',
        mulai: '2025-10-01',
        selesai: '2025-10-07',
        status: 'Disetujui',
      },
      {
        nama: 'Yusuf',
        tipe: 'Sakit',
        mulai: '2025-10-05',
        selesai: '2025-10-10',
        status: 'Menunggu',
      },
      {
        nama: 'Adi Santoso',
        tipe: 'Izin',
        mulai: '2025-10-09',
        selesai: '2025-10-09',
        status: 'Disetujui',
      },
      {
        nama: 'Hendra',
        tipe: 'Sakit',
        mulai: '2025-10-03',
        selesai: '2025-10-06',
        status: 'Disetujui',
      },
      {
        nama: 'Dedi',
        tipe: 'Izin',
        mulai: '2025-10-11',
        selesai: '2025-10-11',
        status: 'Menunggu',
      },
    ]
    const histEl = document.getElementById('cutiHistory')
    const izinTbody = document.getElementById('cutiIzinTbody')
    const histCount = document.getElementById('cutiHistCount')
    if (!histEl || !izinTbody) return
    function dur(a, b) {
      const da = new Date(a)
      const db = new Date(b)
      return (db - da) / 86400000 + 1
    }
    function render() {
      histEl.innerHTML = base
        .slice()
        .sort((a, b) => b.mulai.localeCompare(a.mulai))
        .slice(0, 8)
        .map(
          (r) =>
            `<li><time>${r.mulai}</time><span class="flex-grow-1">${r.nama}</span><span class="badge text-bg-${r.status === 'Disetujui' ? 'success' : r.status === 'Menunggu' ? 'warning' : 'secondary'}">${r.status}</span></li>`
        )
        .join('')
      izinTbody.innerHTML = base
        .filter((r) => ['Sakit', 'Izin'].includes(r.tipe))
        .map(
          (r) =>
            `<tr><td>${r.nama}</td><td>${r.tipe}</td><td>${r.mulai}</td><td>${dur(r.mulai, r.selesai)} hr</td><td><span class="badge text-bg-${r.status === 'Disetujui' ? 'success' : r.status === 'Menunggu' ? 'warning' : 'secondary'}">${r.status}</span></td></tr>`
        )
        .join('')
      histCount.textContent = base.length
    }
    render()
    const form = document.getElementById('formCuti')
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault()
        const inp = form.querySelector('input')
        const mulai = form.querySelector('input[type=date]')
        const selesai = form.querySelectorAll('input[type=date]')[1]
        const nama = (inp?.value || 'Baru').trim() || 'Baru'
        const m = mulai?.value || new Date().toISOString().slice(0, 10)
        const s = selesai?.value || m
        base.push({ nama, tipe: 'Izin', mulai: m, selesai: s, status: 'Menunggu' })
        render()
        showGlobalAlert('Pengajuan cuti/izin baru ditambahkan', 'Tersimpan')
        form.reset()
      })
    }
  })()

  // Sidebar profile missing fields badge (count empty fields in profil-dosen)
  ;(function profileMissing() {
    const profileLink = document.querySelector('a.nav-link span:contains("Profil")') // not widely supported; fallback below
    // We'll just compute and inject into sidebar manually if on profile page after render
    if (!window.location.pathname.endsWith('profil-dosen.html')) return
    try {
      const raw = localStorage.getItem('profilDosen_v1')
      const data = raw ? JSON.parse(raw) : null
      if (!data) return
      const keys = ['nip', 'phone', 'email', 'allowances']
      let miss = 0
      keys.forEach((k) => {
        if (!data[k]) miss++
      })
      const anchor = document.querySelector('#sidebar a.nav-link.active span')
      if (anchor && miss > 0) {
        if (!anchor.parentElement.querySelector('.profile-missing-badge')) {
          const b = document.createElement('span')
          b.className = 'profile-missing-badge ms-2'
          b.textContent = miss
          anchor.after(b)
        }
      }
    } catch (e) {}
  })()
})()
