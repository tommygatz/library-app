google.books.load();
  
function initialize() {
  var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  viewer.load('ISBN:0738531367');
}

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

window.onload = updateTotal() ;

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
    card.setAttribute("onclick", `flipCard(${index})`)
    card.className = "card" ;
    card.id = `book-${index}`;

    card.innerHTML = 
    `<div class="card-face card-front" id="viewer-canvas">
    </div>

    <div class="card-face card-back">
    <h4>Title: ${item.title}</h4>
    <h4>Author: ${item.author}</h4>
    <h4>Pages: ${item.pages}</h4>
    <h4>Read yet?: <input type="checkbox" name="is-read" ${checked}/></h4>
    <button onclick="deleteBook(${index})">Delete Book</button>
    </div>`;
  
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
    createCard(myArray, myArray.index);
    updateLocalStorage();
    updateTotal();
    location.reload();
}

function clearStorage() {
    localStorage.clear();
    location.reload();
}

function updateLocalStorage() {
    localStorage.setItem("savedLibrary", JSON.stringify(myLibrary));
}

function deleteBook(num) {
    const selectedElement = document.getElementById(`book-${num}`);
    selectedElement.
    selectedElement.remove();
    myLibrary.splice(num, 1);
    updateLocalStorage();
    updateTotal();
}

function flipCard(index) {
    var flip = document.getElementById(`book-${index}`);
    try {
        flip.classList.toggle("flipped");
    } catch {
        return
    }
}


