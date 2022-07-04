<script setup lang="ts">
import type { BookData } from '@/types/BookData';
import type { PropType } from "vue";
import { defineProps } from 'vue';
import BukuInformation from "./BukuInformation.vue";

interface BookCardProps extends BookData {
    url?: string
}

defineProps({
    book: {
        type: Object as PropType<BookCardProps>,
        required: true
    }
})
</script>

<template>
    <div class="bg-light-800 px-2 py-2 lg:(p-6) rounded-md flex gap-2">
        <div :id="`${book.name}_image`">
            <img class="h-xs" :src="book.image" :alt="book.name">
        </div>

        <div class="w-full py-4 px-2 flex flex-col gap-2">
            <BukuInformation :value="book.name" />
            <BukuInformation name="Description" :value="book.snippet" />
            <BukuInformation name="Author(s)" :value="book.authors.join(', ')" />
        </div>
    </div>
</template>