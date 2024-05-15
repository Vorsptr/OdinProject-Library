const main = document.getElementById("main");
const addBook = document.getElementById("add-book");

const bookLibrary = [];
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}
window.addEventListener("load", () => {
  bookLibrary.push(...getItemsFromLocalStorage());
  render();
});

addBook.addEventListener("click", (e) => {
  e.preventDefault();
  const book = getFormData();
  if (Array.from(Object.values(book)).every((value) => value.length)) {
    addBookToLibrary(book);
  } else {
    window.alert("Please fill all the fields");
    return;
  }
  render();
});
function addItemsToLocalStorage() {
  localStorage.setItem("bookLibrary", JSON.stringify(bookLibrary));
}

function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("bookLibrary"));
}

function getFormData() {
  const form = document.querySelector(".book-form");
  const formData = new FormData(form);
  const dataObject = Object.fromEntries(formData.entries());
  form.reset();
  return dataObject;
}

function removeBook(id) {
  bookLibrary.splice(
    bookLibrary.findIndex((book) => book.id === id),
    1
  );
  addItemsToLocalStorage();
  render();
}

function toggleRead(id) {
  const book = bookLibrary.find((book) => book.id === id);
  book.read = !book.read;
  addItemsToLocalStorage();
  render();
}
function addBookToLibrary(book) {
  bookLibrary.push({ ...book, id: new Date().getTime() });
  addItemsToLocalStorage();
}

function generateMarkup(book) {
  return `
  <h2>Title: ${book.title}</h2>
  <p>Author: ${book.author}</p>
  <p>Pages: ${book.pages}</p>
  <p>Already read: ${book.read ? "😍😍" : "❌"}</p>
  <button class="btn btn-danger" onclick="removeBook(${book.id})">X</button>
  <button class="btn btn-primary" onclick="toggleRead(${book.id})">${
    book.read ? "Not read" : "Read"
  }</button>
  `;
}

function render() {
  if (main.lastChild) {
    main.removeChild(main.lastChild);
  }
  const bookCards = document.createElement("div");
  bookCards.classList.add("book-cards");
  bookLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.dataset.id = book.id;
    bookCard.classList.add("book-card");
    bookCard.innerHTML = generateMarkup(book);
    bookCards.appendChild(bookCard);
  });
  main.appendChild(bookCards);
}
