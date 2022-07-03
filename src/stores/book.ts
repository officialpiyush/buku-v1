import type { BukuBookData } from "@/types/BukuBookData";
import { addDoc, collection, doc, getDocs, getFirestore, QuerySnapshot, setDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import type { BookData } from "../types/BookData";

interface BookState {
    books: BukuBookData[]
}

export const useBookStore = defineStore("books", {
    state: (): BookState => ({
        books: []
    }),

    actions: {
        async registerBook(data: BookData, url: string) {
            const firestore = getFirestore()
            const result = await addDoc(collection(firestore, "books"), { url, ...data })
            this.books.push({ id: result.id, url, ...data })

        },

        async getAllBooks() {
            const firestore = getFirestore()
            const books = await getDocs(collection(firestore, "books")) as QuerySnapshot<BukuBookData>
            books.forEach(document => {
                this.books.push(document.data())
            })
        },

        async toggleBookmark(bookData: BukuBookData) {
            const firestore = getFirestore()
            const index = this.books.indexOf(bookData)
            if (index < 0) return

            const book = this.books[index]
            console.log({ bookmarkedBook: book })
            try {
                const q = doc(firestore, "books", bookData.id)
                await setDoc(q, {
                    bookmarked: !book.bookmarked
                })
            } catch (error) {
                console.error(error)
            }

            this.books[index] = { ...book, bookmarked: !book.bookmarked }
        },
    }
})