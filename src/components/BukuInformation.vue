<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
    name: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: true
    }
})
</script>


<template>
    <div class="flex gap-1">
        <span v-if="name" class="font-bold">{{ name }}:</span>
        <span :class="{ 'font-bold': !name, 'px-1': name }">{{ value }}</span>
    </div>
</template>