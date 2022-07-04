import type { BookData } from "./BookData";

export interface BukuBookData extends BookData {
    id: string
    url: string
    tags: string[]
    user_email: string
    user_id: string
}