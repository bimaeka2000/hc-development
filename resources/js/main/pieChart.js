import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
// PrimeIcons (ikon)
import 'primeicons/primeicons.css'

import Chart from 'primevue/chart';

import PieChart from '../components/chart/PieChart.vue'
// Daftarkan komponen global PrimeVue

const vueGlobal = {
    theme: { preset: Aura },
}

const app = createApp(PieChart)

app.use(PrimeVue, vueGlobal)

app.component("Chart", Chart);

app.mount('#pie-chart')