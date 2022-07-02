<script setup lang="ts">
// import { useBookStore } from "@/stores/book";
import BukuInput from '@/components/BukuInput.vue';
import { ref } from 'vue';
import type { APIBookData } from "../types/APIBookData";
import type { BookData } from "../types/BookData";
import BukuCard from "../components/BukuCard.vue";

// const bookStore = useBookStore()
const isbnNumber = ref("")
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
            publisher: data.volumeInfo.publisher,
            identifiers: data.volumeInfo.industryIdentifiers,
            description: data.volumeInfo.description,
            snippet: data.searchInfo.textSnippet,
            date: data.volumeInfo.publishedDate,
            categories: data.volumeInfo.categories,
            bookmarked: false
        }

        book.value = bookData
    } catch (error) {
        console.log(error)
    }
}
</script>


<template>
    <div class="space-y-4 lg:(space-y-8)">
        <div class="grid grid-cols-12">
            <div class="col-span-5 px-4 py-4 border-l-4 border-green-700 rounded-md gap-4 flex flex-col">
                <span class="font-extrabold text-lg">Add New Book</span>
                <div>
                    <BukuInput label="ISBN" type="text" @textChange="onTextChange" />
                </div>

                <div class="mt-2">
                    <button :disabled="isbnNumber.length <= 0" @click="onSearchClick"
                        class="disabled:(cursor-not-allowed) font-medium px-4 py-2 bg-green-600 hover:(bg-green-700) text-white rounded">
                        Search
                    </button>
                </div>
            </div>

            <!-- <div class="col-span-7">
                <div v-if="book !== null">
                    <BukuCard :book="book" />
                </div>
            </div> -->
        </div>

        <div v-if="book !== null">
            <BukuCard :book="book" />
        </div>
    </div>
</template>