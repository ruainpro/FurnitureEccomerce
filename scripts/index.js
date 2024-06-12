let products = []; // Global products array

$(document).ready(function() {
    // Fetch products data
    $.getJSON('../data/products.json', function(data) {
        products = data;

        // Now call your display functions
        displayProducts({
            containerSelector: '#featured-products',
            filterCriteria: product => product.featured,
            sortFunction: sortByDate,
            limit: 4
        });

        displayProducts({
            containerSelector: '#twotypesOfProduct',
            filterCriteria: product => product.type === 'Living Room',
            shuffle: true,
            limit: 2
        });
        displayProducts({
            containerSelector: '#twotypesOfProduct',
            filterCriteria: product => product.type === 'Bedroom',
            shuffle: true,
            limit: 2
        });

        displayProducts({
            containerSelector: '#furnitureProducts',
            filterCriteria: product => product.type === 'Office',
            shuffle: true,
            limit: 4
        });

        displayProducts({
            containerSelector: '#latestProduct',
            filterCriteria: () => true, // No specific filter, fetch all products
            sortFunction: sortByDate,
            limit: 4
        });

    }).fail(function(jqxhr, textStatus, error) {
        let err = textStatus + ", " + error;
        console.error("Request Failed: " + err);
    });

    // Event listener for "Buy Now" buttons
    $(document).on('click', '.buy-btn', function() {
        let productId = $(this).data('id');
        let product = products.find(p => p.id === productId);
        if (product) {
            cartNumbers(product);
            totalCost(product);
        } else {
            console.error('Product not found');
        }
    });
});

// Function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to sort products by date in descending order
function sortByDate(productsArray) {
    return productsArray.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generalized function to display products
function displayProducts({ containerSelector, filterCriteria, sortFunction, shuffle, limit }) {
    if (!Array.isArray(products)) {
        console.error("Products is not an array:", products);
        return;
    }

    let container = $(containerSelector);
    let filteredProducts = products.filter(filterCriteria);

    if (sortFunction) {
        filteredProducts = sortFunction(filteredProducts);
    }

    if (shuffle) {
        filteredProducts = shuffleArray(filteredProducts);
    }

    let selectedProducts = filteredProducts.slice(0, limit);

    $.each(selectedProducts, function(index, product) {
        let productCard = `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="product text-center">
                    <a href="sproduct.html?id=${product.id}"><img class="img-fluid mb-3" src="../images/product/${product.image}.jpg" alt="${product.name}" style="height: 200px; object-fit: cover;"> </a>
                    <div class="star mb-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <h5 class="p-name">${product.name}</h5>
                    <h4 class="p-price">$${product.price.toFixed(2)}</h4>
                    <button class="btn btn-primary buy-btn" data-id="${product.id}">Buy Now</button>
                </div>
            </div>
        `;
        container.append(productCard);
    });
}
