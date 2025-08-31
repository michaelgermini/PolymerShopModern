import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// Custom Material Design-like components (temporary solution)
const style = css`
  :host {
    display: block;
    height: 100%;
    overflow-y: auto;
  }

  .catalog-container {
    padding: 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .catalog-header {
    margin-bottom: 32px;
    text-align: center;
  }

  .catalog-title {
    font-size: 2.5rem;
    font-weight: 400;
    color: #333;
    margin: 0 0 8px 0;
  }

  .catalog-subtitle {
    font-size: 1.1rem;
    color: #666;
    margin: 0;
  }

  .filters {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .search-field {
    min-width: 300px;
  }

  .text-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .text-field input {
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  .text-field input:focus {
    outline: none;
    border-color: #1976d2;
  }

  .text-field label {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
  }

  .select-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .select-field select {
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    background: white;
    transition: border-color 0.2s;
  }

  .select-field select:focus {
    outline: none;
    border-color: #1976d2;
  }

  .select-field label {
    font-size: 0.875rem;
    color: #666;
    font-weight: 500;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    margin-top: 24px;
  }

  .product-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: pointer;
    border: 1px solid #e0e0e0;
  }

  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }

  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
  }

  .product-info {
    padding: 16px;
  }

  .product-name {
    font-size: 1.25rem;
    font-weight: 500;
    color: #333;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .product-description {
    color: #666;
    margin: 0 0 16px 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1976d2;
    margin: 0 0 16px 0;
  }

  .product-actions {
    display: flex;
    gap: 8px;
  }

  .button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .button.filled {
    background: #1976d2;
    color: white;
  }

  .button.filled:hover {
    background: #1565c0;
    transform: translateY(-1px);
  }

  .empty-state {
    text-align: center;
    padding: 64px 24px;
    color: #666;
  }

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 16px;
    opacity: 0.5;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 64px;
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid #1976d2;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .catalog-container {
      padding: 16px;
    }

    .catalog-title {
      font-size: 2rem;
    }

    .filters {
      flex-direction: column;
      align-items: stretch;
    }

    .search-field,
    .category-filter {
      min-width: auto;
    }

    .products-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }
`;

/**
 * Product Catalog component
 */
@customElement('product-catalog')
export class ProductCatalog extends LitElement {
  static styles = [style];

  @property({ type: Array })
  products = [];

  @state()
  filteredProducts = [];

  @state()
  searchQuery = '';

  @state()
  selectedCategory = 'all';

  @state()
  isLoading = false;

  constructor() {
    super();
    this.categories = ['all', 'electronics', 'clothing', 'books', 'home', 'sports'];
  }

  updated(changedProperties) {
    if (changedProperties.has('products')) {
      this.filterProducts();
    }
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  handleSearch(event) {
    this.searchQuery = event.target.value;
    this.filterProducts();
  }

  handleCategoryChange(event) {
    this.selectedCategory = event.target.value;
    this.filterProducts();
  }

  handleAddToCart(event) {
    const { product, quantity } = event.detail;
    this.dispatchEvent(new CustomEvent('add-to-cart', {
      detail: { product, quantity },
      bubbles: true,
      composed: true
    }));
  }

  handleViewProduct(event) {
    const { product } = event.detail;
    this.dispatchEvent(new CustomEvent('view-product', {
      detail: { product },
      bubbles: true,
      composed: true
    }));
  }

  renderProductCard(product) {
    return html`
      <div class="product-card" @click=${() => this.handleViewProduct({ detail: { product } })}>
        <div class="product-image">
          ${product.image}
        </div>

        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-price">$${product.price.toFixed(2)}</div>

          <div class="product-actions">
            <button
              class="button filled"
              @click=${(e) => {
                e.stopPropagation();
                this.handleAddToCart({ detail: { product, quantity: 1 } });
              }}
            >
              <span>🛒</span>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    if (this.isLoading) {
      return html`
        <div class="loading">
          <div class="loading-spinner"></div>
        </div>
      `;
    }

    if (this.filteredProducts.length === 0) {
      return html`
        <div class="catalog-container">
          <div class="catalog-header">
            <h1 class="catalog-title">Product Catalog</h1>
            <p class="catalog-subtitle">Discover amazing products</p>
          </div>
          
          <div class="filters">
            <div class="text-field search-field">
              <label>Search products...</label>
              <input
                type="text"
                @input=${this.handleSearch}
                placeholder="Search products..."
              >
            </div>

            <div class="select-field category-filter">
              <label>Category</label>
              <select @change=${this.handleCategoryChange}>
                ${this.categories.map(category => html`
                  <option value="${category}">
                    ${category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                `)}
              </select>
            </div>
          </div>
          
          <div class="empty-state">
            <div class="empty-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try adjusting your search or category filter</p>
          </div>
        </div>
      `;
    }

    return html`
      <div class="catalog-container">
        <div class="catalog-header">
          <h1 class="catalog-title">Product Catalog</h1>
          <p class="catalog-subtitle">Discover amazing products</p>
        </div>
        
        <div class="filters">
          <div class="text-field search-field">
            <label>Search products...</label>
            <input
              type="text"
              @input=${this.handleSearch}
              placeholder="Search products..."
            >
          </div>

          <div class="select-field category-filter">
            <label>Category</label>
            <select @change=${this.handleCategoryChange}>
              ${this.categories.map(category => html`
                <option value="${category}">
                  ${category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              `)}
            </select>
          </div>
        </div>
        
        <div class="products-grid">
          ${this.filteredProducts.map(product => this.renderProductCard(product))}
        </div>
      </div>
    `;
  }
}
