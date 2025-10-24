
<template>
    <div class="card flex justify-center" style="width: 0; border:none;;">
        <DatePicker name="tanggal_lahir" v-model="dates" selectionMode="range" :manualInput="false" style="height: 32px;" />
    </div>
</template>

<script setup>
import { ref } from "vue";

const dates = ref();
</script>
