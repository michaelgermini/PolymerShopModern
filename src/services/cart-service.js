/**
 * Enhanced Cart Service - Manages shopping cart operations with persistence
 */
export class CartService {
  constructor() {
    this.storageKey = 'polymershop-cart-v2';
    this.listeners = [];
    this.cart = this.loadCart();

    // Auto-save on changes
    this.debouncedSave = this.debounce(this.saveCart.bind(this), 300);

    // Listen for storage changes from other tabs
    window.addEventListener('storage', this.handleStorageChange.bind(this));
  }

  /**
   * Debounce utility for auto-saving
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Load cart from localStorage with enhanced error handling
   * @returns {Array} Cart items
   */
  loadCart() {
    try {
      const cartData = localStorage.getItem(this.storageKey);
      if (!cartData) return [];

      const parsed = JSON.parse(cartData);

      // Validate cart structure
      if (!Array.isArray(parsed)) {
        console.warn('Invalid cart data structure, resetting cart');
        return [];
      }

      // Add timestamps if missing
      const validatedCart = parsed.map(item => ({
        ...item,
        addedAt: item.addedAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString()
      }));

      console.log(`🛒 Loaded ${validatedCart.length} items from cart storage`);
      return validatedCart;
    } catch (error) {
      console.error('❌ Error loading cart:', error);
      return [];
    }
  }

  /**
   * Save cart to localStorage with error handling
   */
  saveCart() {
    try {
      const cartData = this.cart.map(item => ({
        ...item,
        updatedAt: new Date().toISOString()
      }));

      localStorage.setItem(this.storageKey, JSON.stringify(cartData));
      console.log(`💾 Saved ${cartData.length} items to cart storage`);
    } catch (error) {
      console.error('❌ Error saving cart:', error);

      // Try to save with minimal data if full save fails
      try {
        const minimalCart = this.cart.map(({ id, quantity }) => ({ id, quantity }));
        localStorage.setItem(this.storageKey, JSON.stringify(minimalCart));
        console.log('⚠️ Saved minimal cart data');
      } catch (fallbackError) {
        console.error('❌ Fallback save also failed:', fallbackError);
      }
    }
  }

  /**
   * Handle storage changes from other tabs
   */
  handleStorageChange(event) {
    if (event.key === this.storageKey && event.newValue !== event.oldValue) {
      console.log('🔄 Cart updated from another tab');
      this.cart = this.loadCart();
      this.dispatchCartUpdate();
    }
  }

  /**
   * Get current cart
   * @returns {Array} Cart items
   */
  getCart() {
    return [...this.cart];
  }

