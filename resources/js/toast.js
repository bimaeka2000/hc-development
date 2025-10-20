import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'

// theme + icons
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import ProfilPage from './pages/profil_page.vue'

// ambil props dari data attribute di Edge
const el = document.getElementById('app')
const props = JSON.parse(el.dataset.props || '{}')

const app = createApp(ProfilPage, props)
app.use(PrimeVue)
app.component('Button', Button)

app.mount('#app')
