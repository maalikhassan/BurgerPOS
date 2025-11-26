// FashionRack POS - Simple Data Storage
let products = [
    { id: 1, name: 'Basic T-Shirt', price: 15.99, category: 'shirts' },
    { id: 2, name: 'Premium T-Shirt', price: 24.99, category: 'shirts' },
    { id: 3, name: 'Casual Jeans', price: 39.99, category: 'pants' },
    { id: 4, name: 'Formal Pants', price: 49.99, category: 'pants' },
    { id: 5, name: 'Cotton Cap', price: 12.99, category: 'accessories' },
    { id: 6, name: 'Leather Belt', price: 19.99, category: 'accessories' }
];

let customers = [
    { id: 1, name: 'John Doe', email: 'john@email.com', phone: '123-456-7890' }
];

let cart = [];
let orders = [];
let nextOrderId = 1001;

// Show/Hide Sections
function showProducts() {
    showSection('productsSection');
    displayProducts('shirts');
}

function showCart() {
    showSection('cartSection');
    displayCart();
}

function showCustomers() {
    showSection('customersSection');
    displayCustomers();
}

function showOrders() {
    showSection('ordersSection');
    displayOrders();
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
}

// PRODUCTS CRUD
function filterCategory(category) {
    displayProducts(category);
}

function displayProducts(category) {
    const productsList = document.getElementById('productsList');
    productsList.innerHTML = '';
    
    let filtered = products.filter(p => p.category === category);
    
    filtered.forEach(product => {
        productsList.innerHTML += `
            <div class="product-card">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function addProduct() {
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value.toLowerCase();
    
    if (name && price && category !== 'select category') {
        const newProduct = {
            id: products.length + 1,
            name: name,
            price: price,
            category: category
        };
        products.push(newProduct);
        
        // Clear form
        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productCategory').value = 'Select Category';
        
        alert('Product added successfully!');
        displayProducts(category);
    }
}

// CART FUNCTIONS
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(c => c.id === productId);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    alert(`${product.name} added to cart!`);
}

function displayCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const total = (item.price * item.quantity).toFixed(2);
        cartItems.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)"></td>
                <td>$${total}</td>
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });
    
    calculateTotal();
}

function updateQuantity(productId, newQty) {
    const cartItem = cart.find(c => c.id === productId);
    if (cartItem) {
        cartItem.quantity = parseInt(newQty);
        displayCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(c => c.id !== productId);
    displayCart();
}

function calculateTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const discount = parseFloat(document.getElementById('discountPercent').value) || 0;
    const discountAmount = (subtotal * discount / 100).toFixed(2);
    const total = (subtotal - discountAmount).toFixed(2);
    
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('discountAmount').innerText = discountAmount;
    document.getElementById('total').innerText = total;
}

function generateReceipt() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    let subtotal = 0;
    let receiptText = '=== FASHIONRACK POS RECEIPT ===\n\n';
    
    cart.forEach(item => {
        const total = item.price * item.quantity;
        subtotal += total;
        receiptText += `${item.name} x${item.quantity} = $${total.toFixed(2)}\n`;
    });
    
    const discount = parseFloat(document.getElementById('discountPercent').value) || 0;
    const discountAmount = subtotal * discount / 100;
    const finalTotal = subtotal - discountAmount;
    
    receiptText += `\n-----------------\n`;
    receiptText += `Subtotal: $${subtotal.toFixed(2)}\n`;
    receiptText += `Discount (${discount}%): -$${discountAmount.toFixed(2)}\n`;
    receiptText += `TOTAL: $${finalTotal.toFixed(2)}\n`;
    receiptText += `\nThank you for your purchase!\n`;
    
    // Save order
    orders.push({
        id: nextOrderId++,
        customer: 'Walk-in Customer',
        total: finalTotal.toFixed(2),
        date: new Date().toLocaleDateString(),
        items: [...cart]
    });
    
    // Show receipt
    alert(receiptText);
    
    // Clear cart
    cart = [];
    document.getElementById('discountPercent').value = 0;
    displayCart();
}

// CUSTOMERS CRUD
function addCustomer() {
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const phone = document.getElementById('customerPhone').value;
    
    if (name && email && phone) {
        customers.push({
            id: customers.length + 1,
            name: name,
            email: email,
            phone: phone
        });
        
        document.getElementById('customerName').value = '';
        document.getElementById('customerEmail').value = '';
        document.getElementById('customerPhone').value = '';
        
        alert('Customer added successfully!');
        displayCustomers();
    }
}

function displayCustomers() {
    const customersList = document.getElementById('customersList');
    customersList.innerHTML = '';
    
    customers.forEach(customer => {
        customersList.innerHTML += `
            <tr>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td><button onclick="deleteCustomer(${customer.id})">Delete</button></td>
            </tr>
        `;
    });
}

function deleteCustomer(customerId) {
    customers = customers.filter(c => c.id !== customerId);
    displayCustomers();
}

// ORDERS VIEW
function displayOrders() {
    const ordersList = document.getElementById('ordersList');
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        ordersList.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>$${order.total}</td>
                <td>${order.date}</td>
                <td><button onclick="viewOrder(${order.id})">View</button></td>
            </tr>
        `;
    });
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        let details = `Order #${order.id}\n\n`;
        order.items.forEach(item => {
            details += `${item.name} x${item.quantity} = $${(item.price * item.quantity).toFixed(2)}\n`;
        });
        details += `\nTotal: $${order.total}`;
        alert(details);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showProducts();
});



