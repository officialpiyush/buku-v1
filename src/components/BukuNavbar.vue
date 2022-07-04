<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { MD5 } from "../utils/md5";
import GithubIcon from "./icons/GithubIcon.vue";
import PlusIcon from "./icons/PlusIcon.vue";
const userStore = useUserStore()

const generateGravatarImage = (): string => {
    const hash = MD5(userStore.user?.email)

    return `https://www.gravatar.com/avatar/${hash}`
}
</script>

<template>
    <div class="bg-gray-200 w-full">
        <div class="py-4 lg:(py-5) px-4 w-full max-w-6xl mx-auto flex items-center justify-between">
            <div id="navbar_start">
                <img class="h-7" src="/logo.svg" alt="buku_navbar">
            </div>

            <div class="flex items-center gap-4" id="navbar_end">
                <a class="flex gap-1 px-4 py-2 bg-gray-50 rounded" target="_blank" href="https://github.com/officialpiyush/buku/issues/new">
                    <GithubIcon />
                    <span class="hidden md:inline-block">
                        Report an issue
                    </span>
                </a>

                <router-link v-if="userStore.user" to="/new"
                    class="flex items-center gap-1 rounded-md px-4 py-1 lg:(py-2) cursor-pointer hover:(bg-green-600 text-light-100) bg-green-500 text-green-100">
                    <PlusIcon />
                    <span>New Book</span>
                </router-link>

                <button @click="userStore.signOut" v-if="userStore.user">
                    <img class="h-10 w-10 ring-2 ring-green-600 hover:( ring-offset-transparent ring-offset-1) rounded-full"
                        @error="({ currentTarget }: any) => { currentTarget!!.onerror = null; currentTarget!!.src = generateGravatarImage() }"
                        :src="userStore.user.photoURL!!">
                </button>
            </div>
        </div>
    </div>
</template>