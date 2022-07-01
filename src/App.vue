<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { userState } from './stores/user';

const userStore = userState()
userStore.fetchUser()


const { loading, user } = storeToRefs(userStore)
</script>

<template>
  <div class="">
    <nav>
      <BukuNavbar />
    </nav>


    <div :v-if="loading">
      <LoaderView />
    </div>
    <div :v-else-if="!!user">
      <RouterView />
    </div>
    <div :v-else="true">
      <LoginView />
    </div>
  </div>
</template>

<style>
</style>
