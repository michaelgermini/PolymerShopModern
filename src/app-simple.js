import { LitElement, html, css } from 'lit';

// Import services
import { CartService } from './services/cart-service.js';
import { ProductService } from './services/product-service.js';

// Import components
import './components/app-shell.js';
import './components/product-catalog.js';

/**
 * Simplified Main App component without decorators
 */
class PolymerShopApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #0f4c75 0%, #3282b8 25%, #bbe1fa 50%, #3282b8 75%, #0f4c75 100%);
    }

    .main-content {
      flex: 1;
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 64px;
      color: white;
    }

    .loading-spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(255,255,255,0.3);
      border-top: 4px solid #00d4aa;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 16px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  static get properties() {
    return {
      currentView: { type: String },
      cartItemCount: { type: Number },
      selectedProduct: { type: Object },
      products: { type: Array },
      isLoading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.currentView = 'catalog';
    this.cartItemCount = 0;
    this.selectedProduct = null;
    this.products = [];
    this.isLoading = true;
    this.cartService = new CartService();
    this.productService = new ProductService();
    this.initializeApp();
  }

  async initializeApp() {
    try {
      console.log('Initializing app...');
      this.products = await this.productService.getProducts();
      this.updateCartCount();
      this.isLoading = false;
      this.requestUpdate();
      console.log('App initialized successfully with', this.products.length, 'products');
    } catch (error) {
      console.error('Error initializing app:', error);
      this.isLoading = false;
    }
  }

  updateCartCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }

  handleViewChange(event) {
    const { view, product } = event.detail;
    this.currentView = view;
    this.selectedProduct = product || null;
    this.requestUpdate();
  }

  handleAddToCart(event) {
    const { product, quantity } = event.detail;
    this.cartService.addToCart(product, quantity);
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`, 'success');
    this.requestUpdate();
  }

  handleViewProduct(event) {
    const { product } = event.detail;
    this.currentView = 'product-detail';
    this.selectedProduct = product;
    this.requestUpdate();
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  render() {
    console.log('Rendering app, current view:', this.currentView, 'loading:', this.isLoading);

    return html`
      <div class="app-container">
        <app-shell
          .currentView=${this.currentView}
          .cartItemCount=${this.cartItemCount}
          @view-change=${this.handleViewChange}
        ></app-shell>

        <main class="main-content">
          ${this.renderCurrentView()}
        </main>
      </div>
    `;
  }

  renderCurrentView() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          <div class="loading-spinner"></div>
          <span>Loading products...</span>
        </div>
      `;
    }

    switch (this.currentView) {
      case 'catalog':
        return html`
          <product-catalog
            .products=${this.products}
            @add-to-cart=${this.handleAddToCart}
            @view-product=${this.handleViewProduct}
          ></product-catalog>
        `;

      case 'product-detail':
        return this.renderProductDetail();

      case 'cart':
        return this.renderCart();

      default:
        return html`
          <div style="text-align: center; padding: 64px; color: white;">
            <h2>Welcome to PolymerShop Modern</h2>
            <p>Select a view from the navigation menu above.</p>
          </div>
        `;
    }
  }

  renderProductDetail() {
    if (!this.selectedProduct) {
      return html`<p style="color: white;">Product not found</p>`;
    }

    const product = this.selectedProduct;

    return html`
      <div style="background: rgba(0,0,0,0.4); border-radius: 20px; padding: 24px; margin: 20px 0;">
        <button
          @click=${() => { this.currentView = 'catalog'; this.requestUpdate(); }}
          style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-bottom: 24px;"
        >
          ← Back to Products
        </button>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;">
          <div style="text-align: center;">
            <div style="font-size: 8rem; margin-bottom: 24px;">${product.image}</div>
          </div>

          <div>
            <h1 style="color: white; margin: 0 0 16px 0; font-size: 2.5rem;">${product.name}</h1>
            <p style="color: #b8b8b8; margin: 0 0 24px 0; font-size: 1.1rem;">${product.description}</p>
            <div style="font-size: 2rem; font-weight: bold; background: linear-gradient(45deg, #00d4aa, #3282b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 24px;">
              $${product.price.toFixed(2)}
            </div>

            <button
              @click=${() => this.handleAddToCart({ detail: { product, quantity: 1 } })}
              style="background: linear-gradient(45deg, #00d4aa, #3282b8); color: white; border: none; padding: 16px 32px; border-radius: 12px; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 12px rgba(0,212,170,0.3);"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderCart() {
    const cartItems = this.cartService.getCart();
    const total = this.cartService.getCartTotal();

    return html`
      <div style="background: rgba(0,0,0,0.4); border-radius: 20px; padding: 24px; margin: 20px 0;">
        <button
          @click=${() => { this.currentView = 'catalog'; this.requestUpdate(); }}
          style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; margin-bottom: 24px;"
        >
          ← Continue Shopping
        </button>

        <h1 style="color: white; margin: 0 0 24px 0;">Shopping Cart</h1>

        ${cartItems.length === 0 ? html`
          <div style="text-align: center; padding: 64px;">
            <div style="font-size: 5rem; margin-bottom: 24px;">🛒</div>
            <h2 style="color: white;">Your cart is empty</h2>
            <p style="color: #b8b8b8;">Discover our products and start shopping!</p>
            <button
              @click=${() => { this.currentView = 'catalog'; this.requestUpdate(); }}
              style="background: linear-gradient(45deg, #00d4aa, #3282b8); color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 1.1rem; cursor: pointer; margin-top: 16px;"
            >
              View Products
            </button>
          </div>
        ` : html`
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px;">
            <div>
              ${cartItems.map(item => html`
                <div style="display: flex; align-items: center; gap: 16px; padding: 16px; background: rgba(30,30,46,0.8); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 16px;">
                  <div style="font-size: 3rem;">${item.image}</div>
                  <div style="flex: 1;">
                    <h3 style="color: white; margin: 0 0 8px 0; font-size: 1.2rem;">${item.name}</h3>
                    <p style="margin: 0; color: #b8b8b8;">$${item.price.toFixed(2)} × ${item.quantity}</p>
                    <p style="margin: 0; font-weight: bold; color: #00d4aa;">$${ (item.price * item.quantity).toFixed(2) }</p>
                  </div>
                  <button
                    @click=${() => {
                      this.cartService.removeFromCart(item.id);
                      this.updateCartCount();
                      this.requestUpdate();
                    }}
                    style="background: rgba(244, 67, 54, 0.2); border: 1px solid rgba(244, 67, 54, 0.3); color: #f44336; padding: 8px 12px; border-radius: 8px; cursor: pointer;"
                  >
                    Remove
                  </button>
                </div>
              `)}
            </div>

            <div style="background: rgba(0,0,0,0.4); padding: 24px; border-radius: 12px;">
              <h3 style="color: white; margin: 0 0 16px 0;">Order Summary</h3>
              <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                <span style="color: #b8b8b8;">Total:</span>
                <span style="color: #00d4aa; font-size: 1.5rem; font-weight: bold;">$${total.toFixed(2)}</span>
              </div>
              <button
                @click=${() => this.showNotification('Checkout feature coming soon!', 'info')}
                style="width: 100%; background: linear-gradient(45deg, #00d4aa, #3282b8); color: white; border: none; padding: 16px; border-radius: 8px; font-size: 1.1rem; cursor: pointer; margin-top: 16px; box-shadow: 0 4px 12px rgba(0,212,170,0.3);"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        `}
      </div>
    `;
  }
}

// Register the custom element
customElements.define('polymer-shop-app', PolymerShopApp);
