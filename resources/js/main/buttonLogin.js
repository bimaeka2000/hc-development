import { createApp } from 'vue'

// PrimeVue core config
import PrimeVue from 'primevue/config'

// PrimeVue theme (gunakan tema baru dari PrimeUIX)
import Aura from '@primeuix/themes/aura'

// PrimeIcons (ikon)
import 'primeicons/primeicons.css'

import MessageAlertLogin from './components/button/login/MessageAlertLogin.vue'
import SubmitButtonLogin from './components/button/login/SubmitButtonLogin.vue'

// Aktifkan PrimeVue
const vueGlobal = {
    theme: { preset: Aura },
}

const app1 = createApp(MessageAlertLogin, {
    message: document.body.dataset.flashSuccess || '',
})
const app2 = createApp(SubmitButtonLogin)

app1.use(PrimeVue, vueGlobal)
app2.use(PrimeVue, vueGlobal)

app1.mount('#login-alert')
app2.mount('#login-button')
