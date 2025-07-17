// i want the first video on the carousel to beginn at minut 52
document.getElementById("homeVideo").currentTime =62;
const searchIcon = document.querySelector(".search-icon")
const searchForm = document.querySelector(".search-from")
/*searchIcon.addEventListener( "click",() => 
    {  if(searchIcon.computedStyleMap.)
        searchForm.classList.add("active"); 
});*/

searchForm.style.right ="-250px";
searchIcon.onclick = function(){
    if(searchForm.style.right=="-250px"){
        searchForm.style.right="0";
    }
    else{
        searchForm.style.right = "-250px";
    }
}
/* the code javscript for the carousel at the home page*/

const carousel = document.querySelector(".carousel ");
const items = document.querySelector(".carousel .list .item");
const totalItems = items.length;
let index = 0;
const interval = 1000;
function showNext(){
    index = (index +1)% totalItems;
    carousel.scrollTo({
        left:index* carousel.clientWidth, behavior: "smooth"
    });
}

setInterval(showNext, interval);
 
// when clicking on the carticon it shall appear!
const cartIcon = document.querySelector(".cart-icon")
//const cartItemsContainer = document.querySelector(".cart-items-container")
let quantity = document.querySelector('.total');
let body = document.querySelector('body');
let listcart = document.querySelector('.listcart');
let total = document.querySelector('.total');
let list = document.querySelector('.cart-items-container');

//The following line of code to make sure that the script execute once the DOM HAS completely charged
 
    const cart = [];
    const cartCount = document.querySelector('.quantity');
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const totalAmoutElement = document.querySelector('.total');
    cartIcon.onclick = function(){
        if(cartItemsContainer.style.right=="-500px"){
            cartItemsContainer.style.right="0px";
        }
        else{
            cartItemsContainer.style.right="-500px";
        }
     }
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };

            addToCart(product);
        });
    });

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
            //cart.push(product);
        }
        updateCartUI();
    }

    function updateCartUI() {
        cartCountElement.textContent = cart.reduce((total, product) => total + product.quantity, 0);
        cartItemsContainer.innerHTML = '';
        cart.forEach(product => {
            const cartItemElement = document.createElement('li');
            cartItemElement.textContent = `${product.name} - ${product.quantity} x ${product.price}€`;
            cartItemsContainer.appendChild(cartItemElement);
        });
        totalAmoutElement.textContent = cart.reduce((total, product) => total + product.quantity * product.price, 0).toFixed(2);
    }











 /* to add an item in the cart */
 /*let products = [
    {id: 1,
        name: 'prduct',
        image: ' ',
        price: 123
},
{id: 1,
    name: 'prduct',
    image: ' ',
    price: 123
},
{id: 1,
    name: 'prduct',
    image: ' ',
    price: 123
},
{id: 1,
    name: 'prduct',
    image: ' ',
    price: 123
}
]

let listcarts = [];

function initApp(){
    products.forEach((value, key) => {
        let newdiv = document.createElement('div');
        newdiv.classList.add('item');
        newdiv.innerHTML ='<img src="image/${value.image}"/>  <div class= "title">${value.name} </div> <div class= "price">${value.price.toLocaleString()} </div> <button onclick="addToCard(${key})"> AJouter aux Panier</button>';
        list.appenchild(newdiv);
    })
}

initApp();
function addToCard(key){
    if(listcarts[key] == null){
        listcarts[key] = products[key];
        listcarts[key].quantity = 1;
    }
    reloadcard();
}
function reloadcard(){
    listcart.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listcarts.forEach((value, key) => {
        totalPrice += value.price;
        count = count +value.quantity;
        if(value != null){
            let newdiv = document.createElement('li');
            newdiv.innerHTML='<div> <img src="image/${value.image}"/> </div> <div> ${value.image} </div>    <div>${value.name}  </div> <div>${value.price.toLocaleString()} </div>   <div>${value.quantity}</div> <div> <button onclick="changeQuantity(${key}, ${value.quantity -1})">  '
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}
 
 /*
cartIcon.addEventListener( "click",() => 
    {cartItemsContainer.classList.add("active");
    
})
cartIcon.addEventListener( "unclick",() => 
{ cartItemsContainer.classList.remove("active");  });

const bar= document.getElementById('bar');
const nav = document.getElementById('navbar');
if(bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active');
    })
}*/
/*for the resppnsive part, i need that when the user click on the menu icon, 
it showcase the navbar*/
const menuIcon = document.getElementById("imgMenu");
const navbar= document.querySelector(".navbar");
const contenu= document.querySelector(".contains");
menuIcon.onclick= function(){
    if(navbar.style.display=="none"){
        navbar.style.display="grid";
    }
    else{
        navbar.style.display="none";
    }
   
}
contenu.onclick= function(){
    if ( navbar.style.display=="grid"){
        navbar.style.display="none";
    }
}

