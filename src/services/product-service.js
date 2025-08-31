/**
 * Product Service - Manages product data and operations
 */
export class ProductService {
  constructor() {
    // Image fallback system with local placeholders
    this.imageFallbacks = {
      electronics: './images/electronics-placeholder.svg',
      clothing: './images/clothing-placeholder.svg',
      home: './images/home-placeholder.svg',
      sports: './images/sports-placeholder.svg'
    };

    this.products = [
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-canceling headphones with 30-hour battery life and crystal clear sound quality.",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.electronics,
        rating: 4.8,
        reviews: 1247,
        inStock: true,
        features: [
          "Active Noise Cancellation",
          "30-hour battery life",
          "Bluetooth 5.0",
          "Built-in microphone",
          "Foldable design"
        ]
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and water resistance up to 50m.",
        price: 299.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.electronics,
        rating: 4.6,
        reviews: 892,
        inStock: true,
        features: [
          "Heart rate monitoring",
          "GPS tracking",
          "Water resistant",
          "7-day battery life",
          "Sleep tracking"
        ]
      },
      {
        id: 3,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and sustainable cotton t-shirt made from 100% organic materials.",
        price: 29.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.clothing,
        rating: 4.4,
        reviews: 567,
        inStock: true,
        features: [
          "100% organic cotton",
          "Breathable fabric",
          "Multiple colors available",
          "Sizes XS-XXL",
          "Machine washable"
        ]
      },
      {
        id: 4,
        name: "Modern Coffee Table",
        description: "Elegant wooden coffee table with storage shelf, perfect for modern living rooms.",
        price: 249.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.home,
        rating: 4.7,
        reviews: 234,
        inStock: true,
        features: [
          "Solid wood construction",
          "Storage shelf",
          "Easy assembly",
          "Multiple finishes",
          "2-year warranty"
        ]
      },
      {
        id: 5,
        name: "Wireless Gaming Mouse",
        description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
        price: 79.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.electronics,
        rating: 4.5,
        reviews: 445,
        inStock: true,
        features: [
          "25K DPI sensor",
          "RGB lighting",
          "Programmable buttons",
          "Wireless connectivity",
          "50-hour battery"
        ]
      },
      {
        id: 6,
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat with alignment lines, perfect for yoga, pilates, and fitness workouts.",
        price: 49.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.sports,
        rating: 4.9,
        reviews: 1234,
        inStock: true,
        features: [
          "Non-slip surface",
          "Alignment lines",
          "6mm thickness",
          "Eco-friendly materials",
          "Includes carrying strap"
        ]
      },
      {
        id: 7,
        name: "Digital Camera DSLR",
        description: "Professional DSLR camera with 24MP sensor, 4K video recording, and interchangeable lenses.",
        price: 899.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.electronics,
        rating: 4.8,
        reviews: 678,
        inStock: true,
        features: [
          "24MP APS-C sensor",
          "4K video recording",
          "Interchangeable lenses",
          "Built-in WiFi",
          "Touch screen display"
        ]
      },
      {
        id: 8,
        name: "Running Shoes",
        description: "Lightweight running shoes with responsive cushioning and breathable mesh upper.",
        price: 129.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.sports,
        rating: 4.6,
        reviews: 892,
        inStock: true,
        features: [
          "Responsive cushioning",
          "Breathable mesh",
          "Lightweight design",
          "Multiple colors",
          "Sizes 7-12"
        ]
      },
      {
        id: 9,
        name: "Smart Home Speaker",
        description: "Voice-controlled smart speaker with premium sound quality and home automation features.",
        price: 199.99,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.electronics,
        rating: 4.7,
        reviews: 567,
        inStock: true,
        features: [
          "Voice control",
          "Premium sound",
          "Home automation",
          "Multi-room audio",
          "Privacy controls"
        ]
      },
      {
        id: 10,
        name: "Designer Backpack",
        description: "Stylish and functional backpack with laptop compartment and multiple storage pockets.",
        price: 89.99,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.clothing,
        rating: 4.5,
        reviews: 345,
        inStock: true,
        features: [
          "Laptop compartment",
          "Multiple pockets",
          "Water-resistant",
          "Padded straps",
          "15-inch laptop fit"
        ]
      },
      {
        id: 11,
        name: "Kitchen Mixer Stand",
        description: "Professional stand mixer with 10-speed settings and multiple attachments for all your baking needs.",
        price: 399.99,
        category: "home",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.home,
        rating: 4.9,
        reviews: 789,
        inStock: true,
        features: [
          "10-speed settings",
          "Multiple attachments",
          "5-quart bowl",
          "Tilt-head design",
          "5-year warranty"
        ]
      },
      {
        id: 12,
        name: "Basketball",
        description: "Official size basketball with premium grip and durability for indoor and outdoor play.",
        price: 39.99,
        category: "sports",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
        fallbackImage: this.imageFallbacks.sports,
        rating: 4.4,
        reviews: 234,
        inStock: true,
        features: [
          "Official size",
          "Premium grip",
          "Indoor/outdoor",
          "Durable construction",
          "Official weight"
        ]
      }
    ];
  }

  /**
   * Get all products
   * @returns {Promise<Array>} Array of products
   */
  async getProducts() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.products;
  }

  /**
   * Get product by ID
   * @param {number} id - Product ID
   * @returns {Promise<Object|null>} Product object or null
   */
  async getProductById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.products.find(product => product.id === id) || null;
  }

  /**
   * Get products by category
   * @param {string} category - Product category
   * @returns {Promise<Array>} Array of products in category
   */
  async getProductsByCategory(category) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.products.filter(product => product.category === category);
  }

  /**
   * Search products
   * @param {string} query - Search query
   * @returns {Promise<Array>} Array of matching products
   */
  async searchProducts(query) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const lowercaseQuery = query.toLowerCase();
    return this.products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Get product categories
   * @returns {Promise<Array>} Array of unique categories
   */
  async getCategories() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...new Set(this.products.map(product => product.category))];
  }

  /**
   * Get featured products (top rated)
   * @param {number} limit - Number of products to return
   * @returns {Promise<Array>} Array of featured products
   */
  async getFeaturedProducts(limit = 6) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.products
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  /**
   * Get products on sale (mock implementation)
   * @returns {Promise<Array>} Array of products on sale
   */
  async getProductsOnSale() {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Mock sale products (random selection)
    return this.products
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map(product => ({
        ...product,
        originalPrice: product.price * 1.2,
        discount: 20
      }));
  }

  /**
   * Get image URL with fallback for a product
   * @param {Object} product - Product object
   * @returns {string} Image URL to use
   */
  getProductImage(product) {
    // First try the main image
    if (product.image) {
      return product.image;
    }
    // Fall back to category-specific placeholder
    if (product.category && this.imageFallbacks[product.category]) {
      return this.imageFallbacks[product.category];
    }
    // Final fallback to a generic placeholder
    return './images/default-placeholder.svg';
  }

  /**
   * Preload product images and handle fallbacks
   * @param {Array} products - Array of products
   * @returns {Promise<Array>} Products with image status
   */
  async preloadImages(products) {
    const productsWithImageStatus = await Promise.all(
      products.map(async (product) => {
        const img = new Image();
        const imageUrl = this.getProductImage(product);

        return new Promise((resolve) => {
          img.onload = () => {
            resolve({
              ...product,
              imageLoaded: true,
              currentImage: imageUrl
            });
          };

          img.onerror = () => {
            console.warn(`Failed to load image for ${product.name}, using fallback`);
            // Try fallback image if main image failed
            if (imageUrl !== product.fallbackImage && product.fallbackImage) {
              const fallbackImg = new Image();
              fallbackImg.onload = () => {
                resolve({
                  ...product,
                  imageLoaded: true,
                  currentImage: product.fallbackImage,
                  imageError: true
                });
              };
              fallbackImg.onerror = () => {
                resolve({
                  ...product,
                  imageLoaded: false,
                  currentImage: './images/default-placeholder.svg',
                  imageError: true
                });
              };
              fallbackImg.src = product.fallbackImage;
            } else {
              resolve({
                ...product,
                imageLoaded: false,
                currentImage: './images/default-placeholder.svg',
                imageError: true
              });
            }
          };

          img.src = imageUrl;
        });
      })
    );

    return productsWithImageStatus;
  }
}
