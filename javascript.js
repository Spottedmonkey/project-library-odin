const bookShelf = document.querySelector("#bookShelf");

const myLibrary = [1, 2, 3, 4, 5, 6, 7, 8];

function Book(title, author, numberOfPages, readStatus) {
  this.title = prompt("please enter the title of your book");
  this.author = prompt("please enter the author of your book");
  this.numberOfPages = prompt("please enter the number of pages for your book");
  this.readStatus = prompt("have you finished reading this book or not?");
}

function addBookToLibrary() {
  let bookInfo = new Book();
  myLibrary.push(bookInfo);

  return console.log(bookInfo);
}

function generateTableRow() {
  myLibrary.forEach((item) => {
    const createDiv = document.createElement("div");
    const createBtn = document.createElement("button");
    bookShelf.appendChild(createDiv);
    createDiv.appendChild(createBtn);
    createDiv.classList = "book";
    createBtn.classList = "bookInfoBtn";
    createDiv.id = crypto.randomUUID();
  });
}

generateTableRow();

console.log(myLibrary.length);
console.log(myLibrary);
console.log(myLibrary.length);
