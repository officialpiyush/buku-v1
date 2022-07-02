import { addDoc, collection, getDocs, getFirestore, query, QuerySnapshot, where, type Firestore } from "firebase/firestore";
import { defineStore } from "pinia";
import type { BookData } from "../types/BookData";

interface BookState {
    firestore: Firestore | null
    bookmarkedBooks: BookData[]
    books: BookData[]
}

export const useBookStore = defineStore("books", {
    state: (): BookState => ({
        firestore: null,
        bookmarkedBooks: [],
        books: []
    }),

    actions: {
        async initializeDatabase() {
            const firestore = getFirestore()
            this.firestore = firestore
        },

        async registerBook(data: BookData, url: string) {
            const firestore = getFirestore()
            this.books.push(data)
            await addDoc(collection(firestore, "books"), { url, ...data })
        },

        async getAllBooks() {
            const books = await getDocs(collection(this.firestore!!, "books")) as QuerySnapshot<BookData>
            books.forEach(document => {
                this.books.push(document.data())
            })
        },

        async getBookmarked() {
            const q = query(collection(this.firestore!!, "books"), where("bookmarked", "==", true));
            const bookmarkedBooks = await getDocs(q) as QuerySnapshot<BookData>
            bookmarkedBooks.forEach((document) => {
                this.bookmarkedBooks.push(document.data())
            })
        }
    }
})