let mode = document.querySelector("header .mode button");
let addBookMenu = document.querySelector("form");
let addBookButton = document.querySelector(".add-book button");
let myLibarary = [];


if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector(".mode button svg.moon").classList.add("not-visible");
    document.querySelector(".mode button svg.sun").classList.remove("not-visible")
    document.querySelector("body").classList.add("dark-mode");
} else {
    document.querySelector(".mode button svg.moon").classList.remove("not-visible");
    document.querySelector(".mode button svg.sun").classList.add("not-visible");
    document.querySelector("body").classList.remove("dark-mode");
}

function Book(bookName, bookAuthor, numberOfPages, Language, bookRead) {
    this.bookName = bookName;
    this.bookAuthor = bookAuthor;
    this.numberOfPages = numberOfPages;
    this.Language = Language;
    this.bookRead = bookRead;
}

mode.addEventListener("click", function() {
    document.querySelectorAll(".mode button svg").forEach(function(e) {
        e.classList.toggle("not-visible");
    })

    document.querySelector("body").classList.toggle("dark-mode");
});

addBookButton.addEventListener("click", function() {
    addBookMenu.style.cssText = "display: grid;";
    document.querySelector(".overlay").style.cssText = "display: block;";
});

document.querySelector("form .header button").addEventListener("click", function() {
        addBookMenu.style.cssText = "display: none;";
        document.querySelector(".overlay").style.cssText = "display: none;";
});

document.forms[0].addEventListener("submit", function(e) {
    e.preventDefault();
    let bookName = document.querySelector("form input#book-name").value;
    let bookAuthor = document.querySelector("form input#book-author").value;
    let numberOfPages = document.querySelector("form input#pages-number").value;
    let bookLanguage = document.querySelector("form input#Language").value;
    let bookRead = document.querySelector("form select#book-status").value;
    let newBook = new Book(bookName, bookAuthor, numberOfPages, bookLanguage, bookRead);
    addBookToLibrary(newBook);
    addBookMenu.style.cssText = "display: none;";
    document.querySelector(".overlay").style.cssText = "display: none;";
    document.querySelectorAll("section > div").forEach(function(element){
        element.remove();
    })    
    displayBooks();
    removeBook();
    updateStats();
})

function addBookToLibrary(book) {
    myLibarary.push(book);
}

function removeBook() {
    document.querySelectorAll(".book > button").forEach(function(e) {
        e.addEventListener("click", function() {
            e.parentElement.remove();
            myLibarary.splice(e.id, 1);
            updateStats();
        })
    })
};

function displayBooks() {
    myLibarary.forEach(function(e) {
        let theBook = document.createElement("div");
        theBook.classList.add("book");
        theBook.setAttribute("id", myLibarary.length);
        theBook.innerHTML = `
        <button class="X">X</button>
        <h2>${e.bookName}</h2>
        <h3>by: ${e.bookAuthor}</h3>
        <h3>Number Of Pages: ${e.numberOfPages}</h3>
        <h3>Language: ${e.bookLanguage}</h3>
        `;
        document.querySelector("section").appendChild(theBook);
    })
};

function updateStats() {
    let counter = 0;
    document.querySelectorAll(".stats h3 span")[0].textContent = myLibarary.length;
    for(let i = 0; i < myLibarary.length; i++) {
        if(myLibarary[i].bookRead === "yes") {
            counter++;
        }
    }
    document.querySelectorAll(".stats h3 span")[1].textContent = counter;
    document.querySelectorAll(".stats h3 span")[2].textContent = myLibarary.length - counter;
};