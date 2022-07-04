<script setup lang="ts">
import type { BukuBookData } from "@/types/BukuBookData"
import { defineProps } from "vue"
import type { PropType } from "vue"
import BookmarkIcon from "../icons/Bookmark/BookmarkIcon.vue"
import { useBookStore } from "@/stores/book"
import BookmarkedIcon from "../icons/Bookmark/BookmarkedIcon.vue"

const bookStore = useBookStore()

const props = defineProps({
    book: {
        type: Object as PropType<BukuBookData>,
        required: true
    }
})

const toggleBookmark = () => {
    bookStore.toggleBookmark(props.book)
}
</script>

<template>
    <div class="relative bg-light-700 py-4 px-4 lg:(px-6 py-4) flex flex-col gap-2 lg:(gap-3) items-center rounded-md">
        <button @click="toggleBookmark"
            class="group cursor-pointer absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/2 p-2 bg-gray-300 hover:(bg-yellow-300) rounded-full">
            <BookmarkedIcon v-if="book.bookmarked" />
            <BookmarkIcon v-else />
        </button>
        <div>
            <img class="h-32 lg:(h-48) rounded" :src="book.image" :alt="`${book.name}_image`">
        </div>

        <div class="w-full text-center flex flex-col">
            <span class="inline-block w-full truncate ">
                {{ book.name }}
            </span>
            <span class="inline-block w-full truncate text-sm text-gray-700">{{ book.authors.join(", ") }}</span>
        </div>

        <div class="mt-1">
            <a :href="book.url"
                class="cursor-pointer bg-green-700 hover:(bg-green-800) px-4 py-2 lg:(px-6) rounded text-white font-bold">
                Read
            </a>
        </div>
    </div>
</template>
