
<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="card flex flex-wrap gap-2 justify-center">
        <Button @click="confirm1()" label="Batal" variant="outlined" severity="secondary"></Button>
        <!-- <Button @click="confirm2()" label="Delete" severity="danger" variant="outlined"></Button> -->
    </div>
</template>

<script setup>

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter, useRoute } from 'vue-router' // 👈 TAMBAHKAN useRouteconst router = useRouter()

const route = useRoute(); // 👈 Dapatkan instance rute saat ini
const router = useRouter()
const confirm = useConfirm();
const toast = useToast();

const confirm1 = () => {
    const userId = route.params.id; // 👈 AMBIL ID DARI URL
    confirm.require({
        message: 'Apakah kamu yakin ingin batal update data profil ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Tidak',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            severity: 'danger',
            label: 'Iya'
        },
        accept: () => {
         router.go(-1);
        },
        reject:() => {
            toast.add({ 
                 severity: 'info', 
                 summary: 'Update Dilanjutkan', 
                 detail: 'Silahkan selesaikan pengisian formulir Anda.', 
                 life: 3000 // Notifikasi akan hilang setelah 3 detik
             });
        }
    });
};
</script>
