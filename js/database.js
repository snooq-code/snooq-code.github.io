// SNOOQ Database Management System - FIXED with image handling
class SNOOQDB {
    constructor() {
        this.initDatabase();
    }

    initDatabase() {
        // Initialize all storage if not exists
        if (!localStorage.getItem('snooq_products')) {
            localStorage.setItem('snooq_products', JSON.stringify(this.getDefaultProducts()));
        }
        if (!localStorage.getItem('snooq_banners')) {
            localStorage.setItem('snooq_banners', JSON.stringify(this.getDefaultBanners()));
        }
        if (!localStorage.getItem('snooq_offers')) {
            localStorage.setItem('snooq_offers', JSON.stringify(this.getDefaultOffers()));
        }
        if (!localStorage.getItem('snooq_orders')) {
            localStorage.setItem('snooq_orders', JSON.stringify([]));
        }
        if (!localStorage.getItem('snooq_customers')) {
            localStorage.setItem('snooq_customers', JSON.stringify([]));
        }
        if (!localStorage.getItem('snooq_cart')) {
            localStorage.setItem('snooq_cart', JSON.stringify([]));
        }
        if (!localStorage.getItem('snooq_wishlist')) {
            localStorage.setItem('snooq_wishlist', JSON.stringify([]));
        }
        if (!localStorage.getItem('snooq_settings')) {
            localStorage.setItem('snooq_settings', JSON.stringify({
                siteName: 'SNOOQ',
                tagline: 'indian aesthetic',
                currency: '₹',
                freeShipping: true,
                shippingAmount: 999,
                returnDays: 7
            }));
        }
        if (!localStorage.getItem('snooq_admin')) {
            localStorage.setItem('snooq_admin', JSON.stringify({
                username: 'admin',
                password: 'admin123',
                email: 'admin@snooq.com'
            }));
        }
    }

