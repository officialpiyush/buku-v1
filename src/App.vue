useUserStore<script setup lang="ts">
import BukuNavbar from './components/BukuNavbar.vue';
import { useBookStore } from './stores/book';
import { useUserStore } from './stores/user';
import LoaderView from './views/LoaderView.vue';
import LoginView from './views/LoginView.vue';

const userStore = useUserStore()
const bookStore = useBookStore()

userStore.fetchUser()
bookStore.getAllBooks()
</script>

<template>
  <div class="font-inter min-h-screen bg-gray-50">
    <nav>
      <BukuNavbar />
    </nav>

    <div class="max-w-6xl mx-auto px-4 py-4 lg:(py-6)">
      <div v-if="userStore.loading">
        <LoaderView />
      </div>
      <div v-else-if="userStore.user">
        <RouterView />
      </div>
      <div v-else>
        <LoginView />
      </div>
    </div>
  </div>
</template>

<style>
</style>
