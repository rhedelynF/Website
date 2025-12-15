const products = [
    {
        id: 1,
        name: "Canon EOS R50",
        price: 38995,
        image: "images/Canon-eos-r50.png"
    },
    {
        id: 2,
        name: "Canon EOS R10",
        price: 58995,
        image: "images/Canon-eos-r10.png"
    },
    {
        id: 3,
        name: "Canon EOS R6 Mark II",
        price: 159995,
        image: "images/Canon-eos-r6-mark-II.png"
    }
];

const cart = [];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartIcon = document.getElementById("cartIcon");
const cartSection = document.getElementById("cartSection");

cartIcon.addEventListener("click", function (e) {
    e.preventDefault();
    cartSection.classList.toggle("hidden");
});


function displayProducts() {
    productList.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₱${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>

        `;

        productList.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>No items in cart</p>";
        totalPrice.textContent = "Total: ₱0";
        return;
    }

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <span>${item.name}</span>
            <div class="qty-controls">
            <button onclick="decreaseQty(${item.id})">−</button>
            <span>${item.quantity}</span>
            <button onclick="increaseQty(${item.id})">+</button>
            </div>
        `;

        cartItems.appendChild(div);
    });

    totalPrice.textContent = `Total: ₱${total.toLocaleString()}`;
}

function increaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

function decreaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity--;
        if (item.quantity === 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}


function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    updateCart();
}

const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let summary = "Order Summary:\n\n";
    let total = 0;

    cart.forEach(item => {
        summary += `${item.name} x${item.quantity} = ₱${(item.price * item.quantity).toLocaleString()}\n`;
        total += item.price * item.quantity;
    });

    summary += `\nTotal: ₱${total.toLocaleString()}`;
    alert(summary);

    cart.length = 0;
    updateCart();
});


displayProducts();

