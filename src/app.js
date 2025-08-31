import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Import services
import { CartService } from './services/cart-service.js';
import { ProductService } from './services/product-service.js';

// Import components
import './components/app-shell.js';
import './components/product-catalog.js';

/**
 * Main App component that orchestrates the application
 */
@customElement('polymer-shop-app')
export class PolymerShopApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
    }

    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding: 24px;
    }
  `;

  @state()
  currentView = 'catalog';

  @state()
  cartItemCount = 0;

  @state()
  selectedProduct = null;

  @state()
  products = [];

  @state()
  isLoading = true;

  constructor() {
    super();
    this.cartService = new CartService();
    this.productService = new ProductService();
    this.initializeApp();
  }

  async initializeApp() {
    try {
      this.products = await this.productService.getProducts();
      this.updateCartCount();
      this.isLoading = false;
      this.requestUpdate();
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

    if (view === 'cart') {
      // Handle cart view
    }
  }

  handleAddToCart(event) {
    const { product, quantity } = event.detail;
    this.cartService.addToCart(product, quantity);
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`, 'success');
  }

  handleViewProduct(event) {
    const { product } = event.detail;
    this.currentView = 'product-detail';
    this.selectedProduct = product;
  }

  showNotification(message, type = 'info') {
    // Simple notification system
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
        <div style="display: flex; justify-content: center; align-items: center; padding: 64px;">
          <div style="width: 48px; height: 48px; border: 4px solid #e0e0e0; border-top: 4px solid #1976d2; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
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
          <product-catalog
            .products=${this.products}
            @add-to-cart=${this.handleAddToCart}
            @view-product=${this.handleViewProduct}
          ></product-catalog>
        `;
    }
  }

  renderProductDetail() {
    if (!this.selectedProduct) {
      return html`<p>Product not found</p>`;
    }

    const product = this.selectedProduct;

    return html`
      <div style="max-width: 1200px; margin: 0 auto; padding: 24px;">
        <button
          @click=${() => this.currentView = 'catalog'}
          style="background: #e0e0e0; border: none; padding: 8px 16px; border-radius: 4px; margin-bottom: 24px; cursor: pointer;"
        >
          ← Back to Products
        </button>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start;">
          <div>
            <div style="font-size: 4rem; margin-bottom: 24px;">${product.image}</div>
          </div>

          <div>
            <h1 style="margin: 0 0 16px 0; font-size: 2.5rem;">${product.name}</h1>
            <p style="color: #666; margin: 0 0 24px 0; font-size: 1.1rem;">${product.description}</p>
            <div style="font-size: 2rem; font-weight: bold; color: #1976d2; margin-bottom: 24px;">
              $${product.price.toFixed(2)}
            </div>

            <button
              @click=${() => this.handleAddToCart({ detail: { product, quantity: 1 } })}
              style="background: #1976d2; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 1.1rem; cursor: pointer;"
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
      <div style="max-width: 1200px; margin: 0 auto; padding: 24px;">
        <button
          @click=${() => this.currentView = 'catalog'}
          style="background: #e0e0e0; border: none; padding: 8px 16px; border-radius: 4px; margin-bottom: 24px; cursor: pointer;"
        >
          ← Continue Shopping
        </button>

        <h1 style="margin: 0 0 24px 0;">Shopping Cart</h1>

        ${cartItems.length === 0 ? html`
          <div style="text-align: center; padding: 64px;">
            <div style="font-size: 4rem; margin-bottom: 24px;">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Discover our products and start shopping!</p>
            <button
              @click=${() => this.currentView = 'catalog'}
              style="background: #1976d2; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 1.1rem; cursor: pointer; margin-top: 16px;"
            >
              View Products
            </button>
          </div>
        ` : html`
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 48px;">
            <div>
              ${cartItems.map(item => html`
                <div style="display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 16px;">
                  <div style="font-size: 2rem;">${item.image}</div>
                  <div style="flex: 1;">
                    <h3 style="margin: 0 0 8px 0;">${item.name}</h3>
                    <p style="margin: 0; color: #666;">$${item.price.toFixed(2)} × ${item.quantity}</p>
                    <p style="margin: 0; font-weight: bold; color: #1976d2;">$${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    @click=${() => {
                      this.cartService.removeFromCart(item.id);
                      this.updateCartCount();
                      this.requestUpdate();
                    }}
                    style="background: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;"
                  >
                    Remove
                  </button>
                </div>
              `)}
            </div>

            <div style="background: #f5f5f5; padding: 24px; border-radius: 8px;">
              <h3 style="margin: 0 0 16px 0;">Order Summary</h3>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span>Total:</span>
                <span style="font-size: 1.5rem; font-weight: bold; color: #1976d2;">$${total.toFixed(2)}</span>
              </div>
              <button
                @click=${() => this.showNotification('Checkout feature coming soon!', 'info')}
                style="width: 100%; background: #1976d2; color: white; border: none; padding: 16px; border-radius: 8px; font-size: 1.1rem; cursor: pointer; margin-top: 16px;"
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
