export interface BookData {
    name: string
    image: string
    authors: string | string[]
    publisher: string
    identifiers: BookIdentifierData[]
    description: string
    date: string
    categories: string | string[]
    bookmarked: boolean
}

export interface BookIdentifierData {
    type: string
    identifier: string
}