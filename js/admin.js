// Admin Panel Functions

// Check admin authentication
function checkAdminAuth() {
    if (!db.isAdminLoggedIn() && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Admin login
function adminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = db.adminLogin(username, password);
    if (result.success) {
        window.location.href = 'index.html';
    } else {
        showNotification(result.message, 'error');
    }
}

// Admin logout
function adminLogout() {
    db.adminLogout();
    window.location.href = 'login.html';
}

// Load dashboard stats
function loadDashboardStats() {
    const stats = db.getDashboardStats();
    
    document.getElementById('totalProducts').textContent = stats.totalProducts;
    document.getElementById('totalOrders').textContent = stats.totalOrders;
    document.getElementById('totalCustomers').textContent = stats.totalCustomers;
    document.getElementById('totalRevenue').textContent = '₹' + stats.totalRevenue;
    document.getElementById('pendingOrders').textContent = stats.pendingOrders;
    document.getElementById('lowStock').textContent = stats.lowStock;
}

// Load products table
function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    if (!tbody) return;

    const products = db.getAllProducts();
    
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>#${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <span class="status-badge ${product.badge === 'offer' ? 'status-pending' : 'status-completed'}">
                    ${product.badge || 'regular'}
                </span>
            </td>
            <td>
                <a href="edit-product.html?id=${product.id}" class="btn-edit">Edit</a>
                <button onclick="deleteProduct(${product.id})" class="btn-delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        db.deleteProduct(id);
        loadProductsTable();
        showNotification('Product deleted successfully');
    }
}

// Load product for editing
function loadProductForEdit() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) return;

    const product = db.getProductById(productId);
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Fill form
    document.getElementById('productId').value = product.id;
    document.getElementById('name').value = product.name;
    document.getElementById('category').value = product.category;
    document.getElementById('subcategory').value = product.subcategory;
    document.getElementById('price').value = product.price;
    document.getElementById('originalPrice').value = product.originalPrice;
    document.getElementById('description').value = product.description;
    document.getElementById('stock').value = product.stock;
    document.getElementById('material').value = product.material;
    document.getElementById('care').value = product.care;
    document.getElementById('badge').value = product.badge || 'none';
    
    document.getElementById('featured').checked = product.featured;
    document.getElementById('bestseller').checked = product.bestseller;
}

// Save product
function saveProduct() {
    const productId = document.getElementById('productId').value;
    
    const productData = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        subcategory: document.getElementById('subcategory').value,
        price: parseInt(document.getElementById('price').value),
        originalPrice: parseInt(document.getElementById('originalPrice').value),
        description: document.getElementById('description').value,
        stock: parseInt(document.getElementById('stock').value),
        material: document.getElementById('material').value,
        care: document.getElementById('care').value,
        badge: document.getElementById('badge').value,
        featured: document.getElementById('featured').checked,
        bestseller: document.getElementById('bestseller').checked,
        images: ['product.jpg'] // Default image
    };

    if (productId) {
        db.updateProduct(productId, productData);
        showNotification('Product updated successfully');
    } else {
        db.addProduct(productData);
        showNotification('Product added successfully');
    }

    setTimeout(() => {
        window.location.href = 'products.html';
    }, 1500);
}

// Load orders table
function loadOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    const orders = db.getOrders();
    
    tbody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.orderNumber}</td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>${order.customerName || 'Guest'}</td>
            <td>₹${order.total}</td>
            <td>
                <select onchange="updateOrderStatus(${order.id}, this.value)" class="status-badge">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                <button onclick="viewOrder(${order.id})" class="btn-edit">View</button>
            </td>
        </tr>
    `).join('');
}

// Update order status
function updateOrderStatus(orderId, status) {
    db.updateOrderStatus(orderId, status);
    showNotification('Order status updated');
}

// View order details
function viewOrder(orderId) {
    // Implement order detail view
    alert('Order details view - ID: ' + orderId);
}

// Load customers table
function loadCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    if (!tbody) return;

    const customers = db.getCustomers();
    
    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td>#${customer.id}</td>
            <td>${customer.name || 'N/A'}</td>
            <td>${customer.email || 'N/A'}</td>
            <td>${customer.phone || 'N/A'}</td>
            <td>${customer.joinDate || 'N/A'}</td>
            <td>${customer.orders || 0}</td>
            <td>
                <button onclick="viewCustomer(${customer.id})" class="btn-edit">View</button>
            </td>
        </tr>
    `).join('');
}

// Load banners table
function loadBannersTable() {
    const tbody = document.getElementById('bannersTableBody');
    if (!tbody) return;

    const banners = db.getAllBanners();
    
    tbody.innerHTML = banners.map(banner => `
        <tr>
            <td>#${banner.id}</td>
            <td>${banner.title}</td>
            <td>${banner.subtitle}</td>
            <td>
                <span class="status-badge ${banner.active ? 'status-completed' : 'status-pending'}">
                    ${banner.active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>${banner.position}</td>
            <td>
                <button onclick="editBanner(${banner.id})" class="btn-edit">Edit</button>
                <button onclick="deleteBanner(${banner.id})" class="btn-delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Delete banner
function deleteBanner(id) {
    if (confirm('Are you sure you want to delete this banner?')) {
        db.deleteBanner(id);
        loadBannersTable();
        showNotification('Banner deleted successfully');
    }
}

// Load offers table
function loadOffersTable() {
    const tbody = document.getElementById('offersTableBody');
    if (!tbody) return;

    const offers = db.getAllOffers();
    
    tbody.innerHTML = offers.map(offer => `
        <tr>
            <td>#${offer.id}</td>
            <td>${offer.title}</td>
            <td>${offer.code}</td>
            <td>${offer.discount}%</td>
            <td>₹${offer.minPurchase}</td>
            <td>${offer.validUntil}</td>
            <td>
                <span class="status-badge ${offer.active ? 'status-completed' : 'status-pending'}">
                    ${offer.active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <button onclick="editOffer(${offer.id})" class="btn-edit">Edit</button>
                <button onclick="deleteOffer(${offer.id})" class="btn-delete">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Delete offer
function deleteOffer(id) {
    if (confirm('Are you sure you want to delete this offer?')) {
        db.deleteOffer(id);
        loadOffersTable();
        showNotification('Offer deleted successfully');
    }
}

// Save settings
function saveSettings() {
    const settings = {
        siteName: document.getElementById('siteName').value,
        tagline: document.getElementById('tagline').value,
        currency: document.getElementById('currency').value,
        freeShipping: document.getElementById('freeShipping').checked,
        shippingAmount: parseInt(document.getElementById('shippingAmount').value),
        returnDays: parseInt(document.getElementById('returnDays').value)
    };

    db.updateSettings(settings);
    showNotification('Settings saved successfully');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 9999;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize admin page
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();

    // Load appropriate data based on page
    if (document.getElementById('totalProducts')) {
        loadDashboardStats();
    }
    if (document.getElementById('productsTableBody')) {
        loadProductsTable();
    }
    if (document.getElementById('ordersTableBody')) {
        loadOrdersTable();
    }
    if (document.getElementById('customersTableBody')) {
        loadCustomersTable();
    }
    if (document.getElementById('bannersTableBody')) {
        loadBannersTable();
    }
    if (document.getElementById('offersTableBody')) {
        loadOffersTable();
    }
    if (document.getElementById('productId')) {
        loadProductForEdit();
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', adminLogout);
    }
});