    // Default Products with placeholder images
    getDefaultProducts() {
        return [
            {
                id: 1,
                name: "BANDHANI TEE",
                category: "new",
                subcategory: "half sleeve",
                price: 899,
                originalPrice: 1299,
                description: "Handcrafted using traditional Bandhani technique from Gujarat. 100% organic cotton with natural dyes. Each piece is unique.",
                images: ["https://via.placeholder.com/500x500/b65f3a/ffffff?text=BANDHANI"],
                colors: ["terracotta", "sand", "charcoal", "indigo"],
                sizes: ["S", "M", "L", "XL", "XXL"],
                stock: 50,
                badge: "new",
                rating: 4.5,
                reviews: 124,
                material: "100% organic cotton",
                care: "Machine wash cold",
                featured: true,
                bestseller: true,
                dateAdded: "2024-01-15"
            },
            {
                id: 2,
                name: "AJRAKH TEE",
                category: "bestseller",
                subcategory: "full sleeve",
                price: 1299,
                originalPrice: 1599,
                description: "Traditional Ajrakh block print from Kutch. Natural dyes and handcrafted perfection.",
                images: ["https://via.placeholder.com/500x500/2b6c5e/ffffff?text=AJRAKH"],
                colors: ["indigo", "charcoal", "terracotta"],
                sizes: ["M", "L", "XL", "XXL"],
                stock: 35,
                badge: "bestseller",
                rating: 4.8,
                reviews: 89,
                material: "Organic cotton",
                featured: true,
                bestseller: true,
                dateAdded: "2024-01-10"
            },
            {
                id: 3,
                name: "KALAMKARI HOODIE",
                category: "offer",
                subcategory: "hoodies",
                price: 1749,
                originalPrice: 2499,
                description: "Hand-painted Kalamkari art hoodie. Each piece is numbered and unique.",
                images: ["https://via.placeholder.com/500x500/4a3f38/ffffff?text=KALAMKARI"],
                colors: ["charcoal", "indigo", "natural"],
                sizes: ["S", "M", "L", "XL"],
                stock: 20,
                badge: "offer",
                rating: 4.7,
                reviews: 56,
                material: "Heavy cotton",
                care: "Dry clean only",
                featured: true,
                bestseller: false,
                dateAdded: "2024-01-05"
            },
            {
                id: 4,
                name: "BAGRU PRINT",
                category: "new",
                subcategory: "half sleeve",
                price: 999,
                originalPrice: 1299,
                description: "Traditional Bagru print from Rajasthan. Natural mud resist dyeing technique.",
                images: ["https://via.placeholder.com/500x500/d9c5b3/2c241e?text=BAGRU"],
                colors: ["terracotta", "natural"],
                sizes: ["S", "M", "L", "XL"],
                stock: 45,
                badge: "new",
                rating: 4.3,
                reviews: 34,
                material: "Organic cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2024-01-12"
            },
            {
                id: 5,
                name: "DABU TEE",
                category: "regular",
                subcategory: "full sleeve",
                price: 1199,
                originalPrice: 1499,
                description: "Dabu mud resist printing from Rajasthan. Eco-friendly and sustainable.",
                images: ["https://via.placeholder.com/500x500/2b6c5e/ffffff?text=DABU"],
                colors: ["indigo", "charcoal"],
                sizes: ["M", "L", "XL"],
                stock: 30,
                badge: "none",
                rating: 4.2,
                reviews: 28,
                material: "Cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2024-01-08"
            },
            {
                id: 6,
                name: "LEHERIYA TEE",
                category: "bestseller",
                subcategory: "half sleeve",
                price: 1099,
                originalPrice: 1399,
                description: "Traditional Leheriya wave pattern from Rajasthan. Hand-dyed technique.",
                images: ["https://via.placeholder.com/500x500/ff69b4/ffffff?text=LEHERIYA"],
                colors: ["yellow", "pink", "green"],
                sizes: ["S", "M", "L", "XL"],
                stock: 40,
                badge: "bestseller",
                rating: 4.6,
                reviews: 67,
                material: "Cotton",
                featured: true,
                bestseller: true,
                dateAdded: "2024-01-03"
            },
            {
                id: 7,
                name: "CLASSIC OVERSIZED",
                category: "bestseller",
                subcategory: "hoodies",
                price: 1299,
                originalPrice: 1699,
                description: "Oversized fit hoodie with classic Indian aesthetic. Super soft and comfortable.",
                images: ["https://via.placeholder.com/500x500/4a3f38/ffffff?text=CLASSIC"],
                colors: ["charcoal", "terracotta", "indigo"],
                sizes: ["S", "M", "L", "XL", "XXL"],
                stock: 60,
                badge: "bestseller",
                rating: 4.9,
                reviews: 112,
                material: "Cotton blend",
                featured: true,
                bestseller: true,
                dateAdded: "2024-01-01"
            },
            {
                id: 8,
                name: "BOX HOODIE",
                category: "bestseller",
                subcategory: "hoodies",
                price: 1999,
                originalPrice: 2499,
                description: "Boxy fit hoodie with modern Indian print. Limited edition.",
                images: ["https://via.placeholder.com/500x500/000000/ffffff?text=BOX+HOODIE"],
                colors: ["black", "charcoal", "natural"],
                sizes: ["M", "L", "XL"],
                stock: 25,
                badge: "bestseller",
                rating: 4.7,
                reviews: 45,
                material: "Heavy cotton",
                featured: true,
                bestseller: true,
                dateAdded: "2023-12-28"
            },
            {
                id: 9,
                name: "PIGMENT DYED",
                category: "offer",
                subcategory: "full sleeve",
                price: 899,
                originalPrice: 1299,
                description: "Pigment dyed full sleeve with faded effect. Pre-washed for softness.",
                images: ["https://via.placeholder.com/500x500/ffb6c1/2c241e?text=PIGMENT"],
                colors: ["dusty pink", "mint", "lavender"],
                sizes: ["S", "M", "L", "XL"],
                stock: 55,
                badge: "offer",
                rating: 4.4,
                reviews: 78,
                material: "Combed cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2023-12-20"
            },
            {
                id: 10,
                name: "STRIPED HALF",
                category: "regular",
                subcategory: "half sleeve",
                price: 799,
                originalPrice: 999,
                description: "Classic striped tee with hand-block printed borders.",
                images: ["https://via.placeholder.com/500x500/0000ff/ffffff?text=STRIPED"],
                colors: ["blue/white", "red/white", "green/white"],
                sizes: ["S", "M", "L", "XL", "XXL"],
                stock: 80,
                badge: "none",
                rating: 4.1,
                reviews: 92,
                material: "Cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2023-12-15"
            },
            {
                id: 11,
                name: "CREW NECK",
                category: "bestseller",
                subcategory: "full sleeve",
                price: 1099,
                originalPrice: 1399,
                description: "Classic crew neck with minimal Indian embroidery.",
                images: ["https://via.placeholder.com/500x500/000000/ffffff?text=CREW+NECK"],
                colors: ["black", "white", "charcoal"],
                sizes: ["S", "M", "L", "XL"],
                stock: 45,
                badge: "bestseller",
                rating: 4.5,
                reviews: 83,
                material: "Organic cotton",
                featured: true,
                bestseller: true,
                dateAdded: "2023-12-10"
            },
            {
                id: 12,
                name: "FULL SLEEVE TEE",
                category: "regular",
                subcategory: "full sleeve",
                price: 1399,
                originalPrice: 1699,
                description: "Basic full sleeve with handcrafted details.",
                images: ["https://via.placeholder.com/500x500/808080/ffffff?text=FULL+SLEEVE"],
                colors: ["black", "white", "gray"],
                sizes: ["S", "M", "L", "XL", "XXL"],
                stock: 70,
                badge: "none",
                rating: 4.3,
                reviews: 56,
                material: "Cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2023-12-05"
            },
            {
                id: 13,
                name: "HOODIE STONE",
                category: "offer",
                subcategory: "hoodies",
                price: 1749,
                originalPrice: 2499,
                description: "Stone wash hoodie with traditional print.",
                images: ["https://via.placeholder.com/500x500/808080/ffffff?text=STONE"],
                colors: ["stone", "charcoal"],
                sizes: ["M", "L", "XL"],
                stock: 30,
                badge: "offer",
                rating: 4.6,
                reviews: 34,
                material: "Heavy cotton",
                featured: true,
                bestseller: false,
                dateAdded: "2023-11-28"
            },
            {
                id: 14,
                name: "BAGGY FIT",
                category: "offer",
                subcategory: "hoodies",
                price: 1329,
                originalPrice: 1899,
                description: "Baggy fit hoodie with relaxed silhouette.",
                images: ["https://via.placeholder.com/500x500/000000/ffffff?text=BAGGY"],
                colors: ["black", "gray"],
                sizes: ["L", "XL", "XXL"],
                stock: 25,
                badge: "offer",
                rating: 4.4,
                reviews: 28,
                material: "Cotton blend",
                featured: false,
                bestseller: false,
                dateAdded: "2023-11-20"
            },
            {
                id: 15,
                name: "CROP HOODIE",
                category: "offer",
                subcategory: "hoodies",
                price: 1399,
                originalPrice: 1999,
                description: "Cropped hoodie with modern Indian print.",
                images: ["https://via.placeholder.com/500x500/ff69b4/ffffff?text=CROP"],
                colors: ["pink", "lavender", "mint"],
                sizes: ["S", "M", "L"],
                stock: 35,
                badge: "offer",
                rating: 4.5,
                reviews: 42,
                material: "Soft cotton",
                featured: true,
                bestseller: false,
                dateAdded: "2023-11-15"
            },
            {
                id: 16,
                name: "OVERSIZED TEE",
                category: "offer",
                subcategory: "half sleeve",
                price: 1049,
                originalPrice: 1499,
                description: "Oversized fit tee with block print design.",
                images: ["https://via.placeholder.com/500x500/ffffff/000000?text=OVERSIZED"],
                colors: ["white", "black", "terracotta"],
                sizes: ["S", "M", "L", "XL"],
                stock: 50,
                badge: "offer",
                rating: 4.7,
                reviews: 67,
                material: "Organic cotton",
                featured: true,
                bestseller: true,
                dateAdded: "2023-11-10"
            },
            {
                id: 17,
                name: "LINEN FULL",
                category: "regular",
                subcategory: "full sleeve",
                price: 1599,
                originalPrice: 1999,
                description: "Linen blend full sleeve for breathable comfort.",
                images: ["https://via.placeholder.com/500x500/f5e6d3/2c241e?text=LINEN"],
                colors: ["natural", "white", "charcoal"],
                sizes: ["M", "L", "XL"],
                stock: 40,
                badge: "none",
                rating: 4.3,
                reviews: 23,
                material: "Linen blend",
                featured: false,
                bestseller: false,
                dateAdded: "2023-11-05"
            },
            {
                id: 18,
                name: "COTTON HALF",
                category: "regular",
                subcategory: "half sleeve",
                price: 699,
                originalPrice: 899,
                description: "Basic cotton half sleeve everyday essential.",
                images: ["https://via.placeholder.com/500x500/ffffff/000000?text=COTTON"],
                colors: ["white", "black", "gray", "navy"],
                sizes: ["S", "M", "L", "XL", "XXL"],
                stock: 100,
                badge: "none",
                rating: 4.2,
                reviews: 134,
                material: "Cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2023-10-28"
            },
            {
                id: 19,
                name: "ZIP HOODIE",
                category: "regular",
                subcategory: "hoodies",
                price: 2299,
                originalPrice: 2799,
                description: "Full zip hoodie with hand-embroidered details.",
                images: ["https://via.placeholder.com/500x500/4a3f38/ffffff?text=ZIP"],
                colors: ["charcoal", "navy", "black"],
                sizes: ["M", "L", "XL"],
                stock: 20,
                badge: "none",
                rating: 4.5,
                reviews: 31,
                material: "Heavy cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2023-10-20"
            },
            {
                id: 20,
                name: "STRIPED FULL",
                category: "regular",
                subcategory: "full sleeve",
                price: 1199,
                originalPrice: 1499,
                description: "Striped full sleeve with contrast details.",
                images: ["https://via.placeholder.com/500x500/000080/ffffff?text=STRIPED"],
                colors: ["navy/white", "black/white", "green/white"],
                sizes: ["S", "M", "L", "XL"],
                stock: 55,
                badge: "none",
                rating: 4.1,
                reviews: 45,
                material: "Cotton",
                featured: false,
                bestseller: false,
                dateAdded: "2023-10-15"
            }
        ];
    }

