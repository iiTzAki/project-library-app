function MakeBooks() { 
  const myLibrary = [];

  const getLibrary = () => {return myLibrary}

  class Book {
    bookId = crypto.randomUUID()

    constructor(title, author, pages, readStatus) { 
      this.title = title; 
      this.author = author; 
      this.pages = pages; 
      this.readStatus = readStatus
    }

    set author(newAuthor) {
      if(!Number.isNaN(Number(newAuthor)) || newAuthor.length <= 0) {
        this._author = "Unknown";
        return 
      }
      this._author = newAuthor;
    } 

    set pages(newPages) { 
      if(newPages === "" || Number(newPages) < 0) { 
        this._pages = "None";
        return
      }
      this._pages = newPages;
    } 

    get author() { 
      return this._author
    }

    get pages() { 
      return this._pages
    }

    toggleRead() { 
      this.readStatus = this.readStatus === "Already Read" ? "Not Read Yet" : "Already Read"; 
    }
    
  };    
  
  function addBookToLibrary(userTitle, userAuthor, userPages, userStatus) {
    const book = new Book(userTitle, userAuthor, userPages, userStatus)
    myLibrary.push(book)
  };

  const removeBook = (id) => { 
    const currentIndex = myLibrary.findIndex(book => book.bookId === id)

    if (currentIndex > -1) {
      myLibrary.splice(currentIndex, 1)
    }
  }

  return {addBookToLibrary, getLibrary, removeBook}

}

