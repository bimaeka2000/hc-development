import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
// PrimeIcons (ikon)
import 'primeicons/primeicons.css'
import DatePicker from 'primevue/datepicker';

import DatePickerProfilCard from '../components/datepicker/DatePickerProfilCard.vue'
// Daftarkan komponen global PrimeVue
const vueGlobal = {
    theme: { preset: Aura },
}

const app = createApp(DatePickerProfilCard)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false
        }
    }
})

app.component("DatePicker", DatePicker);

app.mount('#date-picker')