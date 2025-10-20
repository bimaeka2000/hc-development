import { createApp } from 'vue'
// PrimeVue core config
import PrimeVue from 'primevue/config'

// PrimeVue theme (gunakan tema baru dari PrimeUIX)
import Aura from '@primeuix/themes/aura'

// PrimeIcons (ikon)
import 'primeicons/primeicons.css'

import MessageAlert from './components/button/Message.vue'
import SubmitButton from './components/button/SubmitButton.vue'

// Aktifkan PrimeVue
const vueGlobal = {
    theme: { preset: Aura },
}

const app1 = createApp(MessageAlert, {
    message: document.body.dataset.flashSuccess || '',
})
const app2 = createApp(SubmitButton)

app1.use(PrimeVue, vueGlobal)
app2.use(PrimeVue, vueGlobal)

app1.mount('#vue-alert')
app2.mount('#vue-button')