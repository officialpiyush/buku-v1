<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

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

watch(inputText, () => {
    emit("textChange", inputText.value.trim())
})
</script>

<template>
    <div class="items-center grid grid-cols-12 text-center">
        <div class="col-span-3 lg:col-span-1 h-10 bg-gray-300 rounded-l-md px-2 py-2 lg:(px-4)">
            {{ label }}
        </div>

        <div class="col-span-9 lg:(col-span-3) outline-none">
            <input class="w-full h-10 rounded-r-md border-none bg-light-700" v-model="inputText" :type="type">
        </div>
    </div>
</template>
