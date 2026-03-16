// Cart Page Functionality

// Load cart items
function loadCart() {
    const cartContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const cart = db.getCart();
    
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <i class="fas fa-shopping-bag" style="font-size: 4rem; color: #b65f3a; opacity: 0.5;"></i>
                <h2 style="margin: 1rem 0;">Your cart is empty</h2>
                <p style="color: #7d5f4b; margin-bottom: 2rem;">Explore our collection and find your style</p>
                <button class="btn" onclick="window.location.href='shop.html'">continue shopping</button>
            </div>
        `;
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }

    let cartHtml = '';
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        cartHtml += `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="assets/images/${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100x100?text=${item.name}'">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-variants">
                        ${item.size ? `Size: ${item.size}` : ''} 
                        ${item.color ? `| Color: ${item.color}` : ''}
                    </p>
                    <div class="cart-item-price">₹${item.price}</div>
                    <div class="cart-item-actions">
                        <div class="cart-quantity">
                            <button class="qty-btn" onclick="updateCartItem(${item.id}, ${item.quantity - 1})">−</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateCartItem(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = cartHtml;

    // Update summary
    const shipping = subtotal > 999 ? 0 : 99;
    const total = subtotal + shipping;

    cartSummary.innerHTML = `
        <div class="cart-summary">
            <h3>order summary</h3>
            <div class="summary-row">
                <span>subtotal</span>
                <span>₹${subtotal}</span>
            </div>
            <div class="summary-row">
                <span>shipping</span>
                <span>${shipping === 0 ? 'free' : '₹' + shipping}</span>
            </div>
            ${subtotal < 999 ? '<div class="free-shipping-note">Add ₹' + (999 - subtotal) + ' more for free shipping</div>' : ''}
            <div class="summary-total">
                <span>total</span>
                <span>₹${total}</span>
            </div>
            <button class="checkout-btn" onclick="checkout()">proceed to checkout</button>
        </div>
    `;
}

// Update cart item
function updateCartItem(itemId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(itemId);
    } else {
        db.updateCartItem(itemId, newQuantity);
        loadCart();
        updateCartCount();
        showNotification('Cart updated');
    }
}

// Remove from cart
function removeFromCart(itemId) {
    db.removeFromCart(itemId);
    loadCart();
    updateCartCount();
    showNotification('Item removed from cart');
}

// Checkout
function checkout() {
    const cart = db.getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    window.location.href = 'checkout.html';
}

// Apply coupon
function applyCoupon() {
    const code = document.getElementById('couponCode').value;
    if (!code) {
        showNotification('Please enter coupon code', 'error');
        return;
    }

    const cartTotal = db.getCartTotal();
    const result = db.validateOfferCode(code, cartTotal);

    if (result.valid) {
        // Apply discount
        let discount = 0;
        if (result.offer.type === 'percentage') {
            discount = (cartTotal * result.offer.discount) / 100;
        }
        showNotification(`Coupon applied! You saved ₹${discount}`);
    } else {
        showNotification(result.message, 'error');
    }
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});