/* Shopping Cart Functionality */
class ShoppingCart {
    constructor() {
        this.cart = this.loadCart();
        this.cartIcon = document.querySelector(".cart-icon");
        this.cartContainer = document.querySelector(".cart-items-container");
        this.cartList = document.querySelector(".listcart");
        this.cartTotal = document.querySelector(".total");
        this.cartCount = document.querySelector(".quantity");
        this.closeCartBtn = document.querySelector(".close-cart");
        this.clearCartBtn = document.querySelector(".clear-cart");
        
        this.init();
    }

    init() {
        // Toggle cart visibility
        this.cartIcon.onclick = () => this.toggleCart();
        if (this.closeCartBtn) {
            this.closeCartBtn.onclick = () => this.hideCart();
        }
        if (this.clearCartBtn) {
            this.clearCartBtn.onclick = () => this.clearCart();
        }

        // Add event listeners to all add-to-cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.addToCart(button);
            });
        });

        // Initial UI update
        this.updateCartUI();
    }

    toggleCart() {
        const isVisible = this.cartContainer.style.right === "0px";
        this.cartContainer.style.right = isVisible ? "-500px" : "0px";
    }

    hideCart() {
        this.cartContainer.style.right = "-500px";
    }

    addToCart(button) {
        const productElement = button.closest('.cake-card');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));
        const productImage = productElement.querySelector('img').src;

        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        const existingProduct = this.cart.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            this.cart.push(product);
        }

        this.saveCart();
        this.updateCartUI();
        this.showAddedMessage(product.name);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
    }

    updateQuantity(productId, newQuantity) {
        const product = this.cart.find(item => item.id === productId);
        if (product) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                product.quantity = newQuantity;
                this.saveCart();
                this.updateCartUI();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
    }

    updateCartUI() {
        // Update cart count
        const totalItems = this.cart.reduce((total, item) => total + item.quantity, 0);
        this.cartCount.textContent = totalItems;

        // Update cart items list
        this.cartList.innerHTML = '';
        
        if (this.cart.length === 0) {
            this.cartList.innerHTML = '<li class="empty-cart">Your cart is empty</li>';
            this.cartTotal.textContent = '0.00';
            return;
        }

        this.cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-btn" data-id="${item.id}">×</button>
                </div>
            `;
            this.cartList.appendChild(cartItem);
        });

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                const product = this.cart.find(item => item.id === productId);
                
                if (e.target.classList.contains('plus')) {
                    this.updateQuantity(productId, product.quantity + 1);
                } else if (e.target.classList.contains('minus')) {
                    this.updateQuantity(productId, product.quantity - 1);
                }
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-id');
                this.removeFromCart(productId);
            });
        });

        // Update total
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotal.textContent = total.toFixed(2);
    }

    showAddedMessage(productName) {
        // Simple notification - you can enhance this
        const message = document.createElement('div');
        message.className = 'cart-notification';
        message.textContent = `${productName} added to cart!`;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 2000);
    }

    saveCart() {
        localStorage.setItem('delycious_cart', JSON.stringify(this.cart));
    }

    loadCart() {
        const saved = localStorage.getItem('delycious_cart');
        return saved ? JSON.parse(saved) : [];
    }
}

/* the method autoResize is used to resize the textarea automatically in the footer*/
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
 
// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});

// Authentication Management
class AuthUI {
    constructor() {
        this.userIcon = document.getElementById('userIcon');
        this.userInfo = document.getElementById('userInfo');
        this.loginPrompt = document.getElementById('loginPrompt');
        this.usernameSpan = document.getElementById('username');
        
        this.init();
    }

    init() {
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        if (token && user) {
            this.showLoggedInState(JSON.parse(user));
        } else {
            this.showLoggedOutState();
        }
    }

    showLoggedInState(user) {
        if (this.userInfo && this.loginPrompt && this.usernameSpan) {
            this.userInfo.style.display = 'block';
            this.loginPrompt.style.display = 'none';
            this.usernameSpan.textContent = user.username;
        }
    }

    showLoggedOutState() {
        if (this.userInfo && this.loginPrompt) {
            this.userInfo.style.display = 'none';
            this.loginPrompt.style.display = 'block';
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('You have been logged out');
    location.reload(); // Refresh page to update UI
}

// Initialize auth UI when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AuthUI();
    /*for the carousel on the home page*/
});