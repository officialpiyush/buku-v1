<script setup lang="ts">
import type { BukuBookData } from "@/types/BukuBookData";
import type { PropType } from "vue";
import { defineProps } from "vue";
import BukuBookCard from "./BukuBookCard.vue";

defineProps({
    name: {
        type: String,
        required: true
    },
    books: {
        type: Object as PropType<BukuBookData[]>,
        required: true
    }
})
</script>

<template>
    <div class="flex flex-col gap-2 lg:(gap-4)" v-if="books.length > 0">
        <span class="font-bold text-lg lg:(text-xl)">{{ name }}</span>
        <div class="grid grid-cols-2 gap-2 lg:(grid-cols-5 gap-4)">
            <BukuBookCard v-for="book in books" :book="book" :key="book.id" />
        </div>
    </div>
</template>