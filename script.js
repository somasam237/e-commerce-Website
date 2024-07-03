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
//The following line of code to make sure that the script execute once the DOM HAS completely charged
document.addEventListener('DOMContentLoaded', () =>{
    const cart = [];
    const cartCount = document.querySelector('.quantity');
    const cartItemsContainer = document.querySelector('.listcart');
    const totalAmoutElement = document.querySelector('.total');

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
            cart.push(product);
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
});










const cartIcon = document.querySelector(".cart-icon")
//const cartItemsContainer = document.querySelector(".cart-items-container")
let quantity = document.querySelector('.total');
let body = document.querySelector('body');
let listcart = document.querySelector('.listcart');
let total = document.querySelector('.total');
let list = document.querySelector('.cart-items-container');
 cartIcon.onclick = function(){
    if(cartItemsContainer.style.right=="-100%"){
        cartItemsContainer.style.right="0";
    }
    else{
        cartItemsContainer.style.right="-100%";
    }
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




  /*for the carousel on the home page*/
/*
  function currentDiv(n) {
    showDivs(slideIndex = n);
  }
  function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("item");
    var dots = document.getElementsByClassName("thumb");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " w3-opacity-off";
  }*/

 

 