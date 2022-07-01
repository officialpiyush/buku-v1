<script setup lang="ts">
import PlusIcon from "./icons/PlusIcon.vue"
</script>


<template>
    <div class="bg-gray-100 w-full">
        <div class="py-4 lg:(py-4) px-4 w-full max-w-6xl mx-auto flex items-center justify-between">
            <div id="navbar_start">
                <span class="font-bold">Buku</span>
            </div>

            <div class="flex items-center gap-4" id="navbar_end">
                <router-link disabled="false" to="/new"
                    class="flex items-center gap-1 rounded-md px-4 py-1 lg:(py-2) cursor-pointer hover:(bg-green-600 text-light-100) bg-green-500 text-green-100">
                    <PlusIcon />
                    <span>New Book</span>
                </router-link>
                <!-- <router-link to="https://github.com/officialpiyush">Github</router-link> -->
            </div>
        </div>
    </div>
</template>