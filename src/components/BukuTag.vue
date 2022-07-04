<script setup lang="ts">
defineProps({
    name: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="text-xs lg:text-sm bg-green-700/30 px-2 py-1 rounded text-green-700">
        {{ name }}
    </div>
</template>