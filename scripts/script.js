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
    var read = "";
    var readText = "";
    if(item.isRead) {
        read = "is-read";
        readText = "Read";
    } else {
        read = "not-read";
        readText = "Not Read";
    }

    const card = document.createElement("div");
    card.className = "card" ;
    card.id = `book-${index}`;

    card.innerHTML = 
    `<div class="book-text-container"><h4>${item.title}</h4>
    <p>by ${item.author}</p>
    <p>${item.pages} pages</p></div>
    <div class="button-container"><div id="is-read-button-${index}" class="is-read-button ${read}" onclick="toggleRead(${index})"><p class="read-text">${readText}</p></div>
    <button onclick="deleteBook(${index})"><span>Delete Book</span></button></div>`;

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
    console.log(newBook)

    createCard(myLibrary[myLibrary.length - 1], (myLibrary.length - 1));
    updateLocalStorage();
    updateTotal();
}

function clearStorage() {
    localStorage.clear();
    location.reload();
}

function updateLocalStorage() {
    localStorage.setItem("savedLibrary", JSON.stringify(myLibrary));
    // console.log(JSON.parse(localStorage.getItem("savedLibrary")));
}

function deleteBook(num) {
    const selectedElement = document.getElementById(`book-${num}`);
    selectedElement.remove();
    myLibrary.splice(num, 1);
    updateLocalStorage();
    updateTotal();
}

function toggleRead(index) {
    const element = document.getElementById(`is-read-button-${index}`);
    element.classList.toggle("not-read");
    element.classList.toggle("is-read");


    readValue = myLibrary[index];
    if(myLibrary[index].isRead){
        myLibrary[index].isRead = false;
        element.innerHTML = '<p class="read-text">Not Read</p>';
    } else {
        myLibrary[index].isRead = true;
        element.innerHTML = '<p class="read-text">Read</p>';
    }
    updateLocalStorage();
}