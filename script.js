document.addEventListener("DOMContentLoaded", () => {
    const bookList = document.getElementById("book-list");
    const genreFilter = document.getElementById("genre-filter");
    const searchInput = document.getElementById("search");
    const cartButton = document.getElementById("cart-button");
    const cart = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout");
    const clearCartButton = document.getElementById("clear-cart");
    const cartCount = document.getElementById("cart-count");
    
    let books = [];
    let cartData = [];
    
    async function fetchBooks() {
        try {
            const response = await fetch("data.json");
            books = await response.json();
            displayBooks(books);
            populateGenres();
        } catch (error) {
            console.error("Помилка завантаження книг:", error);
        }
    }
    
    function displayBooks(filteredBooks) {
        bookList.innerHTML = "";
        filteredBooks.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book");
            bookElement.innerHTML = `
                <h3>${book.title}</h3>
                <p>Автор: ${book.author}</p>
                <p>Жанр: ${book.genre}</p>
                <p>Ціна: ${book.price} грн</p>
                <button onclick="addToCart(${book.id})">Додати в кошик</button>
            `;
            bookList.appendChild(bookElement);
        });
    }
    
    function populateGenres() {
        const genres = [...new Set(books.map(book => book.genre))];
        genres.forEach(genre => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    }
    
    function addToCart(bookId) {
        const book = books.find(b => b.id === bookId);
        cartData.push(book);
        updateCart();
    }
    
    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        cartData.forEach(book => {
            const li = document.createElement("li");
            li.textContent = `${book.title} - ${book.price} грн`;
            cartItems.appendChild(li);
            total += book.price;
        });
        totalPrice.textContent = total;
        cartCount.textContent = cartData.length;
    }
    
    genreFilter.addEventListener("change", () => {
        const selectedGenre = genreFilter.value;
        const filteredBooks = selectedGenre === "all" ? books : books.filter(b => b.genre === selectedGenre);
        displayBooks(filteredBooks);
    });
    
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(b => b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query));
        displayBooks(filteredBooks);
    });
    
    cartButton.addEventListener("click", () => {
        cart.classList.toggle("hidden");
    });
    
    clearCartButton.addEventListener("click", () => {
        cartData = [];
        updateCart();
    });
    
    checkoutButton.addEventListener("click", () => {
        alert("Замовлення оформлено!");
        cartData = [];
        updateCart();
    });
    
    fetchBooks();
});

