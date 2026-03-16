// SNOOQ Main Website Functions

// Update cart count on all pages
function updateCartCount() {
    const cartCount = db.getCartCount();
    const cartIcons = document.querySelectorAll('.cart-count');
    
    cartIcons.forEach(icon => {
        if (cartCount > 0) {
            icon.textContent = cartCount;
            icon.style.display = 'flex';
        } else {
            icon.style.display = 'none';
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    }
}

// Search functionality
function initSearch() {
    const searchBtn = document.getElementById('searchToggle');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = prompt('🔍 Search SNOOQ:', '');
            if (searchTerm) {
                window.location.href = `shop.html?search=${encodeURIComponent(searchTerm)}`;
            }
        });
    }
}

// Bag/Cart functionality
function initBag() {
    const bagBtn = document.getElementById('bagToggle');
    if (bagBtn) {
        bagBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
}

// Load products dynamically
function loadProducts(containerId, filter = 'all') {
    const container = document.getElementById(containerId);
    if (!container) return;

    let products = [];
    switch(filter) {
        case 'new':
            products = db.getNewArrivals();
            break;
        case 'bestseller':
            products = db.getBestsellers();
            break;
        case 'offer':
            products = db.getOfferProducts();
            break;
        default:
            products = db.getAllProducts();
    }

    container.innerHTML = '';
    products.slice(0, 6).forEach(product => {
        const productHtml = createProductCard(product);
        container.innerHTML += productHtml;
    });

    // Add click handlers to product items
    document.querySelectorAll('.product-item').forEach(item => {
        item.addEventListener('click', function(e) {
            if (!e.target.classList.contains('shop-action')) {
                const productId = this.dataset.productId;
                window.location.href = `product.html?id=${productId}`;
            }
        });
    });

    // Add shop action handlers
    document.querySelectorAll('.shop-action').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = this.closest('.product-item').dataset.productId;
            addToCart(productId, 1);
            
            // Visual feedback
            const original = this.innerText;
            this.innerText = '✓ added';
            this.style.background = '#b65f3a';
            this.style.color = 'white';
            setTimeout(() => {
                this.innerText = original;
                this.style.background = 'transparent';
                this.style.color = '#4a3f38';
            }, 1300);
        });
    });
}

// Create product card HTML
function createProductCard(product) {
    const badgeClass = product.badge === 'offer' ? 'offer' : 
                      product.badge === 'new' ? 'new' : 
                      product.badge === 'bestseller' ? 'bestseller' : '';
    
    const badgeHtml = badgeClass ? `<span class="badge ${badgeClass}">${product.badge}</span>` : '';
    
    const priceHtml = product.originalPrice > product.price ? 
        `<span class="old-price">₹${product.originalPrice}</span> ₹${product.price}` : 
        `₹${product.price}`;

    return `
        <div class="product-item" data-product-id="${product.id}">
            ${badgeHtml}
            <div class="product-image">
                <img src="assets/images/${product.images[0]}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x300?text=${product.name}'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">${priceHtml}</div>
                <button class="shop-action">secure</button>
            </div>
        </div>
    `;
}

// Add to cart
function addToCart(productId, quantity = 1, size = null, color = null) {
    const result = db.addToCart(productId, quantity, size, color);
    if (result.success) {
        updateCartCount();
        showNotification('Product added to cart!');
    } else {
        showNotification(result.message, 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#b65f3a' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Load banners
function loadBanners(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const banners = db.getActiveBanners();
    if (banners.length > 0) {
        const banner = banners[0]; // Show first banner
        container.innerHTML = `
            <div class="fashion-banner">
                <div class="banner-image">
                    <img src="assets/images/${banner.image}" alt="${banner.title}" onerror="this.src='https://via.placeholder.com/800x400?text=${banner.title}'">
                </div>
                <div class="banner-overlay"></div>
                <div class="banner-content">
                    <h2>${banner.title}</h2>
                    <p>${banner.subtitle}</p>
                    <div class="banner-tags">
                        ${banner.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initMobileMenu();
    initSearch();
    initBag();

    // Load homepage sections
    if (document.getElementById('newArrivalsGrid')) {
        loadProducts('newArrivalsGrid', 'new');
    }
    if (document.getElementById('bestsellersGrid')) {
        loadProducts('bestsellersGrid', 'bestseller');
    }
    if (document.getElementById('offersGrid')) {
        loadProducts('offersGrid', 'offer');
    }
    if (document.getElementById('allProductsGrid')) {
        loadProducts('allProductsGrid', 'all');
    }
    if (document.getElementById('bannerContainer')) {
        loadBanners('bannerContainer');
    }

    // Category chips
    document.querySelectorAll('.cat-item').forEach(cat => {
        cat.addEventListener('click', function() {
            document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Bottom navigation
    document.querySelectorAll('.bottom-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const page = this.querySelector('span').innerText.toLowerCase();
            if (page === 'home') window.location.href = 'index.html';
            else if (page === 'favourite') window.location.href = 'wishlist.html';
            else if (page === 'orders') window.location.href = 'orders.html';
            else if (page === 'profile') window.location.href = 'profile.html';
        });
    });

    // Newsletter
    const newsletterBtn = document.getElementById('newsletterBtn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            const email = document.getElementById('newsletterEmail').value;
            if (email) {
                showNotification('Thanks for subscribing! Check your email for 10% off.');
                document.getElementById('newsletterEmail').value = '';
            } else {
                showNotification('Please enter your email', 'error');
            }
        });
    }

    // Social links
    document.querySelectorAll('.socials i').forEach(icon => {
        icon.addEventListener('click', function() {
            const social = this.classList[1].replace('fa-', '');
            showNotification(`Follow us on ${social}!`);
        });
    });
});