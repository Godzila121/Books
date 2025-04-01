document.addEventListener("DOMContentLoaded", function() {
    // Функція для завантаження книг з JSON файлу
    fetch('data.json')
        .then(response => response.json())
        .then(books => {
            const bookList = document.getElementById('book-list');
            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.classList.add('book');

                bookElement.innerHTML = `
                    <img src="${book.image}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p>Автор: ${book.author}</p>
                    <p class="price">${book.price}</p>
                `;

                bookList.appendChild(bookElement);
            });
        })
        .catch(error => console.error('Error loading books:', error));

        document.addEventListener("DOMContentLoaded", function () {
            const backButton = document.getElementById("backButton");
            if (backButton) {
                backButton.addEventListener("click", function () {
                    window.location.href = "index.html";
                });
            }
        });
        
});
