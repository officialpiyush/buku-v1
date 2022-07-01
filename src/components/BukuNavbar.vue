<script setup lang="ts">
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
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11H7v2h4v4h2v-4h4v-2h-4V7h-2v4z" />
                    </svg>
                    <span>New Book</span>
                </router-link>
                <!-- <router-link to="https://github.com/officialpiyush">Github</router-link> -->
            </div>
        </div>
    </div>
</template>