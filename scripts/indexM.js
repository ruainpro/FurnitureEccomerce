// indexM.js

// Example products array from products.js
// ...

let carts = document.querySelectorAll('.buy-btn');
let setFromDelete = false;
let setFromlowQ = false;

// products.js
// products.js
// let products = loadProductsWithFetch();
$(document).ready(function() {
    // Fetch products data
     $.getJSON('../data/products.json', function(data) {
        products = data;
    });
});    


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        let spanToCheck = document.querySelector('.nav-item span');
        if (spanToCheck) {
            spanToCheck.textContent = productNumbers;

        }
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.nav-item span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.nav-item span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            };
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = localStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    if (cartCost != null) {
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class="fas fa-window-close" onClick="deleteItem(this.parentElement)"></i>
                <img class="w-25 h-100 m-2" src="images/rt/${item.tag}.jpg">
                <span class="nameHere">${item.name}</span>
                <div class="price">
                    $${item.price}
                </div>
                <div class="quantity">
                    <i class="fas fa-chevron-circle-left" onClick="lowQ(this.parentElement.parentElement)"></i>
                    <span class="cartVal">${item.inCart}</span>
                    <i class="fas fa-chevron-circle-right" onClick="highQ(this.parentElement.parentElement)"></i>
                </div>
                <div class="total">
                    $${item.inCart * item.price}.00
                </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total:
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
            </div>
        `;

        productContainer.innerHTML += `
        <div class="AC">
            <button type="submit" onclick="allClear()">Clear</button>
        </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();

// Function to load products and return as an array using Fetch API
function loadProductsWithFetch() {
    return fetch('../data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse and return the JSON data
        })
        .catch(error => {
            console.error('Fetch error:', error);
            return []; // Return an empty array in case of an error
        });
}