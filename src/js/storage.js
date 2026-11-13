import { Book } from "./book.js"

export class Store { 

    #library = []

    get library() { 
        return [...this.#library]
    }

    addBookToLibrary(book) { 
        if (!(book instanceof Book)) { 
            throw new TypeError("Expected a Book instance")
        }
        this.#library.push(book)
    } 

    deleteBook(bookId) { 
        const bookIndex = this.#library.findIndex((book) => book.bookId === bookId)
        if (bookIndex === -1) { 
            console.warn("Could not find the book")
            return false
        }
        this.#library.splice(bookIndex, 1)
        return true 
    }

    findBookById(bookId) {
        const book = this.#library.find((book) => book.bookId === bookId)
        if (!book) console.warn("Could not find the book")
        return book 
    }

}