  /**
   * Add item to cart with enhanced features
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   * @param {Object} options - Additional options
   */
  addToCart(product, quantity = 1, options = {}) {
    if (!product || !product.id) {
      console.error('❌ Invalid product data');
      return false;
    }

    if (quantity <= 0) {
      console.warn('⚠️ Invalid quantity, must be positive');
      return false;
    }

    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.updatedAt = new Date().toISOString();

      // Check stock limit if provided
      if (options.maxStock && existingItem.quantity > options.maxStock) {
        existingItem.quantity = options.maxStock;
        console.warn(`⚠️ Stock limit reached for ${product.name}`);
      }
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice || product.price,
        image: product.image,
        quantity: quantity,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: product.category,
        ...options
      });
    }

    this.debouncedSave();
    this.dispatchCartUpdate();

    console.log(`➕ Added ${quantity}x ${product.name} to cart`);
    return true;
  }

  /**
   * Remove item from cart
   * @param {number} productId - Product ID to remove
   */
  removeFromCart(productId) {
    const itemIndex = this.cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
      const removedItem = this.cart.splice(itemIndex, 1)[0];
      this.debouncedSave();
      this.dispatchCartUpdate();

      console.log(`🗑️ Removed ${removedItem.name} from cart`);
      return true;
    }
    return false;
  }

  /**
   * Update item quantity
   * @param {number} productId - Product ID
   * @param {number} quantity - New quantity
   */
  updateQuantity(productId, quantity) {
    const item = this.cart.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        item.updatedAt = new Date().toISOString();
        this.debouncedSave();
        this.dispatchCartUpdate();

        console.log(`📝 Updated ${item.name} quantity to ${quantity}`);
        return true;
      }
    }
    return false;
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    const itemCount = this.cart.length;
    this.cart = [];
    this.saveCart();
    this.dispatchCartUpdate();

    console.log(`🧹 Cleared cart (${itemCount} items removed)`);
    return true;
  }

  /**
   * Get cart total with tax and shipping calculations
   * @returns {number} Total price
   */
  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Get cart subtotal (without tax/shipping)
   * @returns {number} Subtotal price
   */
  getCartSubtotal() {
    return this.getCartTotal();
  }

  /**
   * Get cart item count
   * @returns {number} Total number of items
   */
  getCartItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  /**
   * Check if cart is empty
   * @returns {boolean} True if cart is empty
   */
  isCartEmpty() {
    return this.cart.length === 0;
  }

  /**
   * Get cart item by ID
   * @param {number} productId - Product ID
   * @returns {Object|null} Cart item or null
   */
  getCartItem(productId) {
    return this.cart.find(item => item.id === productId) || null;
  }

  /**
   * Get cart items by category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered cart items
   */
  getItemsByCategory(category) {
    return this.cart.filter(item => item.category === category);
  }

  /**
   * Check if product is in cart
   * @param {number} productId - Product ID
   * @returns {boolean} True if product is in cart
   */
  hasItem(productId) {
    return this.cart.some(item => item.id === productId);
  }

  /**
   * Get quantity of specific product in cart
   * @param {number} productId - Product ID
   * @returns {number} Quantity in cart
   */
  getItemQuantity(productId) {
    const item = this.getCartItem(productId);
    return item ? item.quantity : 0;
  }

  /**
   * Dispatch cart update event
   */
  dispatchCartUpdate() {
    const event = new CustomEvent('cart-updated', {
      detail: {
        cart: this.getCart(),
        total: this.getCartTotal(),
        subtotal: this.getCartSubtotal(),
        itemCount: this.getCartItemCount(),
        summary: this.getCartSummary(),
        timestamp: new Date().toISOString()
      }
    });

    window.dispatchEvent(event);

    // Notify listeners
    this.listeners.forEach(listener => {
      try {
        listener(event.detail);
      } catch (error) {
        console.error('❌ Error in cart listener:', error);
      }
    });
  }

  /**
   * Add cart change listener
   * @param {Function} listener - Function to call on cart changes
   * @returns {Function} Remove listener function
   */
  addListener(listener) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Apply discount to cart
   * @param {string} code - Discount code
   * @returns {Object} Discount result
   */
  applyDiscount(code) {
    const discounts = {
      'WELCOME10': { type: 'percentage', value: 10, description: 'Welcome discount' },
      'SAVE20': { type: 'percentage', value: 20, description: 'Flash sale' },
      'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' },
      'FLAT10': { type: 'fixed', value: 10, description: '$10 off' },
      'STUDENT15': { type: 'percentage', value: 15, description: 'Student discount' },
      'LOYALTY5': { type: 'percentage', value: 5, description: 'Loyalty reward' }
    };

    const discount = discounts[code?.toUpperCase()];

    if (!discount) {
      return {
        success: false,
        message: 'Invalid discount code',
        code: null
      };
    }

    return {
      success: true,
      discount,
      message: `✅ ${discount.description} applied!`,
      code: code.toUpperCase()
    };
  }

  /**
   * Calculate shipping cost
   * @param {string} method - Shipping method
   * @returns {number} Shipping cost
   */
  calculateShipping(method = 'standard') {
    const shippingRates = {
      'standard': 5.99,
      'express': 12.99,
      'overnight': 24.99,
      'free': 0
    };

    const subtotal = this.getCartSubtotal();

    // Free shipping for orders over $75
    if (subtotal >= 75 && method === 'standard') {
      return 0;
    }

    // Free shipping for orders over $100 regardless of method
    if (subtotal >= 100) {
      return 0;
    }

    return shippingRates[method] || shippingRates.standard;
  }

  /**
   * Calculate tax (simplified - in real app, this would be location-based)
   * @param {number} subtotal - Subtotal before tax
   * @returns {number} Tax amount
   */
  calculateTax(subtotal) {
    // Simplified tax calculation - 8% for demonstration
    return subtotal * 0.08;
  }

  /**
   * Get cart summary with all calculations
   * @returns {Object} Complete cart summary
   */
  getCartSummary() {
    const subtotal = this.getCartSubtotal();
    const shipping = this.calculateShipping();
    const tax = this.calculateTax(subtotal);
    const total = subtotal + shipping + tax;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount: this.getCartItemCount(),
      itemTypes: this.cart.length,
      freeShippingThreshold: 75,
      isFreeShipping: shipping === 0,
      savings: this.calculateSavings()
    };
  }

  /**
   * Calculate total savings from discounts
   * @returns {number} Total savings amount
   */
  calculateSavings() {
    return this.cart.reduce((savings, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return savings + ((item.originalPrice - item.price) * item.quantity);
      }
      return savings;
    }, 0);
  }

  /**
   * Get cart analytics
   * @returns {Object} Cart analytics data
   */
  getAnalytics() {
    const categories = {};
    let totalValue = 0;
    let oldestItem = null;
    let newestItem = null;

    this.cart.forEach(item => {
      // Category analysis
      const category = item.category || 'uncategorized';
      categories[category] = (categories[category] || 0) + item.quantity;

      // Value analysis
      totalValue += item.price * item.quantity;

      // Time analysis
      if (!oldestItem || item.addedAt < oldestItem.addedAt) {
        oldestItem = item;
      }
      if (!newestItem || item.addedAt > newestItem.addedAt) {
        newestItem = item;
      }
    });

    return {
      categories,
      totalValue: parseFloat(totalValue.toFixed(2)),
      itemCount: this.getCartItemCount(),
      itemTypes: this.cart.length,
      oldestItem,
      newestItem,
      averageItemValue: this.cart.length > 0 ? parseFloat((totalValue / this.cart.length).toFixed(2)) : 0,
      cartAge: oldestItem ? Math.floor((new Date() - new Date(oldestItem.addedAt)) / (1000 * 60 * 60 * 24)) : 0
    };
  }

  /**
   * Export cart data for backup/sharing
   * @returns {Object} Complete cart export data
   */
  exportCart() {
    return {
      version: '2.0',
      items: this.getCart(),
      summary: this.getCartSummary(),
      analytics: this.getAnalytics(),
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: navigator.userAgent,
        exportDate: new Date().toISOString(),
        cartVersion: '2.0'
      }
    };
  }

  /**
   * Import cart data
   * @param {Object} cartData - Cart data to import
   * @returns {boolean} Success status
   */
  importCart(cartData) {
    if (!cartData || !cartData.items || !Array.isArray(cartData.items)) {
      console.error('❌ Invalid cart data format');
      return false;
    }

    try {
      // Validate items
      const validatedItems = cartData.items.filter(item => {
        return item.id && item.name && typeof item.price === 'number' && item.quantity > 0;
      });

      if (validatedItems.length !== cartData.items.length) {
        console.warn('⚠️ Some cart items were filtered out during import');
      }

      this.cart = validatedItems.map(item => ({
        ...item,
        importedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      this.saveCart();
      this.dispatchCartUpdate();

      console.log(`📥 Imported ${this.cart.length} items to cart`);
      return true;
    } catch (error) {
      console.error('❌ Error importing cart:', error);
      return false;
    }
  }

  /**
   * Backup current cart
   * @returns {string} Backup ID
   */
  createBackup() {
    const backupId = `backup_${Date.now()}`;
    const backupData = this.exportCart();

    try {
      localStorage.setItem(`polymershop-backup-${backupId}`, JSON.stringify(backupData));
      console.log(`💾 Cart backup created: ${backupId}`);
      return backupId;
    } catch (error) {
      console.error('❌ Error creating backup:', error);
      return null;
    }
  }

  /**
   * Restore cart from backup
   * @param {string} backupId - Backup ID to restore from
   * @returns {boolean} Success status
   */
  restoreBackup(backupId) {
    try {
      const backupData = localStorage.getItem(`polymershop-backup-${backupId}`);
      if (!backupData) {
        console.error('❌ Backup not found:', backupId);
        return false;
      }

      const parsedBackup = JSON.parse(backupData);
      return this.importCart(parsedBackup);
    } catch (error) {
      console.error('❌ Error restoring backup:', error);
      return false;
    }
  }

  /**
   * Get available backups
   * @returns {Array} List of available backups
   */
  getBackups() {
    const backups = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('polymershop-backup-')) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          backups.push({
            id: key.replace('polymershop-backup-', ''),
            timestamp: data.timestamp,
            itemCount: data.items.length,
            total: data.summary.total
          });
        } catch (error) {
          // Skip invalid backups
        }
      }
    }
    return backups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  /**
   * Clean up old backups
   * @param {number} keepCount - Number of backups to keep (default: 5)
   */
  cleanupBackups(keepCount = 5) {
    const backups = this.getBackups();
    if (backups.length <= keepCount) return;

    const toDelete = backups.slice(keepCount);
    toDelete.forEach(backup => {
      localStorage.removeItem(`polymershop-backup-${backup.id}`);
    });

    console.log(`🧹 Cleaned up ${toDelete.length} old backups`);
  }

  /**
   * Destroy service and clean up
   */
  destroy() {
    window.removeEventListener('storage', this.handleStorageChange);
    this.listeners = [];
    this.cart = [];
  }
}
