import type { BukuBookData } from "@/types/BukuBookData";
import { addDoc, collection, getDocs, getFirestore, query, QuerySnapshot, where, type Firestore } from "firebase/firestore";
import { defineStore } from "pinia";
import type { BookData } from "../types/BookData";

interface BookState {
    bookmarkedBooks: BukuBookData[]
    books: BukuBookData[]
}

export const useBookStore = defineStore("books", {
    state: (): BookState => ({
        bookmarkedBooks: [],
        books: []
    }),

    actions: {
        async registerBook(data: BookData, url: string) {
            const firestore = getFirestore()
            this.books.push({ url, ...data })
            await addDoc(collection(firestore, "books"), { url, ...data })
        },

        async getAllBooks() {
            const firestore = getFirestore()
            const books = await getDocs(collection(firestore, "books")) as QuerySnapshot<BukuBookData>
            books.forEach(document => {
                this.books.push(document.data())
            })
        },

        async getBookmarked() {
            const firestore = getFirestore()

            const q = query(collection(firestore!!, "books"), where("bookmarked", "==", true));
            const bookmarkedBooks = await getDocs(q) as QuerySnapshot<BukuBookData>
            bookmarkedBooks.forEach((document) => {
                this.bookmarkedBooks.push(document.data())
            })
        }
    }
})