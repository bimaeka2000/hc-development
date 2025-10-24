// Client module to mount PrimeVue Breadcrumb
// This file expects to be served as ESM by Vite. It imports Vue and PrimeVue and mounts
// the Breadcrumb component inside the container with id "pv-breadcrumb".

import { createApp, h } from 'vue';
import PrimeVue from 'primevue/config';
import Breadcrumb from 'primevue/breadcrumb';
// Import CSS for PrimeVue theme and icons. Vite will include these when building.
import 'primeicons/primeicons.css';

const container = document.getElementById('pv-breadcrumb');
if (!container) {
  console.warn('pv-breadcrumb: container not found');
} else {
  // Read breadcrumb data from window.__PV_BREADCRUMBS (set by the server-side template)
  let items = Array.isArray(window.__PV_BREADCRUMBS) ? window.__PV_BREADCRUMBS : [];

  // If breadcrumbs are empty or only contain Dashboard, auto-generate from pathname
  function humanize(segment) {
    return segment.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  if (!items || items.length <= 1) {
    const path = (location.pathname || '/').replace(/\/$/, '').toLowerCase();

    // Special route mappings to match your collapsed menu structure
    const special = {
      '/sakit': [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Cuti', href: '/cuti' },
        { label: 'Sakit', href: '/sakit' }
      ],
      '/izin': [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Cuti', href: '/cuti' },
        { label: 'Izin', href: '/izin' }
      ],
      '/cuti': [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Cuti', href: '/cuti' }
      ]
    };

    // If the path matches or startsWith any special route, use that mapping
    let matched = null;
    Object.keys(special).forEach(key => {
      if (path === key || path.startsWith(key + '/')) matched = key;
    });

    if (matched) {
      items = special[matched];
    } else {
      const segs = path.split('/').filter(Boolean);
      const generated = [];
      // Always include Dashboard first
      generated.push({ label: 'Dashboard', href: '/dashboard' });
      let acc = '';
      segs.forEach(s => {
        if (s.toLowerCase() === 'dashboard') return; // skip duplicate
        acc += '/' + s;
        generated.push({ label: humanize(s), href: acc });
      });
      // replace items only if we actually have more than just Dashboard or items was empty
      if (generated.length > 1 || !items || items.length === 0) {
        items = generated;
      }
    }
  }

  const app = createApp({
    render() {
      // Build model from items — only labels and urls
      const model = items.map(i => ({ label: i.label, url: i.href || null }));
      // Do not provide a "home" prop so the home icon is not rendered.
      return h('div', null, [ h(Breadcrumb, { model }) ]);
    }
  });

  app.use(PrimeVue);
  app.mount(container);

  // After mount, insert icons beside breadcrumb labels based on a label->icon map.
  setTimeout(() => {
    try {
      const iconMap = {
        'dashboard': 'bi bi-speedometer2',
        'users': 'bi bi-people',
        'user': 'bi bi-people',
        'pegawai': 'bi bi-person-vcard',
        'penelitian': 'bi bi-journal-bookmark',
        'pengabdian': 'bi bi-hand-thumbs-up',
        'cuti': 'bi bi-calendar-check',
        'sakit': 'bi bi-emoji-dizzy',
        'izin': 'bi bi-calendar-event',
        'sistem': 'bi bi-gear',
        'akses': 'bi bi-shield-lock',
        'keluar': 'bi bi-box-arrow-right'
      };

      // Select all breadcrumb list items rendered by PrimeVue
      const itemsLi = container.querySelectorAll('li');
      itemsLi.forEach(li => {
        const anchor = li.querySelector('a, span');
        if (!anchor) return;
        // avoid inserting duplicate icons
        if (anchor.querySelector('i.bi')) return;

        const text = (anchor.textContent || '').trim().toLowerCase();
        let foundIcon = null;
        // exact match first
        Object.keys(iconMap).some(key => {
          if (text === key) {
            foundIcon = iconMap[key];
            return true;
          }
          return false;
        });
        // fallback to contains
        if (!foundIcon) {
          Object.keys(iconMap).some(key => {
            if (text.indexOf(key) !== -1) {
              foundIcon = iconMap[key];
              return true;
            }
            return false;
          });
        }

        if (foundIcon) {
          const icon = document.createElement('i');
          // add a helper class for styling; do NOT force primary color here
          icon.className = foundIcon + ' me-2 breadcrumb-icon';
          anchor.insertBefore(icon, anchor.firstChild);
        }
      });
    } catch (err) {
      console.error('pv-breadcrumb: post-mount icon insertion failed', err);
    }
  }, 50);
}
