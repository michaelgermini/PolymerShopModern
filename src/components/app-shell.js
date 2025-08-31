import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// Custom Material Design-like components (temporary solution)
const style = css`
  :host {
    display: block;
    height: 100%;
  }

  .app-shell {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .top-app-bar {
    background: #1976d2;
    color: white;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }

  .top-app-bar .title {
    flex: 1;
    font-size: 1.25rem;
    font-weight: 500;
  }

  .icon-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }

  .icon-button:hover {
    background: rgba(255,255,255,0.1);
  }

  .navigation-drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background: white;
    box-shadow: 2px 0 4px rgba(0,0,0,0.2);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
  }

  .navigation-drawer.open {
    transform: translateX(0);
  }

  .drawer-header {
    padding: 16px;
    border-bottom: 1px solid #e0e0e0;
    background: #f5f5f5;
  }

  .drawer-content {
    padding: 8px 0;
  }

  .list-item {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
  }

  .list-item:hover {
    background: #f5f5f5;
  }

  .list-item.selected {
    background: #e3f2fd;
    color: #1976d2;
  }

  .list-item-icon {
    margin-right: 16px;
    font-size: 1.5rem;
  }

  .chip {
    background: #e0e0e0;
    color: #666;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.75rem;
    display: inline-flex;
    align-items: center;
  }

  .divider {
    height: 1px;
    background: #e0e0e0;
    margin: 8px 0;
  }

  .main-content {
    flex: 1;
    overflow: hidden;
  }

  .scrim {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.32);
    z-index: 999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .scrim.visible {
    opacity: 1;
    pointer-events: auto;
  }
`;

/**
 * App Shell component with navigation and top app bar
 */
@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = [style];

  @property({ type: String })
  currentView = 'catalog';

  @property({ type: Number })
  cartItemCount = 0;

  @property({ type: Boolean })
  drawerOpen = false;

  constructor() {
    super();
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleKeydown);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown(event) {
    if (event.key === 'Escape' && this.drawerOpen) {
      this.closeDrawer();
    }
  }

  openDrawer() {
    this.drawerOpen = true;
  }

  closeDrawer() {
    this.drawerOpen = false;
  }

  handleNavigation(event) {
    const view = event.currentTarget.dataset.view;
    this.dispatchEvent(new CustomEvent('view-change', {
      detail: { view },
      bubbles: true,
      composed: true
    }));
    this.closeDrawer();
  }

  handleCartClick() {
    this.dispatchEvent(new CustomEvent('view-change', {
      detail: { view: 'cart' },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="app-shell">
        <!-- Top App Bar -->
        <div class="top-app-bar">
          <button class="icon-button" @click=${this.openDrawer}>
            <span class="icon">☰</span>
          </button>

          <div class="title">PolymerShop Modern</div>

          <button class="icon-button" @click=${this.handleCartClick}>
            <span class="icon">🛒</span>
            ${this.cartItemCount > 0 ? html`
              <span class="chip">${this.cartItemCount}</span>
            ` : ''}
          </button>
        </div>

        <!-- Navigation Drawer -->
        <div class="navigation-drawer ${this.drawerOpen ? 'open' : ''}">
          <div class="drawer-header">
            <h3>PolymerShop</h3>
            <p>Modern E-commerce</p>
          </div>

          <div class="drawer-content">
            <button
              class="list-item ${this.currentView === 'catalog' ? 'selected' : ''}"
              @click=${() => this.handleNavigation({ currentTarget: { dataset: { view: 'catalog' } } })}
            >
              <span class="list-item-icon">🏪</span>
              <span>Catalog</span>
            </button>

            <button
              class="list-item ${this.currentView === 'cart' ? 'selected' : ''}"
              @click=${() => this.handleNavigation({ currentTarget: { dataset: { view: 'cart' } } })}
            >
              <span class="list-item-icon">🛒</span>
              <span>Shopping Cart</span>
              ${this.cartItemCount > 0 ? html`
                <span class="chip">${this.cartItemCount}</span>
              ` : ''}
            </button>

            <div class="divider"></div>

            <button class="list-item" @click=${this.toggleTheme}>
              <span class="list-item-icon">🌙</span>
              <span>Toggle Theme</span>
            </button>

            <button class="list-item" @click=${this.showAbout}>
              <span class="list-item-icon">ℹ️</span>
              <span>About</span>
            </button>
          </div>
        </div>

        <!-- Scrim -->
        <div
          class="scrim ${this.drawerOpen ? 'visible' : ''}"
          @click=${this.closeDrawer}
        ></div>

        <!-- Main Content -->
        <div class="main-content">
          <slot></slot>
        </div>
      </div>
    `;
  }

  toggleTheme() {
    const isDark = document.documentElement.getAttribute('color-scheme') === 'dark';
    document.documentElement.setAttribute('color-scheme', isDark ? 'light' : 'dark');
  }

  showAbout() {
    const dialog = document.createElement('md-dialog');
    dialog.innerHTML = `
      <div slot="headline">About PolymerShop Modern</div>
      <div slot="content">
        <p>A modern e-commerce application built with:</p>
        <ul>
          <li>Lit - Web Components library</li>
          <li>Material Design 3</li>
          <li>Vite - Build tool</li>
          <li>Progressive Web App features</li>
        </ul>
        <p>Version 2.0.0</p>
      </div>
      <div slot="actions">
        <md-text-button @click=${() => dialog.close()}>Close</md-text-button>
      </div>
    `;
    document.body.appendChild(dialog);
    dialog.show();
    
    dialog.addEventListener('closed', () => {
      document.body.removeChild(dialog);
    });
  }
}
