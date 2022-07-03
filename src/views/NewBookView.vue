<script setup lang="ts">
import { useBookStore } from "@/stores/book";
import BukuInput from '@/components/BukuInput.vue';
import { ref } from 'vue';
import type { APIBookData } from "../types/APIBookData";
import type { BookData } from "../types/BookData";
import BukuCard from "../components/BukuCard.vue";
import router from "@/router";

const bookStore = useBookStore()
const isbnNumber = ref("")
const url = ref("")
const book = ref<BookData | null>(null)

const onTextChange = (text: string) => {
    isbnNumber.value = text
    console.log(isbnNumber)
}

const onSearchClick = async () => {
    try {
        const res: APIBookData = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber.value}`).then(r => r.json())

        console.log(res)
        const data = res.items[0]

        const bookData: BookData = {
            name: data.volumeInfo.title,
            image: data.volumeInfo.imageLinks.thumbnail,
            authors: data.volumeInfo.authors,
            publisher: data.volumeInfo.publisher || "N/A",
            identifiers: data.volumeInfo.industryIdentifiers,
            description: data.volumeInfo.description,
            snippet: data.searchInfo ? data.searchInfo.textSnippet : "N/A",
            date: data.volumeInfo.publishedDate,
            categories: data.volumeInfo.categories,
            bookmarked: false
        }

        console.log({ bookData })

        book.value = bookData
    } catch (error) {
        console.log(error)
    }
}

const registerBook = async () => {
    await bookStore.registerBook(book.value as BookData, url.value)
    return router.push("/")
}
</script>


<template>
    <div class="space-y-4 lg:(space-y-8)">
        <div class=" px-4 py-4 border-l-4 border-green-700 rounded-md gap-4 flex flex-col">
            <span class="font-extrabold text-lg">Add New Book</span>
            <div class="space-y-2">
                <BukuInput label="ISBN" type="text" @textChange="onTextChange" />
                <BukuInput v-if="book !== null" label="URL" type="text" @textChange="value => url = value" />
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