    // Default Banners
    getDefaultBanners() {
        return [
            {
                id: 1,
                title: "indian aesthetic · global vibe",
                subtitle: "hand-finished, numbered, with care",
                image: "https://via.placeholder.com/1200x400/b65f3a/ffffff?text=INDIAN+AESTHETIC",
                tags: ["हस्तनिर्मित", "organic", "limited"],
                active: true,
                link: "/shop",
                position: 1
            },
            {
                id: 2,
                title: "SUMMER COLLECTION",
                subtitle: "new block prints arriving",
                image: "https://via.placeholder.com/1200x400/2b6c5e/ffffff?text=SUMMER+COLLECTION",
                tags: ["handcrafted", "cotton", "fresh"],
                active: true,
                link: "/new-arrivals",
                position: 2
            },
            {
                id: 3,
                title: "30% OFF BESTSELLERS",
                subtitle: "limited time offer",
                image: "https://via.placeholder.com/1200x400/c73b2b/ffffff?text=30%25+OFF",
                tags: ["sale", "offer", "popular"],
                active: true,
                link: "/offers",
                position: 3
            }
        ];
    }

    // Default Offers
    getDefaultOffers() {
        return [
            {
                id: 1,
                title: "Summer Sale",
                code: "SUMMER30",
                discount: 30,
                type: "percentage",
                minPurchase: 999,
                validUntil: "2024-12-31",
                active: true
            },
            {
                id: 2,
                title: "First Order",
                code: "WELCOME15",
                discount: 15,
                type: "percentage",
                minPurchase: 0,
                validUntil: "2024-12-31",
                active: true
            },
            {
                id: 3,
                title: "Free Shipping",
                code: "FREESHIP",
                discount: 0,
                type: "freeshipping",
                minPurchase: 999,
                validUntil: "2024-12-31",
                active: true
            }
        ];
    }

