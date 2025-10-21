// Sidebar logic migrated from script.js

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar elements
  const sidebar = document.getElementById('sidebar');
  const btnToggleSidebar = document.getElementById('btnToggleSidebar');
  const btnCloseSidebar = document.getElementById('btnCloseSidebar');

  // Persistence helpers (localStorage)
  const setPref = (k, v) => {
    try { localStorage.setItem(k, v); } catch (e) {}
  };
  const getPref = (k, def) => {
    try { return localStorage.getItem(k) ?? def; } catch (e) { return def; }
  };

  // Sidebar state
  function applySidebarState() {
    const collapsed = getPref('sidebarCollapsed', 'false') === 'true';
    if (collapsed) {
      sidebar.classList.add('collapsed');
    } else {
      sidebar.classList.remove('collapsed');
    }
  }

  function toggleSidebarMobile() {
    if (window.innerWidth < 992) {
      sidebar.classList.toggle('show');
    } else {
      sidebar.classList.toggle('collapsed');
      setPref('sidebarCollapsed', sidebar.classList.contains('collapsed'));
    }
  }

  if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', toggleSidebarMobile);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', toggleSidebarMobile);

  // Click outside to close (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 992 && sidebar.classList.contains('show')) {
      if (!sidebar.contains(e.target) && !e.target.closest('#btnToggleSidebar')) {
        sidebar.classList.remove('show');
      }
    }
  });

  // Auto highlight current page link in sidebar (by matching route)
  if (sidebar) {
    const links = sidebar.querySelectorAll('.nav-link');
    const currentUrl = window.location.pathname;
    links.forEach(link => {
      if (link.getAttribute('href') && currentUrl === link.getAttribute('href')) {
        link.classList.add('active');
      }
    });
  }

  // Initialize sidebar state
  if (sidebar) applySidebarState();
});
