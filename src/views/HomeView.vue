<script setup lang="ts">
import { useBookStore } from "@/stores/book";
import { watch } from "vue-demi";
import BukuBookContainer from "../components/BukuHome/BukuBookContainer.vue";

const bookStore = useBookStore()
bookStore.getAllBooks()

watch(bookStore.books, () => {
  console.log(bookStore)
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-4">
    <div class="space-y-4">
      <BukuBookContainer name="Bookmarked" :books="bookStore.books.filter(book => book.bookmarked)" />
      <BukuBookContainer name="Books" :books="bookStore.books" />
    </div>
  </div>
</template>
