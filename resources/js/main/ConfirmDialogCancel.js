import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
// PrimeIcons (ikon)
import 'primeicons/primeicons.css';
// --- 3. IMPORT KOMPONEN VISUAL
import ConfirmDialog from 'primevue/confirmdialog'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import ConfirmationService from 'primevue/confirmationservice' // ⭐ TAMBAHKAN INI
import ToastService from 'primevue/toastservice'               // ⭐ TAMBAHKAN INI

import ConfirmDialogCancel from '../components/confirmdialog/SubmitButton.vue'
// Daftarkan komponen global PrimeVue

// 1. Definisikan Rute Anda
const routes = [
    // ... definisikan semua rute Anda di sini
    {
        path: '/dashboard/profil/:id?',
        name: 'profil-user' // <--- TAMBAHKAN NAMA RUTE (string) DI SINI },
    }
];
// 2. Buat Instance Router
const router = createRouter({
    history: createWebHistory(),
    routes,
});
const app = createApp(ConfirmDialogCancel)

app.component("ConfirmDialog", ConfirmDialog);
app.component("Dialog", Dialog)
app.component("Button", Button)
app.component("Toast", Toast)

app.use(ConfirmationService) // ⭐ LAYANAN UNTUK useConfirm()
app.use(ToastService)       // ⭐ LAYANAN UNTUK useToast()

app.use(router) // 👈 TAMBAHKAN INI

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        // Tambahkan options untuk memaksa light mode (putih)
        options: {
            darkModeSelector: false
        }
    },
    // Jika Anda menggunakan layanan, daftarkan di sini (misalnya ToastService)
    // Misalnya: app.use(ToastService)
})


app.mount('#confirm-dialog-cancel')