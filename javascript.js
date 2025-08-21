const bookShelf = document.querySelector("#bookShelf");
const bookAddBtn = document.querySelector(".bookAddBtn");

//Add book modal selectors
const addBookModal = document.querySelector("#addBookModal");
const addBookForm = document.querySelector("#addBookForm");
const cancelAddBookBtn = document.querySelector("#cancelAddBook");

//Edit book modal selectors
const editBookModal = document.querySelector("#editBookModal");
const editBookForm = document.querySelector("#editBookForm");
const cancelEditBookBtn = document.querySelector("#cancelEditBook");

//Selectors for inputs inside edit form
const editBookIdInput = document.querySelector("#editBookId");
const editBookTitleInput = document.querySelector("#editBookTitle");
const editBookAuthorInput = document.querySelector("#editBookAuthor");
const editBookPageCountInput = document.querySelector("#editBookPageCount");
const editBookReadInput = document.querySelector("#editBookRead");
const editBookUnreadInput = document.querySelector("#editBookUnread");

const myLibrary = [];

class Book {
  constructor(title, author, numberOfPages, readStatus, id) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.readStatus = readStatus;
    this.id = id || crypto.randomUUID();
  }

  toggleReadStatus() {
    this.readStatus = this.readStatus === "Read" ? "Unread" : "Read";
  }
}

function addBookToLibrary(title, author, numberOfPages, readStatus) {
  const newBook = new Book(title, author, numberOfPages, readStatus);
  myLibrary.push(newBook);
  return newBook;
}

function displayBook(book) {
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book-card");
  bookDiv.dataset.bookId = book.id;

  const titleEl = document.createElement("h3");
  titleEl.textContent = book.title;

  const authorEl = document.createElement("p");
  authorEl.textContent = `Author: ${book.author}`;

  const pagesEl = document.createElement("p");
  pagesEl.textContent = `Pages: ${book.numberOfPages}`;

  const readStatusEl = document.createElement("p");
  readStatusEl.textContent = `Status: ${book.readStatus}`;
  readStatusEl.classList.add("read-status");

  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("book-actions");

  const toggleReadBtn = document.createElement("button");
  toggleReadBtn.textContent = `Mark as ${
    book.readStatus === "Read" ? "Unread" : "Read"
  }`;
  toggleReadBtn.classList.add("toggle-read-btn");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-book-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-book-btn");

  actionsDiv.append(toggleReadBtn, editBtn, deleteBtn);
  bookDiv.append(titleEl, authorEl, pagesEl, readStatusEl, actionsDiv);
  bookShelf.appendChild(bookDiv);

  toggleReadBtn.addEventListener("click", () => {
    book.toggleReadStatus();
    readStatusEl.textContent = `Status: ${book.readStatus}`;
    toggleReadBtn.textContent = `Mark as ${
      book.readStatus === "Read" ? "Unread" : "Read"
    }`;
    console.log(`Toggled '${book.title}' read status to: ${book.readStatus}`);
    console.log("Current Library:", myLibrary);
  });

  deleteBtn.addEventListener("click", () => {
    const bookIndex = myLibrary.findIndex((b) => b.id === book.id);
    if (bookIndex > -1) {
      myLibrary.splice(bookIndex, 1);
    }
    bookDiv.remove();
    console.log(`Deleted book: '${book.title}'`);
    console.log("Current Library:", myLibrary);
  });

  editBtn.addEventListener("click", () => {
    alert(`Prepare to edit: ${book.title}`);
    editBookIdInput.value = book.id;
    editBookTitleInput.value = book.title;
    editBookAuthorInput.value = book.author;
    editBookPageCountInput.value = book.numberOfPages;

    if (book.readStatus === "Read") {
      editBookReadInput.checked = true;
    } else {
      editBookUnreadInput.checked = true;
    }

    editBookModal.showModal();
  });
}

editBookForm.addEventListener("submit", (event) => {
  const formData = new FormData(editBookForm);
  const bookId = formData.get("id");
  const updatedTitle = formData.get("title");
  const updatedAuthor = formData.get("author");
  const updatedNumberOfPages = formData.get("numberOfPages");
  const updatedReadStatus = formData.get("readStatus");

  const bookToUpdate = myLibrary.find((book) => book.id === bookId);

  if (bookToUpdate) {
    bookToUpdate.title = updatedTitle;
    bookToUpdate.author = updatedAuthor;
    bookToUpdate.numberOfPages = updatedNumberOfPages;
    bookToUpdate.readStatus = updatedReadStatus;

    const bookCardToUpdate = document.querySelector(
      `[data-book-id="${bookId}"]`
    );

    if (bookCardToUpdate) {
      bookCardToUpdate.querySelector("h3").textContent = updatedTitle;
      bookCardToUpdate.querySelector(
        "p:nth-of-type(1)"
      ).textContent = `Author: ${updatedAuthor}`;
      bookCardToUpdate.querySelector(
        "p:nth-of-type(2)"
      ).textContent = `Pages: ${updatedNumberOfPages}`;
      bookCardToUpdate.querySelector(
        ".read-status"
      ).textContent = `Status: ${updatedReadStatus}`;

      const toggleBtn = bookCardToUpdate.querySelector(".toggle-read-btn");
      if (toggleBtn) {
        toggleBtn.textContent = `Mark as ${
          bookToUpdate.readStatus === "Read" ? "Unread" : "Read"
        }`;
      }
    }
    console.log(`Book '${bookToUpdate.title}' updated!`);
    console.log("Current Library:", myLibrary);
  } else {
    console.warn(`Book with ID ${bookId} not found for update`);
  }
});

cancelEditBookBtn.addEventListener("click", () => {
  editBookModal.close();
});

bookAddBtn.addEventListener("click", () => {
  addBookForm.reset();
  addBookModal.showModal();
});

addBookForm.addEventListener("submit", (event) => {
  const formData = new FormData(addBookForm);
  const title = formData.get("title");
  const author = formData.get("author");
  const numberOfPages = formData.get("numberOfPages");
  const readStatus = formData.get("readStatus");

  const newBook = addBookToLibrary(title, author, numberOfPages, readStatus);
  displayBook(newBook);

  console.log("Book Added! Current Library:", myLibrary);
});

cancelAddBookBtn.addEventListener("click", () => {
  addBookModal.close();
});

console.log("myLibrary initialized:", myLibrary);