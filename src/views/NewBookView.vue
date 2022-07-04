<script setup lang="ts">
import BukuInput from '@/components/BukuInput.vue';
import router from "@/router";
import { useBookStore } from "@/stores/book";
import { useUserStore } from "@/stores/user";
import type { User } from "@firebase/auth";
import { ref } from 'vue';
import BukuCard from "../components/BukuCard.vue";
import type { APIBookData } from "../types/APIBookData";
import type { BookData } from "../types/BookData";

const userStore = useUserStore()
const bookStore = useBookStore()
const isbnNumber = ref("")
const tags = ref("")
const url = ref("")
const book = ref<BookData | null>(null)

const onTextChange = (text: string) => {
    isbnNumber.value = text
}

const onSearchClick = async () => {
    try {
        const res: APIBookData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber.value}`).then(r => r.json())
        const data = res.items[0]

        const bookData: BookData = {
            name: data.volumeInfo.title || "N/A",
            image: data.volumeInfo.imageLinks.thumbnail || "N/A",
            authors: data.volumeInfo.authors || "N/A",
            publisher: data.volumeInfo.publisher || "N/A" || "N/A",
            identifiers: data.volumeInfo.industryIdentifiers || "N/A",
            description: data.volumeInfo.description || "N/A",
            snippet: data.searchInfo ? data.searchInfo.textSnippet : "N/A",
            date: data.volumeInfo.publishedDate || "N/A",
            categories: data.volumeInfo.categories || "N/A",
            bookmarked: false
        }

        book.value = bookData
    } catch (error) {
        console.log(`Error while fetching book info: ${error}`)
    }
}

const registerBook = async () => {
    await bookStore.registerBook(book.value as BookData, url.value, tags.value.split(",").map(tag => tag.toLowerCase().trim()), userStore.user as User)
    return router.replace("/")
}
</script>


<template>
    <div class="space-y-4 lg:(space-y-8)">
        <div class=" px-4 py-4 border-l-4 border-green-700 rounded-md gap-4 flex flex-col">
            <span class="font-extrabold text-lg">Add New Book</span>
            <div class="space-y-2">
                <BukuInput label="ISBN" type="text" @textChange="onTextChange" />
                <BukuInput v-if="book !== null" label="URL" type="text" @textChange="value => url = value" />
                <BukuInput v-if="book !== null" placeholder="Seperated by comma (,)" label="Tags" type="text"
                    @textChange="value => tags = value" />
            </div>

            <div class="mt-2 space-x-2">
                <button :disabled="isbnNumber.length <= 0 || book !== null" @click="onSearchClick"
                    class="disabled:(cursor-not-allowed !bg-green-500) font-medium px-4 py-2 bg-green-600 hover:(bg-green-700) text-white rounded">
                    Search
                </button>

                <button @click="registerBook" :disabled="url.length <= 0"
                    class="disabled:(!bg-blue-400 cursor-not-allowed) bg-blue-600 hover:(bg-blue-700) text-white px-4 py-2 rounded-md font-bold"
                    v-if="book !== null && url !== null">
                    Create
                </button>
            </div>
        </div>

        <div v-if="book !== null">
            <BukuCard :book="book" />
        </div>
    </div>
</template>