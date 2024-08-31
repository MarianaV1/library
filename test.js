const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const libraryDiv = document.getElementById('library');
    libraryDiv.innerHTML = ''; // Clear the current display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.read ? 'Yes' : 'No'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
        `;

        libraryDiv.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    displayBooks();
}

document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('book-form').style.display = 'block';
});

document.getElementById('book-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    document.getElementById('book-form').reset();
    document.getElementById('book-form').style.display = 'none';
});

// Manually add a few books for testing
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));

