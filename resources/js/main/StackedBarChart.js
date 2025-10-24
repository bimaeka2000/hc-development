import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
// PrimeIcons (ikon)
import 'primeicons/primeicons.css'

import Chart from 'primevue/chart';


import StackedBarChart from '../components/chart/StackedBarChart.vue'
// Daftarkan komponen global PrimeVue

const vueGlobal = {
    theme: { preset: Aura },
}

const app = createApp(StackedBarChart)

app.use(PrimeVue, vueGlobal)

app.component("Chart", Chart);

app.mount('#stacked-chart')