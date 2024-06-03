const searchBar = document.getElementById('searchBar');
let carts = document.querySelectorAll('.buy-btn');

let products = []

$.getJSON('../data/products.json')
.done(function(data) {
    products = data;
    // applyFilters(); // Initial display
})
.fail(function() {
    console.error("Error loading products data.");
});

filteredList = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);

    const filteredCharacters = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchString)
        );
    });
    // console.log(typeof filteredCharacters, filteredCharacters);
     filteredList.push(Object.values(filteredCharacters));
    displayCart(filteredCharacters);
});

// function displayCart(product){
//     console.log(product);
//     let productContainer = document.querySelector(".products");
//         productContainer.innerHTML = '';
//         Object.values(product).map(item =>{
//             console.log(product.image)
//             productContainer.innerHTML += `
//             <div class="product">
//                 <button class="buy-btn" onclick="doThis(this.parentElement)">Add to Cart</button>
//                 <img class="w-25 h-100 m-2" src="../images/product/${product.image}">
//                 <span class="nameHere">${item.name}</span>
            

//             <div class="price">
//                 $${item.price}
//             </div>

//             </div>
//             `
//         });
// }

function displayCart(product){
    console.log(product);
    let productContainer = document.querySelector(".products");
    productContainer.innerHTML = '';
    Object.values(product).map(item =>{
        console.log(item.image) // Correct reference to image property
        productContainer.innerHTML += `
            <div class="product">
                <button class="buy-btn" onclick="doThis(this.parentElement)">Add to Cart</button>
                <img class="w-25 h-100 m-2" src="../images/product/${item.image}.jpg">
                <span class="nameHere">${item.name}</span>
                <div class="price">
                   <b> $${item.price} </b>
                </div>
            </div>
        `;
    });
}


function doThis(product){
    console.log(filteredList);
    newList = filteredList[filteredList.length-1];
    console.log(newList);
    console.log(product);

    for (var i = 0; i < product.childNodes.length; i++) {
        for(var j=0; j<newList.length; j++){
            //console.log(product.childNodes);
            if(product.childNodes[i].className == "nameHere"){
                if(product.childNodes[i].textContent == newList[j].name){
                console.log(product.childNodes[i].textContent);
                cartNumbers(newList[j]);
                totalCost(newList[j]);    
                }
            }
        }
    } 
    
    $('#itemAddedModal').modal('show');

    // Hide the modal after 2-3 seconds
    setTimeout(function() {
        $('#itemAddedModal').modal('hide');
    }, 2500); // 2500 milliseconds = 2.5 seconds       
    
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.nav-item span').textContent = productNumbers;
    }
}

function cartNumbers(product){

        //console.log("The product is ", product);
        let productNumbers = localStorage.getItem('cartNumbers');

        productNumbers = parseInt(productNumbers);

        if(productNumbers){
            localStorage.setItem('cartNumbers', productNumbers + 1);
            document.querySelector('.nav-item span').textContent = productNumbers + 1;
        }else{
            localStorage.setItem('cartNumbers',1);
            document.querySelector('.nav-item span').textContent = 1;
        }

        setItems(product);
    
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag]==undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1;
        
    }else{
        product.inCart = 1;
        
        cartItems={
            [product.tag]:product
        };
    }
    localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost =  localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    }else{
        localStorage.setItem("totalCost",product.price * product.inCart);
    }

    console.log("my cartcost", cartCost);
}


onLoadCartNumbers();
//displayCart();