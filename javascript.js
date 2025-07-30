const bookShelf = document.querySelector("#bookShelf");
const bookAddBtn = document.querySelector(".bookAddBtn");

const myLibrary = [];

function Book(title, author, numberOfPages, readStatus) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readStatus = readStatus;
}

function addBookToLibrary() {
  let bookInfo = new Book();
  myLibrary.push(bookInfo);
  generateNewBook();

  return console.log(bookInfo);
}

function generateNewBook() {
  const createDiv = document.createElement("div");
  const createBtn = document.createElement("button");
  const addImg = document.createElement("img");
  const createDialog = document.createElement("dialog");

  bookShelf.appendChild(createDiv);
  createDiv.appendChild(createBtn);
  createDiv.appendChild(createDialog);
  createBtn.appendChild(addImg);

  createDiv.classList = "book";
  createBtn.classList = "bookInfoBtn";
  addImg.classList = "bookInfoImg";
  createDialog.classList = "bookInfoDialog";

  addImg.src = `./images/info-icon.svg`;
  createDialog.setAttribute("closedBy", "any");

  createDiv.id = crypto.randomUUID();

  createBtn.addEventListener("click", () => {
    createDialog.showModal();
  });

  //form
  const createForm = document.createElement("form");
  createDialog.appendChild(createForm);
  // #region form book title
  const createTitleInput = document.createElement("input");
  const createTitleLabel = document.createElement("label");

  createForm.appendChild(createTitleLabel);
  createForm.appendChild(createTitleInput);

  createForm.classList = "bookInfoForm";
  createForm.setAttribute("method", "dialog");

  createTitleInput.type = "text";
  createTitleInput.name = "bookTitle";
  createTitleInput.id = "bookTitle";
  createTitleInput.classList = "titleInput";

  createTitleLabel.textContent = "Title:";
  createTitleLabel.setAttribute("for", "bookTitle");
  // #endregion

  // #region form book author
  const createAuthorInput = document.createElement("input");
  const createAuthorLabel = document.createElement("label");

  createForm.appendChild(createAuthorLabel);
  createForm.appendChild(createAuthorInput);

  createAuthorLabel.textContent = "Author:";
  createAuthorLabel.setAttribute("for", "bookAuthor");

  createAuthorInput.type = "text";
  createAuthorInput.name = "bookAuthor";
  createAuthorInput.id = "bookAuthor";
  createAuthorInput.classList = "authorInput";
  // #endregion

  // #region form page count
  const createPageCountInput = document.createElement("input");
  const createPageCountLabel = document.createElement("label");

  createForm.appendChild(createPageCountLabel);
  createForm.appendChild(createPageCountInput);

  createPageCountLabel.textContent = "Page Count:";
  createPageCountLabel.setAttribute("for", "bookPageCount");

  createPageCountInput.type = "number";
  createPageCountInput.name = "bookPageCount";
  createPageCountInput.id = "bookPageCount";
  createPageCountInput.min = "0";
  createPageCountInput.classList = "pageCountInput";
  // #endregion

  // #region form read status
  const createReadStatusInput = document.createElement("input");
  const createReadStatusLabel = document.createElement("label");
  const createReadStatusDiv = document.createElement("div");

  createForm.appendChild(createReadStatusDiv);
  createReadStatusDiv.classList = "readStatusDiv";

  createReadStatusDiv.appendChild(createReadStatusLabel);
  createReadStatusDiv.appendChild(createReadStatusInput);

  createReadStatusLabel.textContent = "Read";
  createReadStatusLabel.setAttribute("for", "bookReadStatus");

  createReadStatusInput.type = "radio";
  createReadStatusInput.name = "bookReadStatus";
  createReadStatusInput.id = "bookReadStatus";
  createReadStatusInput.value = "read";
  createReadStatusInput.classList = "readStatusInput";

  const createUnreadStatusInput = document.createElement("input");
  const createUnreadStatusLabel = document.createElement("label");

  createReadStatusDiv.appendChild(createUnreadStatusLabel);
  createReadStatusDiv.appendChild(createUnreadStatusInput);

  createUnreadStatusLabel.textContent = "Unread";
  createUnreadStatusLabel.setAttribute("for", "bookUnreadStatus");

  createUnreadStatusInput.type = "radio";
  createUnreadStatusInput.name = "bookReadStatus";
  createUnreadStatusInput.id = "bookUnreadStatus";
  createUnreadStatusInput.value = "unread";
  createUnreadStatusInput.classList = "unreadStatusInput";
  // #endregion

  // #region form book cover

  // const createAuthorInput = document.createElement("input");
  // const createAuthorLabel = document.createElement("label");

  // createForm.appendChild(createAuthorLabel);
  // createForm.appendChild(createAuthorInput);

  // createAuthorLabel.textContent = "Author:";
  // createAuthorLabel.setAttribute("for", "bookAuthor");

  // createAuthorInput.type = "text";
  // createAuthorInput.name = "bookAuthor";
  // createAuthorInput.id = "bookAuthor";
  // createAuthorInput.classList = "authorInput";
  // #endregion

  // #region form buttons
  const createSubmitBtn = document.createElement("button");

  createForm.appendChild(createSubmitBtn);

  createSubmitBtn.classList = "bookInfoFormSubmitBtn";
  createSubmitBtn.textContent = "Submit";

  const selectSubmitBtn = document.querySelectorAll(".bookInfoFormSubmitBtn");

  selectSubmitBtn.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const formData = new FormData(createForm);
      const getBookTitle = formData.get("bookTitle");
      const getBookAuthor = formData.get("bookAuthor");
      const getBookPageCount = formData.get("bookPageCount");
      const getBookReadStatus = formData.get("bookReadStatus");
      console.log(getBookTitle);
      console.log(getBookAuthor);
      console.log(getBookPageCount);
      console.log(getBookReadStatus);
      createDialog.close();
    });
  });

  // #endregion
}

bookAddBtn.addEventListener("click", () => {
  addBookToLibrary();
  console.log(myLibrary);
});

console.log(myLibrary.length);
console.log(myLibrary);
console.log(myLibrary.length);
