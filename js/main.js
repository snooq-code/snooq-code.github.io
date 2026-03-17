// SNOOQ Main Website Functions

// ============= CART FUNCTIONS =============

// Update cart count on all pages
function updateCartCount() {
    if (typeof db === 'undefined') {
        console.error('Database not loaded');
        return;
    }
    
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

// ============= MENU FUNCTIONS =============

// Mobile menu toggle - FIXED VERSION
function initMobileMenu() {
    console.log('Initializing mobile menu from main.js');
    
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuToggle || !mobileMenu) {
        console.warn('Menu elements not found');
        return;
    }
    
    // Remove any existing listeners to prevent duplicates
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    
    // Use the new element
    const freshMenuToggle = document.getElementById('menuToggle');
    
    freshMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu toggled');
        
        mobileMenu.classList.toggle('active');
        const icon = freshMenuToggle.querySelector('i');
        
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && 
            !freshMenuToggle.contains(event.target) && 
            mobileMenu.classList.contains('active')) {
            
            mobileMenu.classList.remove('active');
            const icon = freshMenuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });

    // Prevent menu from closing when clicking inside
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}

// ============= SEARCH FUNCTIONS =============

function initSearch() {
    const searchBtn = document.getElementById('searchToggle');
    if (searchBtn) {
        // Remove existing listeners
        const newSearchBtn = searchBtn.cloneNode(true);
        searchBtn.parentNode.replaceChild(newSearchBtn, searchBtn);
        
        newSearchBtn.addEventListener('click', function() {
            const searchTerm = prompt('🔍 Search SNOOQ:', '');
            if (searchTerm && searchTerm.trim() !== '') {
                window.location.href = `shop.html?search=${encodeURIComponent(searchTerm.trim())}`;
            }
        });
    }
}

// ============= CART BUTTON =============

function initBag() {
    const bagBtn = document.getElementById('bagToggle');
    if (bagBtn) {
        // Remove existing listeners
        const newBagBtn = bagBtn.cloneNode(true);
        bagBtn.parentNode.replaceChild(newBagBtn, bagBtn);
        
        newBagBtn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
}

// ============= PRODUCT LOADING =============

// Load products dynamically - FIXED for GitHub Pages
function loadProducts(containerId, filter = 'all') {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof db === 'undefined') {
        console.error('Database not loaded');
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Error loading products</p>';
        return;
    }

    let products = [];
    try {
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
    } catch (error) {
        console.error('Error loading products:', error);
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Error loading products</p>';
        return;
    }

    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found</p>';
        return;
    }

    products.slice(0, 6).forEach(product => {
        const productHtml = createProductCard(product);
        container.innerHTML += productHtml;
    });

    // Add click handlers to product items
    setTimeout(() => {
        document.querySelectorAll(`#${containerId} .product-item`).forEach(item => {
            item.addEventListener('click', function(e) {
                if (!e.target.classList.contains('shop-action')) {
                    const productId = this.dataset.productId;
                    if (productId) {
                        window.location.href = `product.html?id=${productId}`;
                    }
                }
            });
        });

        // Add shop action handlers
        document.querySelectorAll(`#${containerId} .shop-action`).forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = this.closest('.product-item')?.dataset.productId;
                if (productId) {
                    addToCart(parseInt(productId), 1);
                    
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
                }
            });
        });
    }, 100);
}

// Create product card HTML - FIXED for GitHub Pages
function createProductCard(product) {
    const badgeClass = product.badge === 'offer' ? 'offer' : 
                      product.badge === 'new' ? 'new' : 
                      product.badge === 'bestseller' ? 'bestseller' : '';
    
    const badgeHtml = badgeClass ? `<span class="badge ${badgeClass}">${product.badge}</span>` : '';
    
    const priceHtml = product.originalPrice > product.price ? 
        `<span class="old-price">₹${product.originalPrice}</span> ₹${product.price}` : 
        `₹${product.price}`;

    // FIXED: Better image handling
    let imageUrl = 'https://via.placeholder.com/300x300/b65f3a/ffffff?text=' + encodeURIComponent(product.name);
    
    if (product.images && product.images.length > 0) {
        if (product.images[0].startsWith('data:image') || 
            product.images[0].startsWith('http')) {
            imageUrl = product.images[0];
        } else if (product.images[0].startsWith('assets/')) {
            imageUrl = product.images[0];
        } else {
            imageUrl = `assets/images/${product.images[0]}`;
        }
    }

    return `
        <div class="product-item" data-product-id="${product.id}">
            ${badgeHtml}
            <div class="product-image">
                <img src="${imageUrl}" alt="${product.name}" 
                     onerror="this.src='https://via.placeholder.com/300x300/b65f3a/ffffff?text=${encodeURIComponent(product.name)}'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">${priceHtml}</div>
                <button class="shop-action">add to cart</button>
            </div>
        </div>
    `;
}

