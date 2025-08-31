import { LitElement, html, css } from 'lit';

/**
 * Ultra simple test component
 */
class SimpleApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      background: linear-gradient(135deg, #0f4c75 0%, #3282b8 50%, #0f4c75 100%);
      min-height: 100vh;
      color: white;
      font-family: Arial, sans-serif;
    }

    .header {
      background: rgba(255,255,255,0.1);
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .cart {
      background: #4caf50;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
    }

    .content {
      background: rgba(255,255,255,0.1);
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 24px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 16px;
      margin-top: 24px;
    }

    .product-card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 16px;
      text-align: center;
    }

    .product-image {
      font-size: 3rem;
      margin-bottom: 12px;
    }

    .product-name {
      font-weight: bold;
      margin-bottom: 8px;
    }

    .product-price {
      color: #4caf50;
      font-weight: bold;
      margin-bottom: 12px;
    }

    .add-to-cart {
      background: #2196f3;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    }

    .add-to-cart:hover {
      background: #1976d2;
    }
  `;

  static get properties() {
    return {
      cartCount: { type: Number },
      products: { type: Array }
    };
  }

  constructor() {
    super();
    this.cartCount = 0;
    this.products = [
      { id: 1, name: 'iPhone 15', price: 999, image: '📱' },
      { id: 2, name: 'MacBook Pro', price: 2499, image: '💻' },
      { id: 3, name: 'AirPods', price: 199, image: '🎧' },
      { id: 4, name: 'iPad', price: 599, image: '📱' }
    ];
  }

  addToCart(product) {
    this.cartCount++;
    this.requestUpdate();
    alert(`${product.name} added to cart!`);
  }

  render() {
    return html`
      <div class="header">
        <div class="logo">🛍️ PolymerShop</div>
        <button class="cart">🛒 Cart (${this.cartCount})</button>
      </div>

      <div class="content">
        <h1>Welcome to PolymerShop Modern! 🎉</h1>
        <p>This is a working Lit application with custom components.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <div class="content">
        <h2>Featured Products</h2>
        <div class="product-grid">
          ${this.products.map(product => html`
            <div class="product-card">
              <div class="product-image">${product.image}</div>
              <div class="product-name">${product.name}</div>
              <div class="product-price">$${product.price}</div>
              <button
                class="add-to-cart"
                @click=${() => this.addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

// Register the component
customElements.define('simple-app', SimpleApp);

/**
 * Entry point
 */
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const app = document.createElement('simple-app');
    appContainer.appendChild(app);
    console.log('Ultra simple PolymerShop app loaded successfully!');
  } else {
    console.error('App container not found!');
  }
});
