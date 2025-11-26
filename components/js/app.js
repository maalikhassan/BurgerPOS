// // Simple SPA Router & Menu Toggle
// document.addEventListener('DOMContentLoaded', () => {
//     const menuToggle = document.getElementById('menuToggle');
//     const navMenu = document.getElementById('navMenu');
//     const navLinks = document.querySelectorAll('.nav-link');

//     // Mobile menu toggle
//     menuToggle.addEventListener('click', () => {
//         navMenu.classList.toggle('active');
//     });

//     // Close menu when link is clicked
//     navLinks.forEach(link => {
//         link.addEventListener('click', (e) => {
//             navMenu.classList.remove('active');

//             // Handle navigation
//             const page = link.getAttribute('data-page');
//             loadPage(page);

//             // Update active state
//             navLinks.forEach(l => l.classList.remove('active'));
//             link.classList.add('active');
//         });
//     });
// });

// // Load pages dynamically
// function loadPage(page) {
//     const appDiv = document.getElementById('app');

//     const pages = {
//         home: '<h1>Welcome to BurgerPOS 🍔</h1><p>Your favorite burger delivery system.</p>',
//         shop: '<h1>Shop</h1><p>Browse our menu here.</p>',
//         cart: '<h1>Shopping Cart</h1><p>Your cart items will appear here.</p>',
//         login: '<h1>Login</h1><p>Sign in to your account.</p>'
//     };

//     appDiv.innerHTML = pages[page] || pages.home;
// }

// // Initialize with home page
// loadPage('home');
function loadLogin() {
  fetch("components/login/login.html") //relative path
    .then((Response) => Response.text()) //take incoming response and convert to text
    .then((data) => {
      //response output putting into variable called data
      document.getElementById("app").innerHTML = data; //setting that data into the space in the index called "app"
    });
}

function loadHome() {
    fetch("components/home/home.html").then((Response)=> Response.text()).then((data)=>{document.getElementById("app").innerHTML=data;})
}

function loadSignUp(){
    fetch("components/register/register.html").then((Response)=> Response.text()).then((data)=>{document.getElementById("app").innerHTML=data;})
}
function loadShop(){
    fetch("components/shop/shop.html").then((Response)=> Response.text()).then((data)=>{document.getElementById("app").innerHTML=data;})
}
function loadCart(){
    fetch("components/cart/cart.html").then((Response)=> Response.text()).then((data)=>{document.getElementById("app").innerHTML=data;})
}


