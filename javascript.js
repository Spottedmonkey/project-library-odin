const openBookDialog = document.querySelector("#openBookDialog");
const newBookDialog = document.querySelector("#newBookDialog");
const body = document.querySelector(".body");
const newBookForm = document.querySelector("#newBookForm");

//New book form elements
const formSubmit = document.querySelector("#formSubmit");
const bookID = document.querySelector("#bookID");

let myLibrary = [];

function Book(title, author, pageCount, readStatus, id) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.readStatus = readStatus;
  this.id = id;
}

function addBookToLibrary(title, author, pageCount, readStatus, id) {
  let newBook = new Book(title, author, pageCount, readStatus, id);
  myLibrary.push(newBook);
  return newBook;
}

openBookDialog.addEventListener("click", () => {
  newBookDialog.showModal();
});

formSubmit.addEventListener("click", (e) => {
  if (!newBookForm.reportValidity()) {
    e.preventDefault();
    return;
  } else {
    bookID.value = crypto.randomUUID();

    const createNewBook = document.createElement("div");
    const displayTitle = document.createElement("p");
    const displayAuthor = document.createElement("p");
    const displayReadStatus = document.createElement("p");
    const displayPageCount = document.createElement("p");

    //obtaining book values
    const getBookTitle = document.querySelector("#bookTitle").value;
    const getBookAuthor = document.querySelector("#bookAuthor").value;
    const getBookPageCount = document.querySelector("#bookPageCount").value;
    const getBookReadStatus = document.getElementsByName("bookReadStatus");
    const getBookID = document.querySelector("#bookID").value;

    const displayBookReadStatus = () => {
      for (const status of getBookReadStatus) {
        if (status.checked) {
          return status.value;
        }
      }
      return "";
    };

    addBookToLibrary(
      getBookTitle,
      getBookAuthor,
      getBookPageCount,
      displayBookReadStatus(),
      getBookID
    );

    body.appendChild(createNewBook);
    createNewBook.classList.add("book-tile");
    createNewBook.id = getBookID;

    createNewBook.appendChild(displayTitle);
    displayTitle.textContent = `Title: ${getBookTitle}`;

    createNewBook.appendChild(displayAuthor);
    displayAuthor.textContent = `Author: ${getBookAuthor}`;

    createNewBook.appendChild(displayPageCount);
    displayPageCount.textContent = `Page count: ${getBookPageCount}`;

    createNewBook.appendChild(displayReadStatus);
    displayReadStatus.textContent = `Read status: ${displayBookReadStatus()}`;

    console.log(myLibrary);
  }
});

console.log(addBookToLibrary("pizza", "llama", "45", "read"));
