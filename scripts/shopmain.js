let products = []; // Global products array
let productsPerPage = 6; // Number of products per page
let currentPage = 1; // Current page number

$(document).ready(function() {
    // Load products from JSON and initialize display
    $.getJSON('../data/products.json')
        .done(function(data) {
            products = data;
            applyFilters(); // Initial display
        })
        .fail(function() {
            console.error("Error loading products data.");
        });

    // Search and filter products
    $('#searchInput, #categoryFilter, #priceFilter').on('input change', function() {
        currentPage = 1; // Reset to first page
        applyFilters();
    });

    // Apply search, filter, and pagination
    function applyFilters() {
        let filteredProducts = products.filter(product => {
            let matchesSearch = $('#searchInput').val().trim().toLowerCase() === '' || 
                product.name.toLowerCase().includes($('#searchInput').val().trim().toLowerCase());
            let matchesCategory = $('#categoryFilter').val() === '' || 
                product.type === $('#categoryFilter').val();
            let matchesPrice = $('#priceFilter').val() === '' || (
                product.price >= parseInt($('#priceFilter').val().split('-')[0]) &&
                product.price <= parseInt($('#priceFilter').val().split('-')[1])
            );
            return matchesSearch && matchesCategory && matchesPrice;
        });

        renderPagination(filteredProducts.length); // Render pagination
        renderProducts(filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)); // Display current page products
    }

    // Render products
    function renderProducts(productsToShow) {
        $('#product-list').empty(); // Clear current products
        productsToShow.forEach(product => {
            let productCard = `
                <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div class="product text-center">
                        <img class="img-fluid mb-3" src="../images/product/${product.image}.jpg" alt="${product.name}" style="height: 200px; object-fit: cover;">
                        <div class="star mb-2">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                        </div>
                        <h5 class="p-name">${product.name}</h5>
                        <h4 class="p-price">$${product.price.toFixed(2)}</h4>
                        <a href="sproduct.html?id=${product.id}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            `;
            $('#product-list').append(productCard);
        });
    }

    // Render pagination
    function renderPagination(totalProducts) {
        let totalPages = Math.ceil(totalProducts / productsPerPage);
        $('#pagination').empty();
        for (let i = 1; i <= totalPages; i++) {
            $('#pagination').append(`
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#">${i}</a>
                </li>
            `);
        }
    }

    // Handle pagination click
    $(document).on('click', '#pagination a', function(e) {
        e.preventDefault();
        currentPage = parseInt($(this).text());
        applyFilters();
    });

    // Event listener for "Buy Now" buttons (example function)
    $(document).on('click', '.buy-btn', function() {
        let productId = $(this).data('id');
        let product = products.find(p => p.id === productId);
        if (product) {
            // Add to cart logic (e.g., cartNumbers(product), totalCost(product))
            console.log('Product added to cart:', product);
            showCartToast(); // Show toast notification
        } else {
            console.error('Product not found');
        }
    });

    // Show toast notification for adding to cart
    function showCartToast() {
        $('#cartToast').toast({
            delay: 1000
        });
        $('#cartToast').toast('show');
    }
});
