document.addEventListener("DOMContentLoaded", function() {
    // Load the header content from the external HTML file
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../pages/header.html', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Insert the header content into the placeholder div
            document.getElementById('header-placeholder').innerHTML = xhr.responseText;

            // After loading the header, check the authentication status and update UI
            checkAuthStatus();
            setActiveLink();
            onLoadCartNumbers();
        } else if (xhr.status === 404) {
            var xhrNew = new XMLHttpRequest();
            xhrNew.open('GET', '/furnitureEcommerce/pages/header.html', true);
            xhrNew.onreadystatechange = function () {
                if (xhrNew.readyState === 4 && xhrNew.status === 200) {
                    document.getElementById('header-placeholder').innerHTML = xhrNew.responseText;
                    checkAuthStatus();
                    setActiveLink();
                    onLoadCartNumbers();
                }
            }
            xhrNew.send();
        }
    };
    xhr.send();
});

document.addEventListener("DOMContentLoaded", function() {
    var xhrFooter = new XMLHttpRequest();
    xhrFooter.open('GET', '../pages/footer.html', true);
    xhrFooter.onreadystatechange = function () {
        if (xhrFooter.readyState === 4 && xhrFooter.status === 200) {
            document.getElementById('footer-placeholder').innerHTML = xhrFooter.responseText;
        } else if (xhrFooter.status === 404) {
            var xhrNew = new XMLHttpRequest();
            xhrNew.open('GET', '/furnitureEcommerce/pages/footer.html', true);
            xhrNew.onreadystatechange = function () {
                if (xhrNew.readyState === 4 && xhrNew.status === 200) {
                    document.getElementById('footer-placeholder').innerHTML = xhrFooter.responseText;
                }
            }
            xhrNew.send();
        }
    };
    xhrFooter.send();
});


// Check the authentication status and update the UI accordingly
function checkAuthStatus() {
    var userData = localStorage.getItem('loggedInUser');
    var isAuthenticated = false;
    var userFullName = '';

    if (userData) {
        try {
            var user = JSON.parse(userData);
            isAuthenticated = true;
            userFullName = user.fullName || 'User';
        } catch (error) {
            console.error('Error parsing user data from local storage:', error);
        }
    }

    var loginTrue = document.getElementById('loginTrue');
    var loginFalse = document.getElementById('loginFalse');
    var greeting = document.getElementById('greeting');
    var signOut = document.getElementById('signOut');

    if (isAuthenticated) {
        debugger;
        if (isAuthenticated) loginTrue.style.display = 'block';
        if (isAuthenticated) loginFalse.style.display = 'none';
        if (isAuthenticated) greeting.innerText = `Hello, ${userFullName}`;
    } else {
        debugger;
        if (isAuthenticated) loginTrue.style.display = 'none';
        if (isAuthenticated) loginFalse.style.display = 'block';
    }

    // Sign out event listener
    if (signOut) {
        signOut.addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            window.location.href = "../pages/main.html";
        });
    }
}

// Set the active navigation link based on the current URL
function setActiveLink() {
    var currentPage = window.location.pathname.split("/").pop();
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(function(link) {
        var href = link.getAttribute('href').split("/").pop();
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load and display the number of items in the cart
function onLoadCartNumbers() {
    updateCartDisplay();
}

// Update the cart display with the number of items
function updateCartDisplay() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        let cartNumberElement = document.querySelector('.cart-count');
        if (cartNumberElement) {
            cartNumberElement.textContent = `(${productNumbers})`;
        } else {
            onLoadCartNumbers();
        }
    }
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

window.onload = function () {
    jQuery('body .buy-btn').click(function(){jQuery('.toast').toast('show');});
    
}


