import { collection, doc, getDocs, getFirestore, query, QuerySnapshot, setDoc, where, type Firestore } from "firebase/firestore";
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

        async registerBook(data: BookData) {
            this.books.push(data)
            await setDoc(doc(this.firestore!!, "books"), data)
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