import '../styles.css'; 
import { renderBookElements } from "./DOMbuilder.js"   
import { Book } from "./book.js"
import { Store } from "./storage.js"  

const libraryStorage = new Store() // Start Storage 

// Bootstrap/Initialization for the app
function init() { 

    const booksContainer = document.getElementById("grid-container")
    const newBookForm = document.getElementById('book-dialog-form')
    const newBookDialog = document.getElementById('new-book-dialog')

    booksContainer.addEventListener('click', (e) => {  
        const removeBtn = e.target.closest('.remove-button')
        const readBtn = e.target.closest('.read-button')
        const bookId = e.target.closest('.card-wrapper')?.dataset.bookId

        // Remove Book 
        if (removeBtn) { 
            libraryStorage.deleteBook(bookId)
            renderBookElements(libraryStorage.library)
        }
        // Toggle Book Read Status
        else if (readBtn) { 
            const book = libraryStorage.findBookById(bookId)
            book.toggleReadStatus()
            renderBookElements(libraryStorage.library)
        }

    }) 

    // Add New Book 
    newBookForm.addEventListener('submit', (e) => { 
        e.preventDefault() 

        const titleInput = document.getElementById("title-book").value
        const authorInput = document.getElementById("author-book").value
        const pagesInput = document.getElementById("pages-book").value 
        const readStatusInput = document.querySelector('input[name="read-status"]:checked');

        const readStatusValue = readStatusInput ? readStatusInput.value : "None";    
        
        const newBook = new Book(titleInput, authorInput, Number(pagesInput), readStatusValue); 
        libraryStorage.addBookToLibrary(newBook)
        renderBookElements(libraryStorage.library)
        newBookForm.reset()
        newBookDialog.close()
    })


    dialogEventListeners()
}

function dialogEventListeners() { 

  const getHeaderContainer = document.querySelector(".header-container") 
  const getDialog = document.getElementById("new-book-dialog")
  const getDialogWrapper = document.querySelector(".dialog-wrapper")

  getDialog.addEventListener('click', (e) => !getDialogWrapper.contains(e.target) && getDialog.close());
  getHeaderContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains("new-book-btn")) { 
        getDialog.showModal()
      }

      if (e.target.classList.contains("close-dialog-btn")) { 
        getDialog.close()
      }
    }) 
}

init()