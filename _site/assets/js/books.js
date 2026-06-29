const myBooks = {
    currentlyReading: [
        {
            title: "Book Title",
            author: "Author Name",
            cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/...",
            link: "https://app.thestorygraph.com/books/..."
        }
    ],
    recentlyRead: [
        {
            title: "Another Book",
            author: "Another Author",
            cover: "https://...",
            link: "https://..."
        },
        {
            title: "Third Book",
            author: "Third Author",
            cover: "https://...",
            link: "https://..."
        }
    ]
};

function displayBookSection(books, containerId, limit = null) {
    const container = document.getElementById(containerId);
    const booksToShow = limit ? books.slice(0, limit) : books;
    
    container.innerHTML = booksToShow.map(book => `
        <div style="display: grid; grid-template-columns: auto 1fr; gap: 15px; margin-bottom: 15px;">
            <img src="${book.cover}" style="width: 120px; height: auto;">
            <div>
                <a href="${book.link}" target="_blank" style="font-weight: bold;">${book.title}</a>
                <div style="font-size: 16px; margin-top: 5px;">${book.author}</div>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', function() {
    displayBookSection(myBooks.currentlyReading, 'books-current');
    displayBookSection(myBooks.recentlyRead, 'books-recent', 3);
});