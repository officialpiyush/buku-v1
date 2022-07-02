<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'

const emit = defineEmits<{
    (e: "textChange", value: string): void
}>()

defineProps({
    label: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "text"
    }
})

const inputText = ref("")

watch(inputText, (oldText: string, newText: string) => {
    if (oldText !== newText) {
        emit("textChange", newText)
    }
})
</script>

<template>
    <div class="flex items-center w-full">
        <div class="h-10 bg-gray-300 rounded-l-md px-2 py-2 lg:(px-4)">
            {{ label }}
        </div>

        <div class="w-full outline-none">
            <input class="h-10 rounded-r-md border-none bg-light-700" v-model="inputText" :type="type">
        </div>
    </div>
</template>
