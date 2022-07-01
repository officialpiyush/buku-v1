<script setup lang="ts">
import BukuNavbar from './components/BukuNavbar.vue';
import { userStore } from './stores/user';
import LoaderView from './views/LoaderView.vue';
import LoginView from './views/LoginView.vue';

const user = userStore()
user.fetchUser()
</script>

<template>
  <div class="">
    <nav>
      <BukuNavbar />
    </nav>

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
</template>

<style>
</style>
