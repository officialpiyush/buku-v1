<script setup lang="ts">
import { useBookStore } from "@/stores/book";
import BukuBookContainer from "../components/BukuHome/BukuBookContainer.vue";

const bookStore = useBookStore()
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-4">
    <div class="space-y-6">
      <BukuBookContainer name="Bookmarked" :books="bookStore.books.filter(book => book.bookmarked)" />
      <BukuBookContainer name="Books" :books="bookStore.books" />
    </div>
  </div>
</template>