(function ScreenController() { 
  const getCardContainer = document.getElementById("grid-container");
  const callMakeBooks = MakeBooks();

  function displayLibraryBooks() { 
    getCardContainer.innerHTML = ""

    callMakeBooks.getLibrary().forEach(function (currentBook, index) { 
      const cardWrapper = document.createElement("div")
      cardWrapper.className = "card-wrapper"

      const bookDetailsWrapper = document.createElement("div")
      bookDetailsWrapper.className = "book-details-wrapper"
      const bookTitle = document.createElement("h1")
      bookTitle.textContent = currentBook.title

      const textWrapperAuthor = document.createElement("div")
      textWrapperAuthor.className = "text-wrapper"
      const authorText = document.createElement("h3")
      authorText.textContent = "Author:"
      const bookAuthor = document.createElement("p")
      bookAuthor.textContent = currentBook.author
      
      const textWrapperPages = document.createElement("div")
      textWrapperPages.className = "text-wrapper"
      const pagesText = document.createElement("h3")
      pagesText.textContent = "Pages:"    
      const bookPages = document.createElement("p")
      bookPages.textContent = currentBook.pages    
      
      const textWrapperReadStatus = document.createElement("div")
      textWrapperReadStatus.className = "text-wrapper"
      const readStatusText = document.createElement("h3")
      readStatusText.textContent = "Read Status:"    
      const bookStatus = document.createElement("p")
      bookStatus.textContent = currentBook.readStatus  
      
      const buttonWrapper = document.createElement("div")
      buttonWrapper.className = "button-wrapper"

      const readBtn = document.createElement("button")
      const removeBtn = document.createElement("button")
      readBtn.setAttribute("data-book-random-id", currentBook.bookId)
      removeBtn.setAttribute("data-book-random-id", currentBook.bookId)
      readBtn.classList.add("read-button", "toggle-button")
      removeBtn.classList.add("remove-button", "toggle-button")

      // Function to CreateSvgs
      createSvgIcons(readBtn, removeBtn, buttonWrapper)
      cardWrapper.appendChild(bookDetailsWrapper)

      textWrapperAuthor.append(authorText, bookAuthor)
      textWrapperPages.append(pagesText, bookPages)
      textWrapperReadStatus.append(readStatusText, bookStatus)

      bookDetailsWrapper.append(bookTitle, textWrapperAuthor, textWrapperPages, textWrapperReadStatus)
      cardWrapper.append(bookDetailsWrapper, buttonWrapper)

      getCardContainer.appendChild(cardWrapper)
    })
  }

  // Creates SVG Elements with Attributes By loops
  const SVG_NS = "http://www.w3.org/2000/svg";
  const createSvgElement = (tagName, attributes) => {
    const icon = document.createElementNS(SVG_NS, tagName)
    for (const[key, value] of Object.entries(attributes)) { 
      icon.setAttribute(key, value);
    }
    return icon;
  }

  const createSvgIcons = (readBtn, removeBtn, btnWrapper) => { 

      const readSvg = createSvgElement("svg", { 
        "xmlns": SVG_NS,
        "viewBox": "0 0 24 24" 
      });

      const readPath = createSvgElement("path", {
        "d": "M19 1L14 6V17L19 12.5V1M21 5V18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5M10 18.41C8.75 18.09 7.5 18 6.5 18C5.44 18 4.18 18.19 3 18.5V7.13C3.91 6.73 5.14 6.5 6.5 6.5C7.86 6.5 9.09 6.73 10 7.13V18.41Z"
      });

      readSvg.appendChild(readPath)
      readBtn.appendChild(readSvg)

      const removeSvg = createSvgElement("svg", { 
        "xmlns": SVG_NS,
        "viewBox": "0 0 24 24" 
      });

      const removePath = createSvgElement("path", {
        "d": "M17 4V10L15 8L13 10V4H9V20H12.1C12.2 20.7 12.5 21.4 12.8 22H7C5.9 22 5 21 5 20V19H3V17H5V13H3V11H5V7H3V5H5V4C5 2.9 5.9 2 7 2H19C20 2 21 3 21 4V13.8C20.4 13.4 19.7 13.2 19 13.1V4H17M5 19H7V17H5V19M5 13H7V11H5V13M5 7H7V5H5V7M20.1 15.5L18 17.6L15.9 15.5L14.5 16.9L16.6 19L14.5 21.1L15.9 22.5L18 20.4L20.1 22.5L21.5 21.1L19.4 19L21.5 16.9L20.1 15.5Z"
      })

      removeSvg.appendChild(removePath)
      removeBtn.appendChild(removeSvg)

      btnWrapper.append(readBtn, removeBtn)
  }

  function SetupEventListeners() { 

    const getCardContainer = document.getElementById("grid-container");
    const getHeaderContainer = document.querySelector(".header-container") 
    const getDialog = document.querySelector("#new-book-dialog")
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

    const dialogForm = document.querySelector(".dialog-form")
    const getSubmitBtn = document.getElementById("form-submit-btn") 
    getSubmitBtn.addEventListener("click", (e) => { 
      e.preventDefault()

      const getInputTitle = document.getElementById("title-book").value
      const getInputAuthor = document.getElementById("author-book").value
      const getInputPages = document.getElementById("pages-book").value 

      const getReadStatus = document.querySelector('input[name="read-status"]:checked');
      const readStatusValue = getReadStatus ? getReadStatus.value : "None";

      callMakeBooks.addBookToLibrary(getInputTitle, getInputAuthor, getInputPages, readStatusValue)
      displayLibraryBooks()
      getDialog.close()
      dialogForm.reset()
    })

    getCardContainer.addEventListener('click', (e) => { 
      const target = e.target
      const removeBtn = target.closest('.remove-button')
      const readBtn = target.closest('.read-button')

      if (removeBtn) {
        const Id = removeBtn.dataset.bookRandomId
        callMakeBooks.removeBook(Id)
        displayLibraryBooks()
      }

      if (readBtn) {
        const Id = readBtn.dataset.bookRandomId
        const book = callMakeBooks.getLibrary().find(book => book.bookId === Id)

        if (book) { 
          book.toggleRead()
          displayLibraryBooks()
        }
      }

    });  

  }
  
  SetupEventListeners()
})()
