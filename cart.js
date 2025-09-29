// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.total = 0;
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.updateCartCount();
        this.bindEvents();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartDisplay();
    }

    updateQuantity(index, change) {
        const item = this.items[index];
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity > 0) {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
            } else if (newQuantity === 0) {
                this.removeItem(index);
            }
        }
    }

    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    updateCartDisplay() {
        const cartContainer = document.getElementById('cartItemsContainer');
        const emptyCartMessage = document.getElementById('emptyCartMessage');
        const checkoutSection = document.getElementById('checkoutSection');
        const totalPriceElement = document.getElementById('totalPrice');

        if (!cartContainer) return;

        cartContainer.innerHTML = '';

        if (this.items.length === 0) {
            emptyCartMessage.style.display = 'block';
            checkoutSection.style.display = 'none';
            totalPriceElement.style.display = 'none';
            return;
        }

        emptyCartMessage.style.display = 'none';
        checkoutSection.style.display = 'block';
        totalPriceElement.style.display = 'block';

        this.items.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="cart.updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="cart.updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" onclick="cart.removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartContainer.appendChild(cartItem);
        });

        const total = this.calculateTotal();
        totalPriceElement.innerHTML = `
            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Shipping:</span>
                    <span>Free</span>
                </div>
                <div class="summary-row">
                    <span>Total:</span>
                    <span>$${total.toFixed(2)}</span>
                </div>
                <button class="checkout-btn" onclick="cart.checkout()">
                    Proceed to Checkout
                </button>
                <a href="index.html" class="continue-shopping">
                    Continue Shopping
                </a>
            </div>
        `;
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
        this.updateCartCount();
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        // Add checkout logic here
        alert('Proceeding to checkout...');
    }

    bindEvents() {
        window.addEventListener('storage', (e) => {
            if (e.key === 'cartItems') {
                this.items = JSON.parse(e.newValue || '[]');
                this.updateCartDisplay();
                this.updateCartCount();
            }
        });
    }
}

// Initialize cart
const cart = new Cart();
