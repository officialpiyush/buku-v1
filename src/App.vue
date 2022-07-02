<script setup lang="ts">
import BukuNavbar from './components/BukuNavbar.vue';
import { userStore } from './stores/user';
import LoaderView from './views/LoaderView.vue';
import LoginView from './views/LoginView.vue';

const user = userStore()
user.fetchUser()
</script>

<template>
  <div class="font-inter min-h-screen bg-gray-50">
    <nav>
      <BukuNavbar />
    </nav>

    <div class="max-w-6xl mx-auto px-4 py-4 lg:(py-6)">
      <div v-if="user.loading">
        <LoaderView />
      </div>
      <div v-else-if="user.user">
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
