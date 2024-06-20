$(document).ready(function() {
  // Function to get URL parameters
  function getUrlParameter(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
      var results = regex.exec(location.search);
      return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Get the product ID from URL parameter
  var productId = getUrlParameter('id');
  var product;

  // Load products.json and check if product ID exists
  $.getJSON('../data/products.json', function(data) {
      product = data.find(product => product.id == productId);

      if (product) {
          // Set product details in the HTML
          $('#subcat').text('Home/' + product.type);
          $('#price').text("$ " + product.price);
          $('#title').text(product.name);
          $('#productDetails').text(product.description);
          $('#MainImg').attr('src', '../images/product/' + product.image + '.jpg');
          $('#MainImg').attr('alt', product.name);

          var showRelatdProductsElements = $('#showRelatdProducts');
          
          // Iterate through the filtered products and generate HTML
          data.forEach(productInit => {
              if (productInit.type == product.type && productInit.id !== product.id) {
                  let recommendProduct = `
                      <div class="product text-center col-lg-3 col-md-4 col-12">
                          <img class="img-fluid mb-3" src="../images/product/${productInit.image}.jpg" alt="${productInit.name}" style="height: 200px; object-fit: cover;">
                          <div class="star">
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                          </div>
                          <h5 class="p-name">${productInit.name}</h5>
                          <h4 class="p-price">$${productInit.price.toFixed(2)}</h4>
                          <button class="btn btn-primary buy-btn" data-id="${productInit.id}">Buy Now</button>
                      </div>
                  `;
                  showRelatdProductsElements.append(recommendProduct);
              }
          });

          // Setup event listener for adding to cart
          $('.buy-btn').click(function() {
              let thisNum = parseInt($('#quants').val());
              addToCart(product, thisNum);
          });
      } else {
          displayProductNotFound();
      }
  });

  function displayProductNotFound() {
      $('body').html(`
          <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
              <div style="text-align: center; font-family: Arial, sans-serif; max-width: 600px;">
                  <h1 style="font-size: 3em; color: #333;">Product Not Found</h1>
                  <p style="font-size: 1.2em; color: #666;">We're sorry, but the product you are looking for does not exist or is no longer available. Please check the product ID or browse our other products.</p>
                  <a href="shop.html" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Return to Shop</a>
              </div>
          </div>
      `);
  }

  function addToCart(product, quantity) {
      let cartItems = JSON.parse(localStorage.getItem('productsInCart')) || {};
      let productNumbers = parseInt(localStorage.getItem('cartNumbers')) || 0;
      let cartCost = parseFloat(localStorage.getItem('totalCost')) || 0;

      if (cartItems[product.id]) {
          cartItems[product.id].inCart += quantity;
      } else {
          product.inCart = quantity;
          cartItems[product.id] = product;
      }

      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      localStorage.setItem('cartNumbers', productNumbers + quantity);
      localStorage.setItem('totalCost', cartCost + (product.price * quantity));

      updateCartDisplay();
  }

  function updateCartDisplay() {
      let productNumbers = localStorage.getItem('cartNumbers');
      if (productNumbers) {
          document.querySelector('.nav-link span').textContent = productNumbers;
      }
  }

  // Load cart numbers on page load
  function onLoadCartNumbers() {
      updateCartDisplay();
  }

  onLoadCartNumbers();
});
