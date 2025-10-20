<template>
  <Button
    label="Simpan"
    icon="pi pi-save"
    severity="info"     
    style="color: white;" 
    :loading="loading"
    @click="handleSubmit"
  />
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'

const loading = ref(false)

function handleSubmit() {
  loading.value = true
  // Submit form manual (cari form terdekat)
  const form = document.querySelector('form')
  if (form) form.submit()
}
</script>
