const validReadStates = ["already read", "not read yet"] 

const validateTitle = (title) => { 
    if (typeof title !== "string" || title.trim() === "") { 
        throw new Error("Invalid Title")
    }
    return title
}

export class Book { 

    bookId = crypto.randomUUID()
    #author 
    #pages
    #readStatus

    constructor(title, author, pages, readStatus) { 
        this.title = validateTitle(title)
        this.author = author 
        this.pages = pages 
        this.readStatus = readStatus 
    }

    get author() { return this.#author }
    set author(val) { 
        if (typeof val !== "string" || val.trim() === "") { 
            throw new Error("Invalid Author")
        }
        this.#author = val
    }

    get pages() { return this.#pages }
    set pages(val) { 
        if (typeof val !== "number" || val < 0) { 
            throw new Error("Pages must be a non-negative number")
        }
        this.#pages = val
    }

    get readStatus() { return this.#readStatus }
    set readStatus(val) {
        if (!validReadStates.includes(val)) { 
            throw new TypeError("Invalid Read Status")
        }
        this.#readStatus = val
    }

    toggleReadStatus() { 
        this.#readStatus = this.#readStatus === "already read" 
        ? "not read yet" 
        : "already read"
    }

}   