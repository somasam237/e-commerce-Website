// i want the first video on the carousel to beginn at minut 52
const homeVideo = document.getElementById("homeVideo");
if (homeVideo) {
    homeVideo.currentTime = 62;
}

const searchIcon = document.querySelector(".search-icon");
const searchForm = document.querySelector(".search-from");

// Only run search functionality if elements exist
if (searchIcon && searchForm) {
    searchForm.style.right = "-250px";
    searchIcon.onclick = function(){
        if(searchForm.style.right == "-250px"){
            searchForm.style.right = "0";
        }
        else{
            searchForm.style.right = "-250px";
        }
    }
}

/* the code javscript for the carousel at the home page*/
const carousel = document.querySelector(".carousel");
const items = document.querySelector(".carousel .list .item");

// Only run carousel if elements exist
if (carousel && items) {
    const totalItems = items.length;
    let index = 0;
    const interval = 1000;
    
    function showNext(){
        index = (index + 1) % totalItems;
        carousel.scrollTo({
            left: index * carousel.clientWidth, 
            behavior: "smooth"
        });
    }
    
    setInterval(showNext, interval);
}

/*for the resppnsive part, i need that when the user click on the menu icon, 
it showcase the navbar*/
const menuIcon = document.getElementById("imgMenu");
const navbar = document.querySelector(".navbar");
const contenu = document.querySelector(".contains");

// Only run mobile menu if elements exist
if (menuIcon && navbar) {
    menuIcon.onclick = function(){
        if(navbar.style.display == "none"){
            navbar.style.display = "grid";
        }
        else{
            navbar.style.display = "none";
        }
    }
}

if (contenu && navbar) {
    contenu.onclick = function(){
        if (navbar.style.display == "grid"){
            navbar.style.display = "none";
        }
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
        
        // Check if required elements exist
        if (!this.cartIcon || !this.cartContainer || !this.cartList || !this.cartTotal || !this.cartCount) {
            console.error('Cart elements not found in DOM');
            return;
        }
        
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
        if (!productElement) {
            console.error('Product element not found');
            return;
        }

        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-name');
        const productPrice = parseFloat(productElement.getAttribute('data-price'));
        const productImage = productElement.querySelector('img')?.src || '';

        if (!productId || !productName || !productPrice) {
            console.error('Product data missing');
            return;
        }

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
    new AuthUI();
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