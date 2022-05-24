let myLibrary = [];
myLibrary = JSON.parse(localStorage.getItem("savedLibrary"));
console.log("Saved Library: ", myLibrary);

if (myLibrary!==null) {
    myLibrary.forEach(createCard);
} else {
    myLibrary = [];
}


function updateTotal() {
    let total = myLibrary.length;
    let totalBooks = document.getElementById("totalbooks");
    total = myLibrary.length;
    totalBooks.innerHTML = `Total Books: ${total}`;
}

updateTotal();

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = read;
    }
}

function createCard(item, index) {
    var checked = "";
    if(item.isRead) {
        checked = "checked"
    };

    const card = document.createElement("div");
    card.className = "card" ;
    card.id = `book-${index}`;

    card.innerHTML = 
    `<p>Title: ${item.title}</p>
    <p>Author: ${item.author}</p>
    <p>Pages: ${item.pages}</p>
    <p>Read yet?: <input type="checkbox" id="is-read-checkbox" name="is-read" ${checked}/></p>
    <button onclick="deleteBook(${index})">Delete Book</button>`;

    document.getElementById('main-content').appendChild(card);
}

function addBookToLibrary() {
    var title = prompt("Enter the title:", "Unknown title");
    var author = prompt("Enter the author:", "Unknown author");
    var pages = prompt("Enter the number of pages:", 0);
    var isRead = prompt("Have you read this book yet? (Y/N)", "N");
    var read = (isRead=="Y" || isRead=="y");


    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    let myArray = myLibrary[myLibrary.length - 1];
    createCard(myArray);
    updateLocalStorage();
    updateTotal();
}

function clearStorage() {
    localStorage.clear();
    location.reload();
}

function updateLocalStorage() {
    localStorage.setItem("savedLibrary", JSON.stringify(myLibrary));
    console.log(JSON.parse(localStorage.getItem("savedLibrary")));
}

function deleteBook(num) {
    const selectedElement = document.getElementById(`book-${num}`);
    selectedElement.remove();
    myLibrary.splice(num, 1);
    console.log(myLibrary)
    updateLocalStorage();
    updateTotal();
}