// Add to cart
function addToCart(productId, quantity = 1, size = null, color = null) {
    if (typeof db === 'undefined') {
        showNotification('Database error', 'error');
        return;
    }
    
    const result = db.addToCart(productId, quantity, size, color);
    if (result && result.success) {
        updateCartCount();
        showNotification('✓ Product added to cart!');
    } else {
        showNotification(result?.message || 'Error adding to cart', 'error');
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existing = document.querySelector('.snooq-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'snooq-notification';
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
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 2000);
}

// Load banners - FIXED
function loadBanners(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (typeof db === 'undefined') {
        console.error('Database not loaded');
        return;
    }

    try {
        const banners = db.getActiveBanners();
        if (banners && banners.length > 0) {
            const banner = banners[0];
            
            // Handle banner image
            let imageUrl = banner.image;
            if (!imageUrl.startsWith('data:') && !imageUrl.startsWith('http')) {
                imageUrl = `assets/images/${banner.image}`;
            }

            container.innerHTML = `
                <div class="fashion-banner">
                    <div class="banner-image">
                        <img src="${imageUrl}" alt="${banner.title}" 
                             onerror="this.src='https://via.placeholder.com/800x400/b65f3a/ffffff?text=${encodeURIComponent(banner.title)}'">
                    </div>
                    <div class="banner-overlay"></div>
                    <div class="banner-content">
                        <h2>${banner.title}</h2>
                        <p>${banner.subtitle || ''}</p>
                        <div class="banner-tags">
                            ${banner.tags ? banner.tags.map(tag => `<span>${tag}</span>`).join('') : ''}
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading banners:', error);
    }
}

// ============= CATEGORY CHIPS =============

function initCategoryChips() {
    document.querySelectorAll('.cat-item').forEach(cat => {
        // Remove existing listeners
        const newCat = cat.cloneNode(true);
        cat.parentNode.replaceChild(newCat, cat);
        
        newCat.addEventListener('click', function() {
            document.querySelectorAll('.cat-item').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            // Get category and filter
            const category = this.innerText.toLowerCase().trim();
            if (category !== 'all' && category !== 'offers' && category !== 'new' && category !== 'bestsellers') {
                window.location.href = `shop.html?cat=${encodeURIComponent(category)}`;
            }
        });
    });
}

// ============= BOTTOM NAVIGATION =============

function initBottomNav() {
    document.querySelectorAll('.bottom-icon').forEach(icon => {
        // Remove existing listeners
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        newIcon.addEventListener('click', function() {
            const span = this.querySelector('span');
            if (!span) return;
            
            const page = span.innerText.toLowerCase();
            if (page === 'home') window.location.href = 'index.html';
            else if (page === 'favourite') window.location.href = 'wishlist.html';
            else if (page === 'orders') window.location.href = 'orders.html';
            else if (page === 'profile') window.location.href = 'profile.html';
        });
    });
}

// ============= NEWSLETTER =============

function initNewsletter() {
    const newsletterBtn = document.getElementById('newsletterBtn');
    if (newsletterBtn) {
        // Remove existing listeners
        const newBtn = newsletterBtn.cloneNode(true);
        newsletterBtn.parentNode.replaceChild(newBtn, newsletterBtn);
        
        newBtn.addEventListener('click', function() {
            const email = document.getElementById('newsletterEmail')?.value;
            if (email && email.includes('@')) {
                showNotification('Thanks for subscribing! Check your email for 10% off.');
                document.getElementById('newsletterEmail').value = '';
            } else {
                showNotification('Please enter a valid email', 'error');
            }
        });
    }
}

// ============= SOCIAL LINKS =============

function initSocialLinks() {
    document.querySelectorAll('.socials i').forEach(icon => {
        // Remove existing listeners
        const newIcon = icon.cloneNode(true);
        icon.parentNode.replaceChild(newIcon, icon);
        
        newIcon.addEventListener('click', function() {
            const classList = this.classList;
            let social = '';
            if (classList.contains('fa-instagram')) social = 'Instagram';
            else if (classList.contains('fa-pinterest')) social = 'Pinterest';
            else if (classList.contains('fa-youtube')) social = 'YouTube';
            else if (classList.contains('fa-whatsapp')) social = 'WhatsApp';
            
            showNotification(`Follow us on ${social}!`);
        });
    });
}

// ============= HOMEPAGE CONTENT LOADER =============

function loadHomepageContent() {
    console.log('Loading homepage content from main.js');
    
    if (typeof db === 'undefined') {
        console.error('Database not loaded');
        return;
    }

    // Load new arrivals
    if (document.getElementById('newArrivalsGrid')) {
        loadProducts('newArrivalsGrid', 'new');
    }
    
    // Load bestsellers
    if (document.getElementById('bestsellersGrid')) {
        loadProducts('bestsellersGrid', 'bestseller');
    }
    
    // Load offers
    if (document.getElementById('offersGrid')) {
        loadProducts('offersGrid', 'offer');
    }
    
    // Load banners
    if (document.getElementById('bannerContainer')) {
        loadBanners('bannerContainer');
    }
}

// ============= INITIALIZATION =============

// Single initialization function
function initSNOOQ() {
    console.log('Initializing SNOOQ from main.js');
    
    // Check if db exists
    if (typeof db === 'undefined') {
        console.error('Database not loaded. Make sure database.js is loaded first.');
        return;
    }

    // Initialize all components
    updateCartCount();
    initMobileMenu();
    initSearch();
    initBag();
    initCategoryChips();
    initBottomNav();
    initNewsletter();
    initSocialLinks();
    
    // Load homepage content if on homepage
    loadHomepageContent();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSNOOQ);
} else {
    // DOM is already loaded
    initSNOOQ();
}

// Add slideIn animation if not exists
if (!document.querySelector('#snooq-animations')) {
    const style = document.createElement('style');
    style.id = 'snooq-animations';
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}