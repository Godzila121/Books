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
    function displayBooks(bookArray) {
        bookList.innerHTML = "";
    
        bookArray.forEach(book => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book-card");
    
            bookCard.innerHTML = `
                <img src="${book.image}" alt="${book.title}" class="book-image">
                <h3>${book.title}</h3>
                <p><strong>Автор:</strong> ${book.author}</p>
                <p><strong>Жанр:</strong> ${book.genre}</p>
                <p><strong>Ціна:</strong> ${book.price} грн</p>
                <button class="add-to-cart" data-id="${book.id}">Додати в кошик</button>
            `;
    
            bookList.appendChild(bookCard);
        });
    
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (event) => {
                const bookId = parseInt(event.target.dataset.id);
                addToCart(bookId);
            });
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
        
        if (!book) {
            console.error("Книга не знайдена!", bookId);
            return;
        }
    
        cartData.push(book);
        console.log("Додано до кошика:", book);
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
    
        totalPrice.textContent = `Загальна сума: ${total} грн`;
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

//
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("loginModal");
    const openBtn = document.getElementById("openLogin");
    const closeBtn = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");
    const cartButton = document.getElementById("cart-button");
    const errorMessage = document.getElementById("errorMessage");
    const managementButton = document.getElementById("management"); 

    
    managementButton.style.display = "none";

    openBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            errorMessage.textContent = "Будь ласка, заповніть усі поля!";
            return;
        }

        if (username === "admin" && password === "1234") {

            openBtn.textContent = "Профіль";
            managementButton.style.display = "inline-block";
            modal.style.display = "none";
        }else if (username === "user" && password === "1234") {
            openBtn.textContent = "Профіль";
            managementButton.style.display = "none"; 
            modal.style.display = "none";
            localStorage.setItem("userRole", "user"); 
        }else {
            errorMessage.textContent = "Невірний логін або пароль!";
        }
    });

    managementButton.addEventListener("click", function () {
        window.location.href = "indexbooks.html";
    });
});



