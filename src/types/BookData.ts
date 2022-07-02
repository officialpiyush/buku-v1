export interface BookData {
    name: string
    image: string
    authors: string[]
    publisher: string
    identifiers: BookIdentifierData[]
    description: string
    snippet: string
    date: string
    categories: string | string[]
    bookmarked: boolean
}

export interface BookIdentifierData {
    type: string
    identifier: string
}