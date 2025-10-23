import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import ConfirmPopup from 'primevue/confirmpopup';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast';
import Button from 'primevue/button';

import SubmitButtonLogout from '../components/button/logout/SubmitButtonLogout.vue'

// PrimeVue CSS
import 'primeicons/primeicons.css'

const vueGlobal = {
    theme: { preset: Aura },
}

const app = createApp(SubmitButtonLogout)

app.use(PrimeVue, vueGlobal)

app.component("ConfirmPopup", ConfirmPopup)
app.component("ToastService", ToastService)
app.component("ConfirmationService", ConfirmationService)

app.mount('#vue-logout')
