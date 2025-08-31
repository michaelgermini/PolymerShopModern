// Lit App with proper decorators configuration
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Import services
import { CartService } from './services/cart-service.js';
import { ProductService } from './services/product-service.js';

/**
 * Modern Lit-based PolymerShop Application
 */
@customElement('lit-polymershop-app')
export class LitPolymerShopApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #0f4c75 0%, #3282b8 25%, #bbe1fa 50%, #3282b8 75%, #0f4c75 100%);
      color: white;
      font-family: 'Roboto', sans-serif;
    }

    .app-container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.1);
      padding: 16px 24px;
      border-radius: 12px;
      margin-bottom: 24px;
      backdrop-filter: blur(10px);
    }

    .logo {
      font-size: 1.8rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-buttons {
      display: flex;
      gap: 12px;
    }

    .nav-btn {
      background: rgba(255,255,255,0.1);
      color: white;
      border: 1px solid rgba(255,255,255,0.2);
      padding: 10px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .nav-btn:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-1px);
    }

    .nav-btn.active {
      background: #1976d2;
      border-color: #1976d2;
    }

    .cart-btn {
      background: #4caf50;
      color: white;
      border: none;
      padding: 10px 16px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    }

    .cart-btn:hover {
      background: #45a049;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
    }

    .main-content {
      background: rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 24px;
      backdrop-filter: blur(10px);
      min-height: 600px;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 32px;
    }

    .welcome-title {
      font-size: 2.5rem;
      font-weight: 300;
      margin: 0 0 16px 0;
      background: linear-gradient(45deg, #ffffff, #bbe1fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .welcome-subtitle {
      font-size: 1.1rem;
      color: #b8b8b8;
      margin: 0 0 8px 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .timestamp {
      color: #888;
      font-size: 0.9rem;
      font-family: monospace;
    }

    .products-section {
      margin-top: 32px;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 400;
      margin: 0 0 24px 0;
      text-align: center;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }

    .product-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 20px;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
      background: rgba(255,255,255,0.08);
      border-color: rgba(255,255,255,0.2);
    }

    .product-image {
      font-size: 4rem;
      text-align: center;
      margin-bottom: 16px;
    }

    .product-name {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 8px 0;
      text-align: center;
    }

    .product-description {
      color: #b8b8b8;
      font-size: 0.9rem;
      margin: 0 0 16px 0;
      text-align: center;
      line-height: 1.4;
    }

    .product-price {
      font-size: 1.5rem;
      font-weight: 700;
      color: #4caf50;
      text-align: center;
      margin: 0 0 16px 0;
    }

    .add-to-cart-btn {
      width: 100%;
      background: linear-gradient(45deg, #2196f3, #1976d2);
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: 0 2px 8px rgba(33, 150, 243, 0.3);
    }

    .add-to-cart-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
    }

    .cart-section {
      margin-top: 32px;
    }

    .cart-empty {
      text-align: center;
      padding: 64px 24px;
    }

    .cart-empty-icon {
      font-size: 5rem;
      margin-bottom: 24px;
      opacity: 0.5;
    }

    .cart-empty h2 {
      color: white;
      margin: 0 0 16px 0;
    }

    .cart-empty p {
      color: #b8b8b8;
      margin: 0 0 24px 0;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 32px;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 16px;
      background: rgba(255,255,255,0.05);
      padding: 16px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .cart-item-image {
      font-size: 2.5rem;
      width: 60px;
      text-align: center;
    }

    .cart-item-info {
      flex: 1;
    }

    .cart-item-name {
      font-weight: 600;
      margin: 0 0 4px 0;
    }

    .cart-item-price {
      color: #b8b8b8;
      font-size: 0.9rem;
    }

    .cart-summary {
      background: rgba(255,255,255,0.05);
      padding: 24px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
      height: fit-content;
    }

    .cart-total {
      margin-bottom: 24px;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .total-row:last-child {
      border-bottom: none;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .total-amount {
      color: #4caf50;
      font-size: 1.2rem;
      font-weight: 700;
    }

    .cart-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .clear-cart-btn {
      background: #f44336;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
    }

    .clear-cart-btn:hover {
      background: #d32f2f;
      transform: translateY(-1px);
    }

    .checkout-btn {
      background: linear-gradient(45deg, #4caf50, #45a049);
      color: white;
      border: none;
      padding: 16px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    }

    .checkout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
    }

    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4caf50;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideIn 0.3s ease-out;
    }

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

    @media (max-width: 768px) {
      .app-container {
        padding: 16px;
      }

      .header {
        flex-direction: column;
        gap: 16px;
        text-align: center;
      }

      .nav-buttons {
        width: 100%;
        justify-content: center;
      }

      .products-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .cart-content {
        grid-template-columns: 1fr;
      }

      .welcome-title {
        font-size: 2rem;
      }
    }
  `;

  @property({ type: String })
  currentView = 'catalog';

  @state()
  cartCount = 0;

  @state()
  products = [];

  @state()
  filteredProducts = [];

  @state()
  searchQuery = '';

  @state()
  selectedCategory = 'all';

  @state()
  favorites = [];

  @state()
  sortBy = 'name';

  constructor() {
    super();
    this.cartService = new CartService();
    this.productService = new ProductService();

    // Listen for cart updates
    this.removeCartListener = this.cartService.addListener((data) => {
      this.updateCartCount();
      this.requestUpdate();
    });

    this.initializeApp();
  }

  async initializeApp() {
    try {
      console.log('🚀 Initializing Lit-based PolymerShop...');
      this.products = await this.productService.getProducts();
      this.filteredProducts = [...this.products];
      this.loadFavorites();
      this.updateCartCount();
      console.log('✅ App initialized with', this.products.length, 'products');

      // Log cart analytics
      const analytics = this.cartService.getAnalytics();
      if (analytics.itemCount > 0) {
        console.log('🛒 Cart analytics:', analytics);
      }
    } catch (error) {
      console.error('❌ Error initializing app:', error);
    }
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('polymershop-favorites');
      this.favorites = saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      this.favorites = [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem('polymershop-favorites', JSON.stringify(this.favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  filterAndSortProducts() {
    let filtered = [...this.products];

    // Apply search filter
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    this.filteredProducts = filtered;
  }

  updateSearch(event) {
    this.searchQuery = event.target.value;
    this.filterAndSortProducts();
  }

  updateCategory(event) {
    this.selectedCategory = event.target.value;
    this.filterAndSortProducts();
  }

  updateSort(event) {
    this.sortBy = event.target.value;
    this.filterAndSortProducts();
  }

  toggleFavorite(productId) {
    const index = this.favorites.indexOf(productId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(productId);
    }
    this.saveFavorites();
    this.requestUpdate();
  }

  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  getCategories() {
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.sort();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up cart listener
    if (this.removeCartListener) {
      this.removeCartListener();
    }
  }

  updateCartCount() {
    this.cartCount = this.cartService.getCartItemCount();
  }

  navigateTo(view) {
    this.currentView = view;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(product) {
    this.cartService.addToCart(product, 1);
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`);
  }

  clearCart() {
    const itemCount = this.cartService.getCartItemCount();
    this.cartService.clearCart();
    this.updateCartCount();
    this.showNotification(`Cart cleared! Removed ${itemCount} items.`);
  }

  updateItemQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartService.updateQuantity(productId, newQuantity);
      this.updateCartCount();
      this.requestUpdate();
      this.showNotification('Quantity updated!');
    }
  }

  removeFromCart(productId) {
    const item = this.cartService.getCartItem(productId);
    if (item) {
      this.cartService.removeFromCart(productId);
      this.updateCartCount();
      this.showNotification(`${item.name} removed from cart!`);
    }
  }

  applyDiscount(code) {
    const result = this.cartService.applyDiscount(code);
    if (result.success) {
      this.showNotification(result.message, 'success');
    } else {
      this.showNotification(result.message, 'warning');
    }
    return result;
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style based on type
    if (type === 'error') {
      notification.style.background = '#f44336';
    } else if (type === 'warning') {
      notification.style.background = '#ff9800';
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  render() {
    return html`
      <div class="app-container">
        <!-- Header -->
        <header class="header">
          <div class="logo">
            🛍️ PolymerShop Modern
          </div>

          <div class="nav-buttons">
            <button
              class="nav-btn ${this.currentView === 'catalog' ? 'active' : ''}"
              @click=${() => this.navigateTo('catalog')}
            >
              📦 Products
            </button>
            <button
              class="nav-btn ${this.currentView === 'favorites' ? 'active' : ''}"
              @click=${() => this.navigateTo('favorites')}
            >
              ❤️ Favorites (${this.favorites.length})
            </button>
            <button
              class="nav-btn ${this.currentView === 'cart' ? 'active' : ''}"
              @click=${() => this.navigateTo('cart')}
            >
              🛒 Cart (${this.cartCount})
            </button>
          </div>

          <button class="cart-btn" @click=${() => this.navigateTo('cart')}>
            🛒 Cart (${this.cartCount})
          </button>
        </header>

        <!-- Main Content -->
        <main class="main-content">
          ${this.renderCurrentView()}
        </main>
      </div>
    `;
  }

  renderCurrentView() {
    if (this.currentView === 'catalog') {
      return this.renderCatalog();
    } else if (this.currentView === 'favorites') {
      return this.renderFavorites();
    } else if (this.currentView === 'cart') {
      return this.renderCart();
    }
    return this.renderCatalog();
  }

  renderCatalog() {
    return html`
      <!-- Welcome Section -->
      <section class="welcome-section">
        <h1 class="welcome-title">🎉 Welcome to PolymerShop Modern!</h1>
        <p class="welcome-subtitle">
          Discover amazing products with our modern e-commerce experience built with Lit and Material Design.
        </p>
        <p class="timestamp">
          🕒 ${new Date().toLocaleString()}
        </p>
      </section>

      <!-- Products Section -->
      <section class="products-section">
        <h2 class="section-title">Featured Products</h2>

        <!-- Search and Filters -->
        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 24px;">
          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; margin-bottom: 16px;">
            <!-- Search -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <label style="color: white; font-size: 0.9rem; font-weight: 500;">Search Products</label>
              <input
                type="text"
                placeholder="Search by name, description..."
                .value=${this.searchQuery}
                @input=${this.updateSearch}
                style="padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.1); color: white; font-size: 1rem;"
              >
            </div>

            <!-- Category Filter -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <label style="color: white; font-size: 0.9rem; font-weight: 500;">Category</label>
              <select
                .value=${this.selectedCategory}
                @change=${this.updateCategory}
                style="padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.1); color: white; font-size: 1rem;"
              >
                <option value="all">All Categories</option>
                ${this.getCategories().map(category => html`
                  <option value=${category}>${category.charAt(0).toUpperCase() + category.slice(1)}</option>
                `)}
              </select>
            </div>

            <!-- Sort -->
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <label style="color: white; font-size: 0.9rem; font-weight: 500;">Sort By</label>
              <select
                .value=${this.sortBy}
                @change=${this.updateSort}
                style="padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.1); color: white; font-size: 1rem;"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <!-- Results count -->
          <div style="color: #b8b8b8; font-size: 0.9rem;">
            Showing ${this.filteredProducts.length} of ${this.products.length} products
          </div>
        </div>

        <div class="products-grid">
          ${this.filteredProducts.map(product => html`
            <div class="product-card" @click=${() => this.showNotification(`Clicked on ${product.name}`)}>
              <!-- Favorite button -->
              <button
                @click=${(e) => {
                  e.stopPropagation();
                  this.toggleFavorite(product.id);
                }}
                style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"
              >
                ${this.isFavorite(product.id) ? '❤️' : '🤍'}
              </button>

              <div class="product-image">${product.image}</div>
              <h3 class="product-name">${product.name}</h3>
              <p class="product-description">${product.description}</p>

              <!-- Rating -->
              <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                ${Array.from({length: 5}, (_, i) => html`
                  <span style="color: ${i < Math.floor(product.rating) ? '#ffc107' : '#ddd'};">★</span>
                `)}
                <span style="color: #b8b8b8; font-size: 0.9rem;">(${product.rating})</span>
              </div>

              <div class="product-price">$${product.price.toFixed(2)}</div>
              <button
                class="add-to-cart-btn"
                @click=${(e) => {
                  e.stopPropagation();
                  this.addToCart(product);
                }}
              >
                Add to Cart
              </button>
            </div>
          `)}
        </div>

        ${this.filteredProducts.length === 0 ? html`
          <div style="text-align: center; padding: 64px; color: #b8b8b8;">
            <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or filters</p>
            <button
              @click=${() => {
                this.searchQuery = '';
                this.selectedCategory = 'all';
                this.filterAndSortProducts();
              }}
              style="background: #2196f3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-top: 16px;"
            >
              Clear Filters
            </button>
          </div>
        ` : ''}
      </section>
    `;
  }

  renderCart() {
    const cartItems = this.cartService.getCart();
    const total = this.cartService.getCartTotal();

    if (cartItems.length === 0) {
      return html`
        <section class="cart-section">
          <div class="cart-empty">
            <div class="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Discover our amazing products and start shopping!</p>
            <button class="checkout-btn" @click=${() => this.navigateTo('catalog')}>
              Browse Products
            </button>
          </div>
        </section>
      `;
    }

    return html`
      <section class="cart-section">
        <h2 class="section-title">Shopping Cart</h2>

        <div class="cart-content">
          <div class="cart-items">
            ${cartItems.map(item => html`
              <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                  <h3 class="cart-item-name">${item.name}</h3>
                  <div class="cart-item-price">
                    $${item.price.toFixed(2)} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <!-- Quantity Controls -->
                  <div style="display: flex; align-items: center; gap: 8px; margin-top: 8px;">
                    <button
                      @click=${() => this.updateItemQuantity(item.id, item.quantity - 1)}
                      style="background: #f5f5f5; border: 1px solid #ddd; padding: 4px 8px; border-radius: 4px; cursor: pointer; min-width: 30px;"
                      ?disabled=${item.quantity <= 1}
                    >
                      -
                    </button>
                    <span style="min-width: 30px; text-align: center; font-weight: 500;">${item.quantity}</span>
                    <button
                      @click=${() => this.updateItemQuantity(item.id, item.quantity + 1)}
                      style="background: #f5f5f5; border: 1px solid #ddd; padding: 4px 8px; border-radius: 4px; cursor: pointer; min-width: 30px;"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  @click=${() => this.removeFromCart(item.id)}
                  style="background: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; align-self: flex-start;"
                >
                  Remove
                </button>
              </div>
            `)}
          </div>

          <div class="cart-summary">
            <!-- Discount Code Section -->
            <div style="margin-bottom: 20px; padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
              <h4 style="margin: 0 0 12px 0; color: white;">Discount Code</h4>
              <div style="display: flex; gap: 8px;">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  style="flex: 1; padding: 8px 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 4px; background: rgba(255,255,255,0.1); color: white;"
                  @keydown=${(e) => {
                    if (e.key === 'Enter') {
                      this.applyDiscount(e.target.value);
                      e.target.value = '';
                    }
                  }}
                >
                <button
                  @click=${() => {
                    const input = this.shadowRoot.querySelector('input[placeholder="Enter discount code"]');
                    if (input && input.value) {
                      this.applyDiscount(input.value);
                      input.value = '';
                    }
                  }}
                  style="background: #2196f3; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;"
                >
                  Apply
                </button>
              </div>
              <div style="margin-top: 8px; font-size: 0.9rem; color: #b8b8b8;">
                Try: WELCOME10, SAVE20, FREESHIP, STUDENT15
              </div>
            </div>

            <div class="cart-total">
              ${(() => {
                const summary = this.cartService.getCartSummary();
                return html`
                  <div class="total-row">
                    <span>Items (${summary.itemCount})</span>
                    <span>$${summary.subtotal.toFixed(2)}</span>
                  </div>
                  <div class="total-row">
                    <span>Shipping</span>
                    <span style="color: ${summary.isFreeShipping ? '#4caf50' : 'inherit'}">
                      ${summary.isFreeShipping ? 'Free' : `$${summary.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div class="total-row">
                    <span>Tax</span>
                    <span>$${summary.tax.toFixed(2)}</span>
                  </div>
                  ${summary.savings > 0 ? html`
                    <div class="total-row" style="color: #4caf50;">
                      <span>Savings</span>
                      <span>-$${summary.savings.toFixed(2)}</span>
                    </div>
                  ` : ''}
                  <div class="total-row">
                    <span><strong>Total</strong></span>
                    <span class="total-amount">$${summary.total.toFixed(2)}</strong></span>
                  </div>
                  ${!summary.isFreeShipping ? html`
                    <div style="margin-top: 12px; font-size: 0.9rem; color: #b8b8b8;">
                      Add $${(summary.freeShippingThreshold - summary.subtotal).toFixed(2)} more for free shipping!
                    </div>
                  ` : ''}
                `;
              })()}
            </div>

            <div class="cart-actions">
              <button class="clear-cart-btn" @click=${this.clearCart}>
                Clear Cart
              </button>
              <button
                class="checkout-btn"
                @click=${() => this.showNotification('Checkout feature coming soon!', 'warning')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderFavorites() {
    const favoriteProducts = this.products.filter(product => this.isFavorite(product.id));

    return html`
      <section class="products-section">
        <h2 class="section-title">❤️ My Favorite Products</h2>

        ${favoriteProducts.length === 0 ? html`
          <div style="text-align: center; padding: 64px; color: #b8b8b8;">
            <div style="font-size: 4rem; margin-bottom: 16px;">🤍</div>
            <h3>No favorites yet</h3>
            <p>Start exploring products and add them to your favorites!</p>
            <button
              @click=${() => this.navigateTo('catalog')}
              style="background: #2196f3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-top: 16px;"
            >
              Browse Products
            </button>
          </div>
        ` : html`
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 24px;">
            <div style="color: #b8b8b8; font-size: 0.9rem;">
              You have ${favoriteProducts.length} favorite product${favoriteProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          <div class="products-grid">
            ${favoriteProducts.map(product => html`
              <div class="product-card" @click=${() => this.showNotification(`Clicked on ${product.name}`)}>
                <!-- Favorite button -->
                <button
                  @click=${(e) => {
                    e.stopPropagation();
                    this.toggleFavorite(product.id);
                  }}
                  style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;"
                >
                  ❤️
                </button>

                <div class="product-image">${product.image}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>

                <!-- Rating -->
                <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                  ${Array.from({length: 5}, (_, i) => html`
                    <span style="color: ${i < Math.floor(product.rating) ? '#ffc107' : '#ddd'};">★</span>
                  `)}
                  <span style="color: #b8b8b8; font-size: 0.9rem;">(${product.rating})</span>
                </div>

                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button
                  class="add-to-cart-btn"
                  @click=${(e) => {
                    e.stopPropagation();
                    this.addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            `)}
          </div>
        `}
      </section>
    `;
  }
}
