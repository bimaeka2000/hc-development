import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
// PrimeIcons (ikon)
import 'primeicons/primeicons.css'

import Breadcrumb from 'primevue/breadcrumb';

import BreadcrumbHeader from '../components/breadcrumb/BreadcrumbHeader.vue'
// Daftarkan komponen global PrimeVue

const vueGlobal = {
    theme: { preset: Aura },
}

const app = createApp(BreadcrumbHeader)

app.use(PrimeVue, vueGlobal)

app.component("Breadcrumb", Breadcrumb);

app.mount('#breadcrumb-header')