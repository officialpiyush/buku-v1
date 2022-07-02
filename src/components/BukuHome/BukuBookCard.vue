<script setup lang="ts">
import type { BukuBookData } from "@/types/BukuBookData"
import { defineProps } from "vue"
import type { PropType } from "vue"

defineProps({
    book: {
        type: Object as PropType<BukuBookData>,
        required: true
    }
})
</script>

<template>
    <div class="bg-light-700 p-2 lg:(px-6 py-4) flex flex-col gap-2 lg:(gap-3) items-center rounded-md">
        <div>
            <img class="h-32 lg:(h-48) rounded" :src="book.image" :alt="`${book.name}_image`">
        </div>

        <div class="w-full text-center flex flex-col">
            <span class="inline-block w-full truncate ">
                {{ book.name }}
            </span>
            <span class="inline-block w-full truncate text-sm text-gray-700">{{ book.authors.join(", ") }}</span>
        </div>

        <div>
            <a :href="book.url"
                class="cursor-pointer bg-green-700 hover:(bg-green-800) px-4 py-2 lg:(px-6) rounded text-white font-bold">
                Read
            </a>
        </div>
    </div>
</template>
