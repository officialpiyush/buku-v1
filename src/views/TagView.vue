<script setup lang="ts">
import LoaderIcon from '@/components/icons/LoaderIcon.vue';
import { useBookStore } from "@/stores/book";
import type { BukuBookData } from "@/types/BukuBookData";
import { nextTick, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from 'vue-router';
import BukuBookContainer from "../components/BukuHome/BukuBookContainer.vue";

const route = useRoute()
const tag = ref(route.params.tag as string)

const bookStore = useBookStore()
const bookResults = ref<BukuBookData[]>([])
const loading = ref(true)

const getTagSearchResults = async () => {
    loading.value = true
    await nextTick()
    bookResults.value = await bookStore.searchBookByTag(route.params.tag as string)
    loading.value = false
}

watch(() => route.params, async (oldValue, newValue) => {
    if (newValue.tag === tag.value) return
    loading.value = true
    tag.value = newValue.tag as string
    getTagSearchResults()
})

onMounted(async () => {
    await getTagSearchResults()
})
</script>

<template>
    <div v-if="loading" class="h-screen overflow-hidden">
        <LoaderIcon />
    </div>
    <div v-else class="mx-auto max-w-6xl px-4 py-4">
        <div v-if="bookResults.length" class="space-y-6">
            <BukuBookContainer :name="'Tag: ' + $route.params.tag" :books="bookResults" />
        </div>

        <div class="text-center md:text-left flex flex-col gap-4" v-else>
            <div>No books with tag <span class="font-bold underline">{{ tag }}</span> found</div>

            <RouterLink class="underline font-bold text-lg" to="/">Home</RouterLink>
        </div>
    </div>
</template>