    // PRODUCT METHODS
    getAllProducts() {
        return JSON.parse(localStorage.getItem('snooq_products')) || [];
    }

    getProductById(id) {
        const products = this.getAllProducts();
        return products.find(p => p.id === parseInt(id)) || null;
    }

    // FIXED: addProduct with proper image handling
    addProduct(product) {
        const products = this.getAllProducts();
        product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        product.dateAdded = new Date().toISOString().split('T')[0];
        
        // Ensure images are stored properly
        if (!product.images || product.images.length === 0) {
            product.images = ["https://via.placeholder.com/500x500/b65f3a/ffffff?text=" + product.name];
        }
        
        products.push(product);
        localStorage.setItem('snooq_products', JSON.stringify(products));
        return product;
    }

    updateProduct(id, updatedProduct) {
        const products = this.getAllProducts();
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            localStorage.setItem('snooq_products', JSON.stringify(products));
            return products[index];
        }
        return null;
    }

    deleteProduct(id) {
        let products = this.getAllProducts();
        products = products.filter(p => p.id !== parseInt(id));
        localStorage.setItem('snooq_products', JSON.stringify(products));
        return true;
    }

    getProductsByCategory(category) {
        const products = this.getAllProducts();
        if (category === 'all') return products;
        return products.filter(p => p.category === category);
    }

    getProductsBySubcategory(subcategory) {
        const products = this.getAllProducts();
        return products.filter(p => p.subcategory === subcategory);
    }

    getFeaturedProducts() {
        const products = this.getAllProducts();
        return products.filter(p => p.featured === true);
    }

    getBestsellers() {
        const products = this.getAllProducts();
        return products.filter(p => p.bestseller === true);
    }

    getNewArrivals() {
        const products = this.getAllProducts();
        return products.filter(p => p.badge === 'new');
    }

    getOfferProducts() {
        const products = this.getAllProducts();
        return products.filter(p => p.badge === 'offer');
    }

    searchProducts(query) {
        const products = this.getAllProducts();
        query = query.toLowerCase();
        return products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            p.subcategory.toLowerCase().includes(query)
        );
    }

    // FIXED: Get product image with fallback
    getProductImage(product) {
        if (product.images && product.images.length > 0) {
            // If image is base64 data or full URL, use it directly
            if (product.images[0].startsWith('data:image') || 
                product.images[0].startsWith('http')) {
                return product.images[0];
            }
            // Otherwise, try to get from assets folder
            return `assets/images/${product.images[0]}`;
        }
        // Default placeholder
        return `https://via.placeholder.com/500x500/b65f3a/ffffff?text=${product.name}`;
    }

    // BANNER METHODS
    getAllBanners() {
        return JSON.parse(localStorage.getItem('snooq_banners')) || [];
    }

    getActiveBanners() {
        const banners = this.getAllBanners();
        return banners.filter(b => b.active === true).sort((a, b) => a.position - b.position);
    }

    addBanner(banner) {
        const banners = this.getAllBanners();
        banner.id = banners.length > 0 ? Math.max(...banners.map(b => b.id)) + 1 : 1;
        banners.push(banner);
        localStorage.setItem('snooq_banners', JSON.stringify(banners));
        return banner;
    }

    updateBanner(id, updatedBanner) {
        const banners = this.getAllBanners();
        const index = banners.findIndex(b => b.id === parseInt(id));
        if (index !== -1) {
            banners[index] = { ...banners[index], ...updatedBanner };
            localStorage.setItem('snooq_banners', JSON.stringify(banners));
            return banners[index];
        }
        return null;
    }

    deleteBanner(id) {
        let banners = this.getAllBanners();
        banners = banners.filter(b => b.id !== parseInt(id));
        localStorage.setItem('snooq_banners', JSON.stringify(banners));
        return true;
    }

    // OFFER METHODS
    getAllOffers() {
        return JSON.parse(localStorage.getItem('snooq_offers')) || [];
    }

    getActiveOffers() {
        const offers = this.getAllOffers();
        const today = new Date().toISOString().split('T')[0];
        return offers.filter(o => o.active === true && o.validUntil >= today);
    }

    addOffer(offer) {
        const offers = this.getAllOffers();
        offer.id = offers.length > 0 ? Math.max(...offers.map(o => o.id)) + 1 : 1;
        offers.push(offer);
        localStorage.setItem('snooq_offers', JSON.stringify(offers));
        return offer;
    }

    updateOffer(id, updatedOffer) {
        const offers = this.getAllOffers();
        const index = offers.findIndex(o => o.id === parseInt(id));
        if (index !== -1) {
            offers[index] = { ...offers[index], ...updatedOffer };
            localStorage.setItem('snooq_offers', JSON.stringify(offers));
            return offers[index];
        }
        return null;
    }

    deleteOffer(id) {
        let offers = this.getAllOffers();
        offers = offers.filter(o => o.id !== parseInt(id));
        localStorage.setItem('snooq_offers', JSON.stringify(offers));
        return true;
    }

    validateOfferCode(code, purchaseAmount) {
        const offers = this.getAllOffers();
        const offer = offers.find(o => o.code === code && o.active === true);
        
        if (!offer) return { valid: false, message: "Invalid offer code" };
        
        const today = new Date().toISOString().split('T')[0];
        if (offer.validUntil < today) {
            return { valid: false, message: "Offer has expired" };
        }
        
        if (purchaseAmount < offer.minPurchase) {
            return { valid: false, message: `Minimum purchase of ₹${offer.minPurchase} required` };
        }
        
        return { valid: true, offer };
    }

    // CART METHODS
    getCart() {
        return JSON.parse(localStorage.getItem('snooq_cart')) || [];
    }

    addToCart(productId, quantity = 1, size = null, color = null) {
        const cart = this.getCart();
        const product = this.getProductById(productId);
        
        if (!product) return { success: false, message: "Product not found" };
        if (product.stock < quantity) return { success: false, message: "Insufficient stock" };

        // Check if product already in cart
        const existingItem = cart.find(item => 
            item.productId === productId && 
            item.size === size && 
            item.color === color
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: Date.now(),
                productId,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: this.getProductImage(product),
                quantity,
                size,
                color
            });
        }

        localStorage.setItem('snooq_cart', JSON.stringify(cart));
        return { success: true, cart };
    }

    updateCartItem(itemId, quantity) {
        let cart = this.getCart();
        const item = cart.find(i => i.id === itemId);
        
        if (!item) return { success: false, message: "Item not found" };
        
        if (quantity <= 0) {
            cart = cart.filter(i => i.id !== itemId);
        } else {
            item.quantity = quantity;
        }
        
        localStorage.setItem('snooq_cart', JSON.stringify(cart));
        return { success: true, cart };
    }

    removeFromCart(itemId) {
        let cart = this.getCart();
        cart = cart.filter(i => i.id !== itemId);
        localStorage.setItem('snooq_cart', JSON.stringify(cart));
        return cart;
    }

    clearCart() {
        localStorage.setItem('snooq_cart', JSON.stringify([]));
        return [];
    }

    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        const cart = this.getCart();
        return cart.reduce((count, item) => count + item.quantity, 0);
    }

    // WISHLIST METHODS
    getWishlist() {
        return JSON.parse(localStorage.getItem('snooq_wishlist')) || [];
    }

    addToWishlist(productId) {
        const wishlist = this.getWishlist();
        const product = this.getProductById(productId);
        
        if (!product) return { success: false, message: "Product not found" };
        
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            localStorage.setItem('snooq_wishlist', JSON.stringify(wishlist));
        }
        
        return { success: true, wishlist };
    }

    removeFromWishlist(productId) {
        let wishlist = this.getWishlist();
        wishlist = wishlist.filter(id => id !== productId);
        localStorage.setItem('snooq_wishlist', JSON.stringify(wishlist));
        return wishlist;
    }

    isInWishlist(productId) {
        const wishlist = this.getWishlist();
        return wishlist.includes(productId);
    }

    getWishlistProducts() {
        const wishlist = this.getWishlist();
        const products = this.getAllProducts();
        return products.filter(p => wishlist.includes(p.id));
    }

    // ORDER METHODS
    createOrder(orderData) {
        const orders = JSON.parse(localStorage.getItem('snooq_orders')) || [];
        const cart = this.getCart();
        
        const order = {
            id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
            orderNumber: 'ORD' + Date.now(),
            date: new Date().toISOString(),
            items: cart,
            total: this.getCartTotal(),
            status: 'pending',
            paymentStatus: 'pending',
            ...orderData
        };
        
        orders.push(order);
        localStorage.setItem('snooq_orders', JSON.stringify(orders));
        
        // Update stock
        cart.forEach(item => {
            const product = this.getProductById(item.productId);
            if (product) {
                product.stock -= item.quantity;
                this.updateProduct(product.id, product);
            }
        });
        
        // Clear cart
        this.clearCart();
        
        return order;
    }

    getOrders() {
        return JSON.parse(localStorage.getItem('snooq_orders')) || [];
    }

    getOrderById(id) {
        const orders = this.getOrders();
        return orders.find(o => o.id === parseInt(id)) || null;
    }

    updateOrderStatus(id, status) {
        const orders = this.getOrders();
        const index = orders.findIndex(o => o.id === parseInt(id));
        if (index !== -1) {
            orders[index].status = status;
            localStorage.setItem('snooq_orders', JSON.stringify(orders));
            return orders[index];
        }
        return null;
    }

    // CUSTOMER METHODS
    addCustomer(customer) {
        const customers = JSON.parse(localStorage.getItem('snooq_customers')) || [];
        customer.id = customers.length > 0 ? Math.max(...customers.map(c => c.id)) + 1 : 1;
        customer.joinDate = new Date().toISOString().split('T')[0];
        customers.push(customer);
        localStorage.setItem('snooq_customers', JSON.stringify(customers));
        return customer;
    }

    getCustomers() {
        return JSON.parse(localStorage.getItem('snooq_customers')) || [];
    }

    getCustomerById(id) {
        const customers = this.getCustomers();
        return customers.find(c => c.id === parseInt(id)) || null;
    }

    getCustomerByEmail(email) {
        const customers = this.getCustomers();
        return customers.find(c => c.email === email) || null;
    }

    // SETTINGS METHODS
    getSettings() {
        return JSON.parse(localStorage.getItem('snooq_settings')) || {};
    }

    updateSettings(settings) {
        localStorage.setItem('snooq_settings', JSON.stringify(settings));
        return settings;
    }

    // ADMIN AUTH
    adminLogin(username, password) {
        const admin = JSON.parse(localStorage.getItem('snooq_admin')) || {};
        if (admin.username === username && admin.password === password) {
            sessionStorage.setItem('snooq_admin_logged', 'true');
            return { success: true };
        }
        return { success: false, message: "Invalid credentials" };
    }

    adminLogout() {
        sessionStorage.removeItem('snooq_admin_logged');
    }

    isAdminLoggedIn() {
        return sessionStorage.getItem('snooq_admin_logged') === 'true';
    }

    // STATISTICS
    getDashboardStats() {
        const products = this.getAllProducts();
        const orders = this.getOrders();
        const customers = this.getCustomers();
        
        const totalProducts = products.length;
        const totalOrders = orders.length;
        const totalCustomers = customers.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        
        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const completedOrders = orders.filter(o => o.status === 'completed').length;
        
        const outOfStock = products.filter(p => p.stock === 0).length;
        const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length;
        
        return {
            totalProducts,
            totalOrders,
            totalCustomers,
            totalRevenue,
            pendingOrders,
            completedOrders,
            outOfStock,
            lowStock
        };
    }

    getRecentOrders(limit = 5) {
        const orders = this.getOrders();
        return orders.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
    }

    getTopProducts(limit = 5) {
        const products = this.getAllProducts();
        return products.sort((a, b) => b.rating - a.rating).slice(0, limit);
    }
}

// Initialize database
const db = new SNOOQDB();