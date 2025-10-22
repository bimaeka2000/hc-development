<template>
  <div class="mb-3">
    <Message v-if="message" severity="success" class="w-100">
      {{ message }}
    </Message>
  </div>
</template>

<script setup>
import Message from 'primevue/message'
const props = defineProps({
  message: String,
})
</script>
