// PolymerShop Fallback - Vanilla JavaScript with all features

import { CartService } from './services/cart-service.js';
import { ProductService } from './services/product-service.js';

/**
 * Fallback PolymerShop Application using vanilla JavaScript
 * Maintains all advanced features without Lit dependencies
 */
class FallbackPolymerShop {
  constructor() {
    this.cartService = new CartService();
    this.productService = new ProductService();
    this.currentView = 'catalog';
    this.products = [];
    this.filteredProducts = [];
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.favorites = [];
    this.sortBy = 'name';
    this.isLoading = true;
    this.isMenuOpen = false;
    this.priceRange = { min: 0, max: 1000 };
    this.navigationMode = 'auto'; // 'auto', 'horizontal', 'vertical', 'burger'
    this.currentNavView = 'main';

    // Slider properties
    this.currentSlide = 0;
    this.slides = [
      {
        id: 1,
        title: "New Summer Collection 2025",
        subtitle: "Up to -40% on selected items",
        buttonText: "Shop Now",
        buttonLink: "#catalog",
        background: "linear-gradient(135deg, rgba(30, 95, 116, 0.8) 0%, rgba(44, 125, 160, 0.8) 100%)",
        image: "/images/slider-summer-2025.svg",
        fallbackImage: "/images/ocean-placeholder.svg"
      },
      {
        id: 2,
        title: "Premium Electronics",
        subtitle: "Discover our latest technological innovations",
        buttonText: "Discover",
        buttonLink: "#electronics",
        background: "linear-gradient(135deg, rgba(15, 48, 87, 0.8) 0%, rgba(30, 95, 116, 0.8) 100%)",
        image: "/images/slider-electronics.svg",
        fallbackImage: "/images/electronics-placeholder.svg"
      },
      {
        id: 3,
        title: "Fashion & Lifestyle",
        subtitle: "Express your unique style with our collection",
        buttonText: "Explore",
        buttonLink: "#clothing",
        background: "linear-gradient(135deg, rgba(44, 125, 160, 0.8) 0%, rgba(77, 208, 225, 0.8) 100%)",
        image: "/images/slider-fashion.svg",
        fallbackImage: "/images/clothing-placeholder.svg"
      }
    ];
    this.sliderInterval = null;
    this.isSliderPaused = false;

    this.init();

    // Initialize slider when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeSlider());
    } else {
      this.initializeSlider();
    }
  }

  async init() {
    try {
      console.log('🚀 Initializing Fallback PolymerShop...');
      this.products = await this.productService.getProducts();
      // Preload images with fallbacks
      this.products = await this.productService.preloadImages(this.products);
      this.filteredProducts = [...this.products];
      this.loadFavorites();
      this.updateCartCount();
      this.isLoading = false;
      this.render();
      console.log('✅ Fallback app initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing fallback app:', error);
      this.showError('Failed to load products: ' + error.message);
    }
  }

  loadFavorites() {
    try {
      const saved = localStorage.getItem('polymershop-favorites');
      this.favorites = saved ? JSON.parse(saved) : [];
    } catch (error) {
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

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'name': default: return a.name.localeCompare(b.name);
      }
    });

    this.filteredProducts = filtered;
  }

  updateSearch(event) {
    this.searchQuery = event.target.value;
    this.filterAndSortProducts();
    this.render();
  }

  updateCategory(event) {
    this.selectedCategory = event.target.value;
    this.filterAndSortProducts();
    this.render();
  }

  updateSort(event) {
    this.sortBy = event.target.value;
    this.filterAndSortProducts();
    this.render();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.render();
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.render();
  }

  updatePriceRange(min, max) {
    this.priceRange = { min: parseFloat(min) || 0, max: parseFloat(max) || 1000 };
    this.filterAndSortProducts();
    this.render();
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCategory = 'all';
    this.sortBy = 'name';
    this.priceRange = { min: 0, max: 1000 };
    this.filterAndSortProducts();
    this.render();
  }

  // Navigation methods
  detectNavigationMode() {
    const width = window.innerWidth;
    if (this.navigationMode === 'auto') {
      return width >= 768 ? 'horizontal' : 'burger';
    }
    return this.navigationMode;
  }

  setNavigationView(view) {
    this.currentNavView = view;
    this.render();
  }

  toggleNavigation() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = '';
    }
    this.render();
  }

  closeNavigation() {
    this.isMenuOpen = false;
    this.currentNavView = 'main';
    document.body.style.overflow = '';
    this.render();
  }

  navigateToSection(section) {
    this.currentNavView = section;
    this.render();
  }

  goBackToMain() {
    this.currentNavView = 'main';
    this.render();
  }

  // Slider methods
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  updateSlider() {
    // Update slide indicators
    const indicators = document.querySelectorAll('.slider-indicator');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });

    // Update slide content
    const sliderContent = document.querySelector('.slider-content');
    if (sliderContent) {
      const currentSlideData = this.slides[this.currentSlide];
      sliderContent.innerHTML = this.generateSlideContent(currentSlideData);
    }
  }

  startSliderAutoPlay() {
    this.sliderInterval = setInterval(() => {
      if (!this.isSliderPaused) {
        this.nextSlide();
      }
    }, 5000); // Change slide every 5 seconds
  }

  stopSliderAutoPlay() {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
      this.sliderInterval = null;
    }
  }

  pauseSlider() {
    this.isSliderPaused = true;
  }

  resumeSlider() {
    this.isSliderPaused = false;
  }

  generateSlideContent(slide) {
    return `
      <div class="slide-content">
        <div class="slide-text">
          <h1 class="slide-title animate-slide-up">${slide.title}</h1>
          <p class="slide-subtitle animate-slide-up">${slide.subtitle}</p>
          <a href="${slide.buttonLink}" class="slide-button animate-scale-in" onclick="app.handleSlideButtonClick(event, '${slide.buttonLink}')">
            ${slide.buttonText}
            <span class="button-arrow">→</span>
          </a>
        </div>
        <div class="slide-image">
          <img src="${slide.image}" alt="${slide.title}" onerror="this.src='${slide.fallbackImage}'" loading="lazy">
        </div>
      </div>
    `;
  }

  handleSlideButtonClick(event, link) {
    event.preventDefault();
    const button = event.target.closest('.slide-button');

    // Add click animation
    button.classList.add('button-clicked');
    setTimeout(() => button.classList.remove('button-clicked'), 300);

    // Extract category from link if present
    if (link.includes('#')) {
      const category = link.replace('#', '');
      if (category && category !== 'catalog') {
        // Set category filter
        this.selectedCategory = category;
        // Update search/filter inputs
        setTimeout(() => {
          const categorySelect = document.querySelector('select');
          if (categorySelect) {
            categorySelect.value = category;
            this.updateCategory({ target: { value: category } });
          }
        }, 100);
      }
      this.navigateTo('catalog');
      this.closeNavigation();

      // Smooth scroll to catalog section
      setTimeout(() => {
        const catalogSection = document.querySelector('.product-catalog');
        if (catalogSection) {
          catalogSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }

    // Add ripple effect
    this.createRippleEffect(event, button);
  }

  // Create ripple effect for buttons
  createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
      z-index: 1;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }

  // Initialize slider functionality
  initializeSlider() {
    // Start auto-play
    this.startSliderAutoPlay();

    // Add hover pause/resume
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      heroSlider.addEventListener('mouseenter', () => this.pauseSlider());
      heroSlider.addEventListener('mouseleave', () => this.resumeSlider());
    }

    // Keep only basic arrow navigation for accessibility
    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        this.prevSlide();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        this.nextSlide();
      }
    });

    // Add touch/swipe support for mobile
    this.addTouchSupport();

    console.log('🎠 Hero slider initialized with auto-play and interactions');
  }

  // Add touch/swipe support
  addTouchSupport() {
    let startX = 0;
    let endX = 0;

    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    slider.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
      this.pauseSlider(); // Pause during swipe
    });

    slider.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      this.handleSwipe(startX, endX);
      this.resumeSlider(); // Resume after swipe
    });
  }

  // Handle swipe gestures
  handleSwipe(startX, endX) {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.prevSlide();
      }
    }
  }

  // Dropdown management
  toggleCategoriesDropdown(event) {
    event.preventDefault();
    const dropdown = event.target.closest('.nav-dropdown');
    const isOpen = dropdown.classList.contains('open');

    // Close all dropdowns first
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));

    if (!isOpen) {
      dropdown.classList.add('open');
    }
  }

  // Close dropdowns when clicking outside
  handleDropdownClickOutside(event) {
    if (!event.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
    }
  }

  toggleFavorite(productId) {
    const index = this.favorites.indexOf(productId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(productId);
    }
    this.saveFavorites();
    this.showNotification(`Product ${index > -1 ? 'removed from' : 'added to'} favorites!`);
    this.render();
  }

  isFavorite(productId) {
    return this.favorites.includes(productId);
  }

  getCategories() {
    return [...new Set(this.products.map(p => p.category))].sort();
  }

  getCategoryIcon(category) {
    const icons = {
      electronics: '💻',
      clothing: '👕',
      home: '🏠',
      sports: '⚽'
    };
    return icons[category] || '📦';
  }

  // Navigation menu generation
  generateNavigationMenu() {
    const navMode = this.detectNavigationMode();

    if (navMode === 'horizontal') {
      return this.generateHorizontalMenu();
    } else if (navMode === 'vertical') {
      return this.generateVerticalMenu();
    } else {
      return this.generateBurgerMenu();
    }
  }

  generateHorizontalMenu() {
    const menu = document.createElement('nav');
    menu.className = 'horizontal-nav animate-fade-in';
    menu.innerHTML = `
      <div class="nav-container">
        <div class="nav-main">
          <a href="#" class="nav-link ${this.currentView === 'catalog' ? 'active' : ''}" onclick="app.navigateTo('catalog')">
            <span class="nav-icon">📦</span>
            <span class="nav-text">Products</span>
          </a>
          <a href="#" class="nav-link ${this.currentView === 'favorites' ? 'active' : ''}" onclick="app.navigateTo('favorites')">
            <span class="nav-icon">❤️</span>
            <span class="nav-text">Favorites</span>
            <span class="nav-badge">${this.favorites.length}</span>
          </a>
          <div class="nav-dropdown">
            <a href="#" class="nav-link dropdown-toggle" onclick="app.toggleCategoriesDropdown(event)">
              <span class="nav-icon">🏷️</span>
              <span class="nav-text">Categories</span>
              <span class="dropdown-arrow">▼</span>
            </a>
            <div class="dropdown-menu">
              ${this.getCategories().map(category => `
                <a href="#" class="dropdown-item" onclick="app.updateCategory({target:{value:'${category}'}}); app.navigateTo('catalog');">
                  <span class="category-icon">${this.getCategoryIcon(category)}</span>
                  <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  <span class="item-count">${this.products.filter(p => p.category === category).length}</span>
                </a>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="nav-actions">
          <a href="#" class="nav-link" onclick="showNotification('Search feature coming soon!', 'info')">
            <span class="nav-icon">🔍</span>
            <span class="nav-text">Search</span>
          </a>
          <a href="#" class="nav-link cart-link ${this.currentView === 'cart' ? 'active' : ''}" onclick="app.navigateTo('cart')">
            <span class="nav-icon">🛒</span>
            <span class="nav-text">Cart</span>
            <span class="nav-badge">${this.cartService.getCartItemCount()}</span>
          </a>
        </div>
      </div>
    `;
    return menu;
  }

  generateVerticalMenu() {
    const menu = document.createElement('nav');
    menu.className = 'vertical-nav animate-slide-up';
    menu.innerHTML = `
      <div class="vertical-nav-content">
        <div class="nav-section">
          <div class="nav-section-title">Navigation</div>
          <a href="#" class="vertical-nav-link ${this.currentView === 'catalog' ? 'active' : ''}" onclick="app.navigateTo('catalog')">
            <span class="nav-icon">📦</span>
            <span>Products</span>
            <span class="nav-count">${this.products.length}</span>
          </a>
          <a href="#" class="vertical-nav-link ${this.currentView === 'favorites' ? 'active' : ''}" onclick="app.navigateTo('favorites')">
            <span class="nav-icon">❤️</span>
            <span>Favorites</span>
            <span class="nav-count">${this.favorites.length}</span>
          </a>
          <a href="#" class="vertical-nav-link ${this.currentView === 'cart' ? 'active' : ''}" onclick="app.navigateTo('cart')">
            <span class="nav-icon">🛒</span>
            <span>Shopping Cart</span>
            <span class="nav-count">${this.cartService.getCartItemCount()}</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-section-title">Categories</div>
          ${this.getCategories().map(category => `
            <a href="#" class="vertical-nav-link" onclick="app.updateCategory({target:{value:'${category}'}}); app.navigateTo('catalog');">
              <span class="nav-icon">${this.getCategoryIcon(category)}</span>
              <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
              <span class="nav-count">${this.products.filter(p => p.category === category).length}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
    return menu;
  }

  generateBurgerMenu() {
    const menu = document.createElement('nav');
    menu.className = `burger-nav ${this.isMenuOpen ? 'open' : ''}`;
    menu.innerHTML = `
      <div class="burger-nav-overlay ${this.isMenuOpen ? 'visible' : ''}" onclick="app.closeNavigation()"></div>
      <div class="burger-nav-content ${this.isMenuOpen ? 'visible' : ''}">
        ${this.generateBurgerMenuContent()}
      </div>
    `;
    return menu;
  }

  generateBurgerMenuContent() {
    if (this.currentNavView === 'main') {
      return `
        <div class="burger-nav-header">
          <div class="nav-logo">🛍️ PolymerShop</div>
          <button class="nav-close" onclick="app.closeNavigation()">✕</button>
        </div>

        <div class="burger-nav-menu">
          <a href="#" class="burger-nav-item ${this.currentView === 'catalog' ? 'active' : ''}" onclick="app.navigateTo('catalog'); app.closeNavigation();">
            <span class="item-icon">📦</span>
            <span class="item-text">Products</span>
            <span class="item-count">${this.products.length}</span>
          </a>

          <a href="#" class="burger-nav-item ${this.currentView === 'favorites' ? 'active' : ''}" onclick="app.navigateTo('favorites'); app.closeNavigation();">
            <span class="item-icon">❤️</span>
            <span class="item-text">Favorites</span>
            <span class="item-count">${this.favorites.length}</span>
          </a>

          <a href="#" class="burger-nav-item ${this.currentView === 'cart' ? 'active' : ''}" onclick="app.navigateTo('cart'); app.closeNavigation();">
            <span class="item-icon">🛒</span>
            <span class="item-text">Cart</span>
            <span class="item-count">${this.cartService.getCartItemCount()}</span>
          </a>

          <div class="nav-divider"></div>

          <a href="#" class="burger-nav-item" onclick="app.navigateToSection('categories')">
            <span class="item-icon">🏷️</span>
            <span class="item-text">Categories</span>
            <span class="item-arrow">›</span>
          </a>

          <a href="#" class="burger-nav-item" onclick="app.navigateToSection('account')">
            <span class="item-icon">👤</span>
            <span class="item-text">Account</span>
            <span class="item-arrow">›</span>
          </a>

          <a href="#" class="burger-nav-item" onclick="showNotification('Search feature coming soon!', 'info')">
            <span class="item-icon">🔍</span>
            <span class="item-text">Search</span>
          </a>
        </div>
      `;
    } else if (this.currentNavView === 'categories') {
      return `
        <div class="burger-nav-header">
          <button class="nav-back" onclick="app.goBackToMain()">‹</button>
          <div class="nav-title">Categories</div>
          <button class="nav-close" onclick="app.closeNavigation()">✕</button>
        </div>

        <div class="burger-nav-menu">
          ${this.getCategories().map(category => `
            <a href="#" class="burger-nav-item category-item" onclick="app.updateCategory({target:{value:'${category}'}}); app.navigateTo('catalog'); app.closeNavigation();">
              <span class="item-icon">${this.getCategoryIcon(category)}</span>
              <span class="item-text">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
              <span class="item-count">${this.products.filter(p => p.category === category).length}</span>
            </a>
          `).join('')}
        </div>
      `;
    } else if (this.currentNavView === 'account') {
      return `
        <div class="burger-nav-header">
          <button class="nav-back" onclick="app.goBackToMain()">‹</button>
          <div class="nav-title">Account</div>
          <button class="nav-close" onclick="app.closeNavigation()">✕</button>
        </div>

        <div class="burger-nav-menu">
          <a href="#" class="burger-nav-item" onclick="showNotification('Login feature coming soon!', 'info')">
            <span class="item-icon">🔐</span>
            <span class="item-text">Sign In</span>
          </a>

          <a href="#" class="burger-nav-item" onclick="showNotification('Registration coming soon!', 'info')">
            <span class="item-icon">📝</span>
            <span class="item-text">Sign Up</span>
          </a>

          <div class="nav-divider"></div>

          <a href="#" class="burger-nav-item" onclick="showNotification('Orders page coming soon!', 'info')">
            <span class="item-icon">📋</span>
            <span class="item-text">My Orders</span>
          </a>

          <a href="#" class="burger-nav-item" onclick="showNotification('Settings page coming soon!', 'info')">
            <span class="item-icon">⚙️</span>
            <span class="item-text">Settings</span>
          </a>
        </div>
      `;
    }
    return '';
  }

  updateCartCount() {
    // This will be called when cart updates
  }

  navigateTo(view) {
    this.currentView = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.render();
  }

  addToCart(product) {
    this.cartService.addToCart(product, 1);
    this.showNotification(`${product.name} added to cart!`);
    this.render();
  }

  removeFromCart(productId) {
    const item = this.cartService.getCartItem(productId);
    if (item) {
      this.cartService.removeFromCart(productId);
      this.showNotification(`${item.name} removed from cart!`);
      this.render();
    }
  }

  updateItemQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartService.updateQuantity(productId, quantity);
      this.render();
    }
  }

  clearCart() {
    const itemCount = this.cartService.getCartItemCount();
    this.cartService.clearCart();
    this.showNotification(`Cart cleared! Removed ${itemCount} items.`);
    this.render();
  }

  applyDiscount(code) {
    const result = this.cartService.applyDiscount(code);
    if (result.success) {
      this.showNotification(result.message);
    } else {
      this.showNotification(result.message, 'warning');
    }
    this.render();
    return result;
  }

  showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification-enter ${type === 'success' ? 'notification-success' : type === 'warning' ? 'notification-warning' : 'notification-error'}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : '❌'}</span>
        <span class="notification-text">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
      </div>
    `;

    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
      .notification-enter {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        min-width: 300px;
        max-width: 400px;
      }

      .notification-success {
        background: linear-gradient(135deg, #4caf50, #45a049);
        color: white;
      }

      .notification-warning {
        background: linear-gradient(135deg, #ff9800, #f57c00);
        color: white;
      }

      .notification-error {
        background: linear-gradient(135deg, #f44336, #d32f2f);
        color: white;
      }

      .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.1);
      }

      .notification-icon {
        font-size: 1.2rem;
        flex-shrink: 0;
      }

      .notification-text {
        flex: 1;
        font-size: 0.95rem;
        line-height: 1.4;
      }

      .notification-close {
        background: none;
        border: none;
        color: currentColor;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s;
        flex-shrink: 0;
      }

      .notification-close:hover {
        background: rgba(255,255,255,0.2);
      }

      @media (max-width: 768px) {
        .notification-enter {
          left: 20px;
          right: 20px;
          min-width: auto;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.className = 'notification-exit';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
          }
        }, 300);
      }
    }, 4000);
  }

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      padding: 20px;
      background: #ffebee;
      border: 2px solid #f44336;
      border-radius: 8px;
      margin: 20px;
      color: #c62828;
    `;
    errorDiv.innerHTML = `<h2>❌ Error</h2><p>${message}</p>`;
    document.getElementById('app').appendChild(errorDiv);
  }

  render() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = '';

    // Hero Slider
    const heroSlider = document.createElement('section');
    heroSlider.className = 'hero-slider';
    heroSlider.innerHTML = `
      <div class="slider-container">
        <div class="slider-wrapper">
          <div class="slider-content">
            ${this.generateSlideContent(this.slides[this.currentSlide])}
          </div>

          <!-- Navigation Arrows -->
          <button class="slider-arrow slider-arrow-prev" onclick="app.prevSlide()" aria-label="Previous slide">
            <span class="arrow-icon">⟵</span>
          </button>
          <button class="slider-arrow slider-arrow-next" onclick="app.nextSlide()" aria-label="Next slide">
            <span class="arrow-icon">⟶</span>
          </button>

          <!-- Slide Indicators -->
          <div class="slider-indicators">
            ${this.slides.map((_, index) => `
              <button
                class="slider-indicator ${index === this.currentSlide ? 'active' : ''}"
                onclick="app.goToSlide(${index})"
                aria-label="Go to slide ${index + 1}"
              ></button>
            `).join('')}
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="slider-progress">
          <div class="progress-bar" style="animation-duration: ${this.slides.length * 5}s"></div>
        </div>
      </div>
    `;

    app.appendChild(heroSlider);

    // Overlay for mobile menu
    if (this.isMenuOpen) {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        backdrop-filter: blur(2px);
      `;
      overlay.onclick = () => this.closeMenu();
      app.appendChild(overlay);
    }

    // Sidebar Menu
    const sidebar = document.createElement('div');
    sidebar.className = `shop-sidebar ${this.isMenuOpen ? 'open' : ''}`;
    sidebar.innerHTML = `
      <div class="sidebar-header">
        <div class="sidebar-logo">🛍️ PolymerShop</div>
        <button class="sidebar-close" onclick="app.closeMenu()">✕</button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <div class="nav-title">Navigation</div>
          <a href="#" class="nav-link ${this.currentView === 'catalog' ? 'active' : ''}" onclick="app.navigateTo('catalog'); app.closeMenu();">
            <span class="nav-icon">📦</span>
            <span>All Products</span>
            <span class="nav-count">${this.products.length}</span>
          </a>
          <a href="#" class="nav-link ${this.currentView === 'favorites' ? 'active' : ''}" onclick="app.navigateTo('favorites'); app.closeMenu();">
            <span class="nav-icon">❤️</span>
            <span>Favorites</span>
            <span class="nav-count">${this.favorites.length}</span>
          </a>
          <a href="#" class="nav-link ${this.currentView === 'cart' ? 'active' : ''}" onclick="app.navigateTo('cart'); app.closeMenu();">
            <span class="nav-icon">🛒</span>
            <span>Shopping Cart</span>
            <span class="nav-count">${this.cartService.getCartItemCount()}</span>
          </a>
        </div>

        <div class="nav-section">
          <div class="nav-title">Categories</div>
          <a href="#" class="nav-link ${this.selectedCategory === 'all' ? 'active' : ''}" onclick="app.updateCategory({target:{value:'all'}}); app.closeMenu();">
            <span class="nav-icon">🔍</span>
            <span>All Categories</span>
          </a>
          ${this.getCategories().map(category => `
            <a href="#" class="nav-link ${this.selectedCategory === category ? 'active' : ''}" onclick="app.updateCategory({target:{value:'${category}'}}); app.closeMenu();">
              <span class="nav-icon">${this.getCategoryIcon(category)}</span>
              <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
              <span class="nav-count">${this.products.filter(p => p.category === category).length}</span>
            </a>
          `).join('')}
        </div>

        <div class="nav-section">
          <div class="nav-title">Quick Filters</div>
          <div class="filter-group">
            <label class="filter-label">Price Range</label>
            <div class="price-inputs">
              <input type="number" class="price-input" placeholder="Min" value="${this.priceRange.min}" onchange="app.updatePriceRange(this.value, app.priceRange.max)">
              <span>-</span>
              <input type="number" class="price-input" placeholder="Max" value="${this.priceRange.max}" onchange="app.updatePriceRange(app.priceRange.min, this.value)">
            </div>
          </div>

          <button class="filter-btn clear-filters" onclick="app.clearFilters(); app.closeMenu();">
            <span class="nav-icon">🧹</span>
            Clear All Filters
          </button>
        </div>

        <div class="nav-section">
          <div class="nav-title">Account</div>
          <a href="#" class="nav-link" onclick="app.showNotification('Login feature coming soon!', 'warning')">
            <span class="nav-icon">👤</span>
            <span>My Account</span>
          </a>
          <a href="#" class="nav-link" onclick="app.showNotification('Orders feature coming soon!', 'warning')">
            <span class="nav-icon">📋</span>
            <span>My Orders</span>
          </a>
          <a href="#" class="nav-link" onclick="app.showNotification('Settings feature coming soon!', 'warning')">
            <span class="nav-icon">⚙️</span>
            <span>Settings</span>
          </a>
        </div>
      </nav>
    `;

    // Header with adaptive navigation
    const header = document.createElement('div');
    header.className = 'shop-header animate-fade-in';
    const navMode = this.detectNavigationMode();

    if (navMode === 'horizontal') {
      // Horizontal navigation for desktop
      header.innerHTML = `
        <div class="header-main">
          <div class="header-logo">
            🛍️ PolymerShop Modern
          </div>
          ${this.generateNavigationMenu().outerHTML}
        </div>
      `;
    } else if (navMode === 'vertical') {
      // Vertical navigation layout
      header.innerHTML = `
        <div class="header-main">
          <button class="menu-toggle" onclick="app.toggleNavigation()">
            <span class="menu-icon">☰</span>
            <span class="menu-text">Menu</span>
          </button>

          <div class="header-logo">
            🛍️ PolymerShop Modern
          </div>

          <div class="header-actions">
            <button class="header-btn" onclick="app.navigateTo('favorites')" title="Favorites">
              ❤️ <span class="count">${this.favorites.length}</span>
            </button>
            <button class="header-btn cart-btn" onclick="app.navigateTo('cart')" title="Shopping Cart">
              🛒 <span class="count">${this.cartService.getCartItemCount()}</span>
            </button>
          </div>
        </div>
      `;

      // Add vertical menu
      const verticalMenu = this.generateVerticalMenu();
      app.appendChild(verticalMenu);
    } else {
      // Burger menu for mobile
      header.innerHTML = `
        <div class="header-main">
          <button class="menu-toggle" onclick="app.toggleNavigation()">
            <span class="menu-icon">☰</span>
            <span class="menu-text">Menu</span>
          </button>

          <div class="header-logo">
            🛍️ PolymerShop Modern
          </div>

          <div class="header-actions">
            <button class="header-btn" onclick="app.navigateTo('favorites')" title="Favorites">
              ❤️ <span class="count">${this.favorites.length}</span>
            </button>
            <button class="header-btn cart-btn" onclick="app.navigateTo('cart')" title="Shopping Cart">
              🛒 <span class="count">${this.cartService.getCartItemCount()}</span>
            </button>
          </div>
        </div>
      `;

      // Add burger menu
      const burgerMenu = this.generateBurgerMenu();
      app.appendChild(burgerMenu);
    }

    // Main content container
    const mainContainer = document.createElement('div');
    mainContainer.className = 'main-container';

    const mainContent = document.createElement('div');
    mainContent.className = 'main-content';

    if (this.isLoading) {
      mainContent.innerHTML = `
        <div class="loading-container animate-fade-in">
          <div class="loading-spinner"></div>
          <p>Loading PolymerShop<span class="loading-dots">
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
            <span class="loading-dot"></span>
          </span></p>
        </div>
      `;
    } else if (this.currentView === 'catalog') {
      mainContent.appendChild(this.renderCatalog());
    } else if (this.currentView === 'favorites') {
      mainContent.appendChild(this.renderFavorites());
    } else if (this.currentView === 'cart') {
      mainContent.appendChild(this.renderCart());
    }

    mainContainer.appendChild(mainContent);

    // Footer
    const footer = document.createElement('footer');
    footer.className = 'shop-footer animate-slide-up';
    footer.innerHTML = `
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-logo">
            🛍️ PolymerShop
          </div>
          <p class="footer-description">
            Your modern e-commerce destination for quality products with exceptional customer service.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" title="Facebook" onclick="showNotification('Facebook page coming soon!', 'info')">
              📘 Facebook
            </a>
            <a href="#" class="social-link" title="Twitter" onclick="showNotification('Twitter page coming soon!', 'info')">
              🐦 Twitter
            </a>
            <a href="#" class="social-link" title="Instagram" onclick="showNotification('Instagram page coming soon!', 'info')">
              📷 Instagram
            </a>
            <a href="#" class="social-link" title="LinkedIn" onclick="showNotification('LinkedIn page coming soon!', 'info')">
              💼 LinkedIn
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#" onclick="app.navigateTo('catalog'); app.closeMenu();">🏠 Home</a></li>
            <li><a href="#" onclick="app.navigateTo('catalog'); app.closeMenu();">📦 Products</a></li>
            <li><a href="#" onclick="app.navigateTo('favorites'); app.closeMenu();">❤️ Favorites</a></li>
            <li><a href="#" onclick="app.navigateTo('cart'); app.closeMenu();">🛒 Cart</a></li>
            <li><a href="#" onclick="showNotification('About page coming soon!', 'info')">ℹ️ About Us</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Categories</h4>
          <ul class="footer-links">
            <li><a href="#" onclick="app.updateCategory({target:{value:'electronics'}}); app.navigateTo('catalog'); app.closeMenu();">💻 Electronics</a></li>
            <li><a href="#" onclick="app.updateCategory({target:{value:'clothing'}}); app.navigateTo('catalog'); app.closeMenu();">👕 Clothing</a></li>
            <li><a href="#" onclick="app.updateCategory({target:{value:'home'}}); app.navigateTo('catalog'); app.closeMenu();">🏠 Home & Garden</a></li>
            <li><a href="#" onclick="app.updateCategory({target:{value:'sports'}}); app.navigateTo('catalog'); app.closeMenu();">⚽ Sports</a></li>
            <li><a href="#" onclick="app.updateCategory({target:{value:'all'}}); app.navigateTo('catalog'); app.closeMenu();">🔍 All Categories</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h4 class="footer-title">Customer Service</h4>
          <ul class="footer-links">
            <li><a href="#" onclick="showNotification('Contact page coming soon!', 'info')">📞 Contact Us</a></li>
            <li><a href="#" onclick="showNotification('FAQ page coming soon!', 'info')">❓ FAQ</a></li>
            <li><a href="#" onclick="showNotification('Shipping info coming soon!', 'info')">🚚 Shipping Info</a></li>
            <li><a href="#" onclick="showNotification('Returns policy coming soon!', 'info')">↩️ Returns</a></li>
            <li><a href="#" onclick="showNotification('Size guide coming soon!', 'info')">📏 Size Guide</a></li>
          </ul>
        </div>

        <div class="footer-section newsletter-section">
          <h4 class="footer-title">Stay Updated</h4>
          <p class="newsletter-description">
            Subscribe to our newsletter for the latest products and exclusive offers.
          </p>
          <div class="newsletter-form">
            <input
              type="email"
              class="newsletter-input focus-glow"
              placeholder="Enter your email"
              id="newsletter-email"
            >
            <button
              class="newsletter-btn btn-bounce btn-glow focus-glow"
              onclick="subscribeNewsletter()"
            >
              Subscribe
            </button>
          </div>
          <div class="newsletter-features">
            <span class="feature-item">✅ Exclusive deals</span>
            <span class="feature-item">✅ New product alerts</span>
            <span class="feature-item">✅ Unsubscribe anytime</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            © ${new Date().getFullYear()} PolymerShop Modern. All rights reserved.
          </div>
          <div class="footer-legal">
            <a href="#" onclick="showNotification('Privacy Policy coming soon!', 'info')">Privacy Policy</a>
            <span class="separator">|</span>
            <a href="#" onclick="showNotification('Terms of Service coming soon!', 'info')">Terms of Service</a>
            <span class="separator">|</span>
            <a href="#" onclick="showNotification('Cookie Policy coming soon!', 'info')">Cookie Policy</a>
          </div>
          <div class="footer-badges">
            <span class="badge secure">🔒 Secure Payment</span>
            <span class="badge fast">⚡ Fast Shipping</span>
            <span class="badge support">💬 24/7 Support</span>
          </div>
        </div>
      </div>
    `;

    // Navigation and UI interaction script
    const navigationScript = document.createElement('script');
    navigationScript.textContent = `
      // Global navigation functions
      window.app = ${JSON.stringify({
        isMenuOpen: this.isMenuOpen,
        currentView: this.currentView,
        currentNavView: this.currentNavView,
        favorites: this.favorites,
        products: this.products.length,
        cartCount: this.cartService.getCartItemCount()
      })};

      // Newsletter subscription function
      function subscribeNewsletter() {
        const email = document.getElementById('newsletter-email').value;
        if (!email) {
          showNotification('Please enter your email address', 'warning');
          return;
        }

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          showNotification('Please enter a valid email address', 'error');
          return;
        }

        // Simulate subscription
        showNotification('✅ Thank you for subscribing! Check your email for confirmation.', 'success');
        document.getElementById('newsletter-email').value = '';

        // Here you would typically send the email to your backend
        console.log('Newsletter subscription:', email);
      }

      // Navigation functions
      function toggleNavigation() {
        window.appInstance.toggleNavigation();
      }

      function closeNavigation() {
        window.appInstance.closeNavigation();
      }

      function navigateTo(view) {
        window.appInstance.navigateTo(view);
      }

      function navigateToSection(section) {
        window.appInstance.navigateToSection(section);
      }

      function goBackToMain() {
        window.appInstance.goBackToMain();
      }

      function toggleCategoriesDropdown(event) {
        window.appInstance.toggleCategoriesDropdown(event);
      }

      // Initialize navigation event listeners
      document.addEventListener('DOMContentLoaded', () => {
        // Newsletter enter key support
        const newsletterInput = document.getElementById('newsletter-email');
        if (newsletterInput) {
          newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
              subscribeNewsletter();
            }
          });
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', (event) => {
          if (window.appInstance) {
            window.appInstance.handleDropdownClickOutside(event);
          }
        });

        // Handle escape key for menus
        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            if (window.appInstance) {
              window.appInstance.closeNavigation();
            }
          }
        });

        // Handle window resize for adaptive navigation
        let resizeTimeout;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (window.appInstance) {
              // Force re-render to adapt navigation mode
              window.appInstance.render();
            }
          }, 250);
        });

        // Swipe gestures for mobile menu
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
        });

        function handleSwipe() {
          const swipeThreshold = 50;
          const swipeDistance = touchEndX - touchStartX;

          if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && window.appInstance && !window.appInstance.isMenuOpen) {
              // Swipe right to open menu
              window.appInstance.toggleNavigation();
            } else if (swipeDistance < 0 && window.appInstance && window.appInstance.isMenuOpen) {
              // Swipe left to close menu
              window.appInstance.closeNavigation();
            }
          }
        }

        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
          // Ctrl/Cmd + / to toggle menu
          if ((event.ctrlKey || event.metaKey) && event.key === '/') {
            event.preventDefault();
            if (window.appInstance) {
              window.appInstance.toggleNavigation();
            }
          }

          // Alt + C for cart
          if (event.altKey && event.key === 'c') {
            event.preventDefault();
            navigateTo('cart');
          }

          // Alt + F for favorites
          if (event.altKey && event.key === 'f') {
            event.preventDefault();
            navigateTo('favorites');
          }

          // Alt + H for home/catalog
          if (event.altKey && event.key === 'h') {
            event.preventDefault();
            navigateTo('catalog');
          }
        });

        console.log('🎯 Navigation system initialized');
        console.log('💡 Keyboard shortcuts:');
        console.log('   • Ctrl/Cmd + / : Toggle menu');
        console.log('   • Alt + C : Go to cart');
        console.log('   • Alt + F : Go to favorites');
        console.log('   • Alt + H : Go to home');
        console.log('   • Escape : Close menu');
      });
    `;

    // Add comprehensive styles
    const style = document.createElement('style');
    style.textContent = `
      /* Shop Header Styles */
      .shop-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: rgba(255,255,255,0.1);
        padding: 16px 24px;
        border-radius: 12px;
        margin-bottom: 24px;
        backdrop-filter: blur(10px);
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .menu-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        font-size: 0.9rem;
      }

      .menu-toggle:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-1px);
      }

      .header-logo {
        font-size: 1.8rem;
        font-weight: bold;
        color: white;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      }

      .header-actions {
        display: flex;
        gap: 8px;
      }

      .header-btn {
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        padding: 10px 14px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s;
        position: relative;
        font-size: 1.1rem;
      }

      .header-btn:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-1px);
      }

      .header-btn .count {
        background: #ff4081;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 0.7rem;
        font-weight: bold;
        margin-left: 4px;
        min-width: 18px;
        text-align: center;
      }

      .cart-btn {
        background: linear-gradient(45deg, #2196f3, #1976d2);
        border-color: #2196f3;
      }

      .cart-btn:hover {
        background: linear-gradient(45deg, #1976d2, #1565c0);
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
      }

      /* Sidebar Styles */
      .shop-sidebar {
        position: fixed;
        top: 0;
        left: -320px;
        width: 300px;
        height: 100vh;
        background: rgba(255,255,255,0.95);
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255,255,255,0.2);
        z-index: 1001;
        transition: left 0.3s ease;
        overflow-y: auto;
        box-shadow: 4px 0 20px rgba(0,0,0,0.1);
      }

      .shop-sidebar.open {
        left: 0;
      }

      .sidebar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .sidebar-logo {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .sidebar-close {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.3s;
      }

      .sidebar-close:hover {
        background: rgba(255,255,255,0.3);
      }

      .sidebar-nav {
        padding: 20px 0;
      }

      .nav-section {
        margin-bottom: 24px;
      }

      .nav-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        padding: 0 20px;
        margin-bottom: 12px;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 20px;
        color: #333;
        text-decoration: none;
        transition: all 0.3s;
        border-left: 3px solid transparent;
      }

      .nav-link:hover {
        background: rgba(102, 126, 234, 0.1);
        border-left-color: #667eea;
        color: #667eea;
      }

      .nav-link.active {
        background: rgba(102, 126, 234, 0.15);
        border-left-color: #667eea;
        color: #667eea;
        font-weight: 600;
      }

      .nav-icon {
        font-size: 1.2rem;
        width: 24px;
        text-align: center;
      }

      .nav-count {
        margin-left: auto;
        background: #e0e0e0;
        color: #666;
        border-radius: 12px;
        padding: 2px 8px;
        font-size: 0.8rem;
        font-weight: 600;
        min-width: 24px;
        text-align: center;
      }

      .nav-link.active .nav-count {
        background: #667eea;
        color: white;
      }

      /* Filter Styles */
      .filter-group {
        padding: 0 20px;
        margin-bottom: 16px;
      }

      .filter-label {
        display: block;
        font-size: 0.9rem;
        font-weight: 600;
        color: #666;
        margin-bottom: 8px;
      }

      .price-inputs {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .price-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 0.9rem;
        background: white;
      }

      .price-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
      }

      .filter-btn {
        width: calc(100% - 40px);
        margin: 0 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .filter-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }

      .clear-filters {
        background: linear-gradient(45deg, #ff6b6b, #ee5a52);
      }

      .clear-filters:hover {
        background: linear-gradient(45deg, #ee5a52, #dc4545);
        box-shadow: 0 4px 12px rgba(238, 90, 82, 0.3);
      }

      /* Main Content Styles */
      .main-container {
        display: flex;
        gap: 24px;
        width: 100%;
      }

      .main-content {
        flex: 1;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 24px;
        backdrop-filter: blur(10px);
        min-height: 600px;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 64px;
        text-align: center;
      }

      .loading-container p {
        color: #b8b8b8;
        margin-top: 16px;
        font-size: 1.1rem;
      }

      .loading-spinner {
        width: 48px;
        height: 48px;
        border: 4px solid rgba(255,255,255,0.3);
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .shop-sidebar {
          width: 280px;
          left: -280px;
        }

        .header-logo {
          font-size: 1.4rem;
        }

        .menu-text {
          display: none;
        }

        .main-container {
          flex-direction: column;
        }
      }

      /* ===== ANIMATIONS & MICRO-INTERACTIONS ===== */

      /* Skeleton Loading */
      .skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
      }

      .skeleton-card {
        background: rgba(255,255,255,0.05);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .skeleton-image {
        width: 100%;
        height: 200px;
        border-radius: 8px;
        background: rgba(255,255,255,0.1);
      }

      .skeleton-text {
        height: 20px;
        border-radius: 4px;
        background: rgba(255,255,255,0.1);
      }

      .skeleton-text:nth-child(2) { width: 80%; }
      .skeleton-text:nth-child(3) { width: 60%; }

      .skeleton-button {
        height: 40px;
        border-radius: 8px;
        background: rgba(255,255,255,0.1);
        width: 120px;
        align-self: flex-end;
      }

      .skeleton-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
        margin-top: 24px;
      }

      /* Page Transitions */
      .page-enter {
        opacity: 0;
        transform: translateY(20px);
        animation: page-enter 0.4s ease-out forwards;
      }

      .page-exit {
        animation: page-exit 0.3s ease-in forwards;
      }

      /* Staggered Animation for Product Cards */
      .product-card {
        opacity: 0;
        transform: translateY(30px);
        animation: card-enter 0.6s ease-out forwards;
      }

      .product-card:nth-child(1) { animation-delay: 0.1s; }
      .product-card:nth-child(2) { animation-delay: 0.2s; }
      .product-card:nth-child(3) { animation-delay: 0.3s; }
      .product-card:nth-child(4) { animation-delay: 0.4s; }
      .product-card:nth-child(5) { animation-delay: 0.5s; }
      .product-card:nth-child(6) { animation-delay: 0.6s; }

      /* Button Interactions */
      .btn-pulse {
        animation: btn-pulse 2s infinite;
      }

      .btn-bounce:hover {
        animation: btn-bounce 0.6s ease-in-out;
      }

      .btn-glow:hover {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
      }

      /* Notification Animations */
      .notification-enter {
        transform: translateX(100%);
        opacity: 0;
        animation: notification-slide-in 0.4s ease-out forwards;
      }

      .notification-exit {
        animation: notification-slide-out 0.3s ease-in forwards;
      }

      /* Loading Dots */
      .loading-dots {
        display: inline-flex;
        gap: 4px;
        align-items: center;
      }

      .loading-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #667eea;
        animation: loading-dot 1.4s infinite ease-in-out;
      }

      .loading-dot:nth-child(1) { animation-delay: -0.32s; }
      .loading-dot:nth-child(2) { animation-delay: -0.16s; }

      /* Success Animation */
      .success-check {
        position: relative;
        display: inline-block;
      }

      .success-check::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        color: #4caf50;
        font-size: 24px;
        font-weight: bold;
        animation: success-check 0.6s ease-out 0.2s forwards;
      }

      /* Hover Effects */
      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }

      .hover-scale {
        transition: transform 0.2s ease;
      }

      .hover-scale:hover {
        transform: scale(1.05);
      }

      .hover-rotate {
        transition: transform 0.3s ease;
      }

      .hover-rotate:hover {
        transform: rotate(5deg);
      }

      /* Focus States for Accessibility */
      .focus-glow:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
      }

      /* ===== KEYFRAME ANIMATIONS ===== */

      @keyframes skeleton-loading {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      @keyframes page-enter {
        0% {
          opacity: 0;
          transform: translateY(20px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes page-exit {
        0% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(-10px);
        }
      }

      @keyframes card-enter {
        0% {
          opacity: 0;
          transform: translateY(30px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes btn-pulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
        }
      }

      @keyframes btn-bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-6px);
        }
        60% {
          transform: translateY(-3px);
        }
      }

      @keyframes notification-slide-in {
        0% {
          transform: translateX(100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes notification-slide-out {
        0% {
          transform: translateX(0);
          opacity: 1;
        }
        100% {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      @keyframes loading-dot {
        0%, 80%, 100% {
          transform: scale(0);
        }
        40% {
          transform: scale(1);
        }
      }

      @keyframes success-check {
        0% {
          transform: translate(-50%, -50%) scale(0) rotate(0deg);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1) rotate(360deg);
          opacity: 1;
        }
      }

      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }





      /* ===== UTILITY CLASSES ===== */

      .animate-fade-in {
        animation: fade-in 0.5s ease-out;
      }

      .animate-slide-up {
        animation: slide-up 0.4s ease-out;
      }

      .animate-scale-in {
        animation: scale-in 0.3s ease-out;
      }

      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slide-up {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      @keyframes scale-in {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }

      /* ===== FOOTER STYLES ===== */

      .shop-footer {
        background: var(--ocean-gradient-surface);
        color: var(--text-primary);
        margin-top: 40px;
        border-top: 1px solid var(--ocean-primary);
        position: relative;
        overflow: hidden;
      }

      .shop-footer::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--ocean-gradient-accent);
        z-index: 1;
      }

      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 40px;
        padding: 60px 40px 40px;
        max-width: 1400px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }

      .footer-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .footer-logo {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 8px;
        text-shadow: 0 2px 4px rgba(10, 25, 41, 0.5);
        background: var(--ocean-gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .footer-description {
        color: var(--text-secondary);
        line-height: 1.6;
        font-size: 0.95rem;
        margin: 0;
      }

      .footer-title {
        color: var(--text-primary);
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0 0 16px 0;
        position: relative;
      }

      .footer-title::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 40px;
        height: 2px;
        background: var(--ocean-gradient-accent);
        border-radius: 1px;
      }

      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .footer-links li {
        margin-bottom: 8px;
      }

      .footer-links a {
        color: var(--text-secondary);
        text-decoration: none;
        font-size: 0.9rem;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0;
      }

      .footer-links a:hover {
        color: var(--ocean-accent);
        transform: translateX(4px);
        text-shadow: 0 0 12px var(--ocean-accent);
      }

      /* Social Links */
      .social-links {
        display: flex;
        gap: 12px;
        margin-top: 16px;
      }

      .social-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: var(--hover-ocean);
        border: 1px solid var(--ocean-accent);
        border-radius: 50%;
        color: var(--text-primary);
        text-decoration: none;
        transition: all 0.3s ease;
        font-size: 1.2rem;
      }

      .social-link:hover {
        background: var(--active-ocean);
        transform: translateY(-2px) scale(1.1);
        box-shadow: var(--shadow-ocean-light);
        border-color: var(--ocean-accent);
      }

      /* Newsletter Section */
      .newsletter-section {
        background: rgba(255,255,255,0.05);
        padding: 24px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
      }

      .newsletter-description {
        color: #b8b8b8;
        font-size: 0.9rem;
        margin-bottom: 16px;
        line-height: 1.5;
      }

      .newsletter-form {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }

      .newsletter-input {
        flex: 1;
        min-width: 200px;
        padding: 12px 16px;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 8px;
        background: rgba(255,255,255,0.05);
        color: #ffffff;
        font-size: 0.9rem;
        transition: all 0.3s ease;
      }

      .newsletter-input::placeholder {
        color: #888;
      }

      .newsletter-input:focus {
        border-color: #2196f3;
        background: rgba(255,255,255,0.08);
        box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
      }

      .newsletter-btn {
        padding: 12px 24px;
        background: linear-gradient(45deg, #2196f3, #1976d2);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
        white-space: nowrap;
      }

      .newsletter-btn:hover {
        background: linear-gradient(45deg, #1976d2, #1565c0);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
      }

      .newsletter-features {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .feature-item {
        color: #888;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      /* Footer Bottom */
      .footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.1);
        background: rgba(0,0,0,0.3);
        padding: 20px 40px;
      }

      .footer-bottom-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;
      }

      .copyright {
        color: #888;
        font-size: 0.9rem;
      }

      .footer-legal {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-wrap: wrap;
      }

      .footer-legal a {
        color: #888;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.3s ease;
      }

      .footer-legal a:hover {
        color: #ffffff;
      }

      .separator {
        color: #666;
        font-size: 0.9rem;
      }

      .footer-badges {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        background: rgba(255,255,255,0.1);
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        color: #ffffff;
      }

      .badge.secure {
        background: rgba(76, 175, 80, 0.2);
        color: #81c784;
      }

      .badge.fast {
        background: rgba(255, 152, 0, 0.2);
        color: #ffb74d;
      }

      .badge.support {
        background: rgba(156, 39, 176, 0.2);
        color: #ba68c8;
      }

      /* Mobile Responsive Footer */
      @media (max-width: 768px) {
        .footer-content {
          grid-template-columns: 1fr;
          gap: 32px;
          padding: 40px 20px 20px;
        }

        .social-links {
          justify-content: center;
        }

        .newsletter-form {
          flex-direction: column;
        }

        .newsletter-input {
          min-width: auto;
          width: 100%;
        }

        .footer-bottom-content {
          flex-direction: column;
          text-align: center;
          gap: 16px;
        }

        .footer-legal {
          justify-content: center;
        }

        .footer-badges {
          justify-content: center;
        }

        .footer-bottom {
          padding: 20px;
        }

        .footer-logo {
          font-size: 1.5rem;
        }
      }

      /* Info Notification Style */
      .notification-info {
        background: linear-gradient(135deg, #2196f3, #1976d2);
        color: white;
      }

      /* Animation for footer appearance */
      .animate-slide-up {
        animation: slide-up 0.6s ease-out;
      }

      /* ===== HERO SLIDER STYLES ===== */

      .hero-slider {
        position: relative;
        width: 100%;
        height: 100vh;
        min-height: 600px;
        overflow: hidden;
        background: var(--ocean-gradient-surface);
      }

      .slider-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .slider-wrapper {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .slider-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--ocean-gradient-surface);
        z-index: 1;
      }

      /* Slide Content */
      .slide-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
        max-width: 1400px;
        width: 100%;
        padding: 0 2rem;
        align-items: center;
        position: relative;
        z-index: 3;
      }

      .slide-text {
        color: var(--text-primary);
        max-width: 500px;
      }

      .slide-title {
        font-size: clamp(2.5rem, 5vw, 4rem);
        font-weight: 700;
        margin: 0 0 1rem 0;
        line-height: 1.1;
        background: var(--ocean-gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-shadow: 0 2px 4px rgba(10, 25, 41, 0.3);
        animation-delay: 0.2s;
      }

      .slide-subtitle {
        font-size: clamp(1.1rem, 2.5vw, 1.5rem);
        color: var(--text-secondary);
        margin: 0 0 2rem 0;
        line-height: 1.4;
        font-weight: 300;
        animation-delay: 0.4s;
      }

      .slide-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--ocean-gradient-accent);
        color: var(--ocean-deep);
        padding: 1rem 2rem;
        border-radius: 50px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        border: 2px solid transparent;
        animation-delay: 0.6s;
        position: relative;
        overflow: hidden;
      }

      .slide-button:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-ocean-strong);
        border-color: var(--ocean-accent);
      }

      .slide-button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(77, 208, 225, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
      }

      .slide-button:hover::before {
        width: 300px;
        height: 300px;
      }

      .button-arrow {
        transition: transform 0.3s ease;
      }

      .slide-button:hover .button-arrow {
        transform: translateX(4px);
      }

      .slide-button:active {
        transform: translateY(1px);
        box-shadow: var(--shadow-ocean-light);
      }

      /* Button click animation */
      .button-clicked {
        animation: button-click 0.3s ease;
        transform: scale(0.98);
      }

      /* Ripple animation */
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      @keyframes button-click {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
      }

      /* Enhanced button hover states */
      .slide-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
      }

      .slide-button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
        z-index: 0;
      }

      .slide-button:hover::before {
        width: 300px;
        height: 300px;
      }

      .slide-button span {
        position: relative;
        z-index: 1;
      }

      .slide-image {
        position: relative;
        width: 100%;
        height: 400px;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: var(--shadow-ocean-strong);
      }

      .slide-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .slide-image:hover img {
        transform: scale(1.05);
      }

      /* Navigation Arrows */
      .slider-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 2px solid var(--ocean-accent);
        color: var(--text-primary);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        transition: all 0.3s ease;
        z-index: 4;
        opacity: 0;
        visibility: hidden;
      }

      .hero-slider:hover .slider-arrow {
        opacity: 1;
        visibility: visible;
      }

      .slider-arrow:hover {
        background: var(--ocean-accent);
        transform: translateY(-50%) scale(1.1);
        box-shadow: var(--shadow-ocean-light);
      }

      .slider-arrow-prev {
        left: 2rem;
      }

      .slider-arrow-next {
        right: 2rem;
      }

      .arrow-icon {
        font-size: 1.8rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: inline-block;
      }

      .slider-arrow:hover .arrow-icon {
        transform: scale(1.2) translateX(var(--arrow-translate, 0));
      }

      .slider-arrow-prev:hover .arrow-icon {
        --arrow-translate: -2px;
      }

      .slider-arrow-next:hover .arrow-icon {
        --arrow-translate: 2px;
      }

      /* Enhanced arrow animations */
      .slider-arrow {
        backdrop-filter: blur(20px);
        border: 2px solid rgba(77, 208, 225, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .slider-arrow::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(77, 208, 225, 0.1), rgba(44, 125, 160, 0.1));
        border-radius: 50%;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
      }

      .slider-arrow:hover::before {
        opacity: 1;
      }

      .slider-arrow:active {
        transform: translateY(-50%) scale(0.95);
      }

      /* Slide Indicators */
      .slider-indicators {
        position: absolute;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 1rem;
        z-index: 4;
      }

      .slider-indicator {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid var(--ocean-accent);
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .slider-indicator:hover {
        background: var(--ocean-accent);
        transform: scale(1.2);
      }

      .slider-indicator.active {
        background: var(--ocean-accent);
        transform: scale(1.3);
        box-shadow: 0 0 20px var(--ocean-accent);
      }

      .slider-indicator {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      /* Progress Bar */
      .slider-progress {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 2;
      }

      .progress-bar {
        height: 100%;
        background: var(--ocean-gradient-accent);
        width: 100%;
        animation: progress-fill infinite linear;
      }

      @keyframes progress-fill {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(0%); }
      }

      /* ===== NAVIGATION STYLES ===== */

      /* Header Main Styles */
      .shop-header {
              background: var(--ocean-gradient-surface);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--ocean-primary);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 0;
      box-shadow: var(--shadow-ocean-light);
      }

      .header-main {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
      }

      .header-logo {
        font-size: 1.8rem;
        font-weight: 700;
        color: var(--text-primary);
        text-shadow: 0 2px 4px rgba(10, 25, 41, 0.5);
        flex-shrink: 0;
        background: var(--ocean-gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .header-actions {
        display: flex;
        gap: 8px;
        align-items: center;
      }

      /* Horizontal Navigation */
      .horizontal-nav {
        flex: 1;
        margin: 0 40px;
      }

      .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .nav-main {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      .nav-actions {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        color: var(--text-primary);
        text-decoration: none;
        border-radius: 12px;
        transition: all 0.3s ease;
        position: relative;
        font-weight: 500;
        border: 1px solid transparent;
      }

      .nav-link:hover {
        background: var(--hover-ocean);
        transform: translateY(-2px);
        border-color: var(--ocean-accent);
        box-shadow: var(--shadow-ocean-light);
        text-shadow: 0 0 12px var(--ocean-accent);
      }

      .nav-link.active {
        background: var(--active-ocean);
        border-color: var(--ocean-accent);
        font-weight: 600;
        box-shadow: var(--shadow-ocean-light);
      }

      .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translateX(-50%);
        width: 60%;
        height: 2px;
        background: var(--ocean-gradient-accent);
        border-radius: 1px;
      }

      .nav-icon {
        font-size: 1.1rem;
        width: 20px;
        text-align: center;
      }

      .nav-text {
        white-space: nowrap;
      }

      .nav-badge {
        background: #ff4081;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 0.7rem;
        font-weight: bold;
        min-width: 18px;
        text-align: center;
        height: 18px;
        line-height: 14px;
      }

      .cart-link {
        background: linear-gradient(45deg, #2196f3, #1976d2);
        border: 1px solid #2196f3;
      }

      .cart-link:hover {
        background: linear-gradient(45deg, #1976d2, #1565c0);
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
      }

      /* Dropdown Styles */
      .nav-dropdown {
        position: relative;
      }

      .dropdown-toggle {
        cursor: pointer;
      }

      .dropdown-arrow {
        font-size: 0.8rem;
        transition: transform 0.3s ease;
        margin-left: 4px;
      }

      .nav-dropdown.open .dropdown-arrow {
        transform: rotate(180deg);
      }

      .dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        background: var(--ocean-gradient-surface);
        backdrop-filter: blur(20px);
        border-radius: 12px;
        padding: 16px;
        min-width: 220px;
        box-shadow: var(--shadow-ocean-strong);
        border: 1px solid var(--ocean-primary);
        opacity: 0;
        transform: translateY(-10px);
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
      }

      .nav-dropdown.open .dropdown-menu {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
      }

      .dropdown-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        color: var(--text-primary);
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;
        margin-bottom: 4px;
        border: 1px solid transparent;
      }

      .dropdown-item:hover {
        background: var(--hover-ocean);
        border-color: var(--ocean-accent);
        color: var(--ocean-accent);
        transform: translateX(4px);
        box-shadow: var(--shadow-ocean-light);
      }

      .category-icon {
        font-size: 1.2rem;
        width: 24px;
        text-align: center;
      }

      .item-count {
        margin-left: auto;
        background: #e0e0e0;
        color: #666;
        border-radius: 12px;
        padding: 2px 8px;
        font-size: 0.8rem;
        font-weight: 600;
        min-width: 24px;
        text-align: center;
      }

      .dropdown-item:hover .item-count {
        background: #2196f3;
        color: white;
      }

      /* Vertical Navigation */
      .vertical-nav {
        position: fixed;
        left: 0;
        top: 80px;
        width: 280px;
        height: calc(100vh - 80px);
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(20px);
        border-right: 1px solid rgba(255,255,255,0.2);
        overflow-y: auto;
        z-index: 90;
      }

      .vertical-nav-content {
        padding: 20px;
      }

      .nav-section {
        margin-bottom: 32px;
      }

      .nav-section-title {
        font-size: 0.9rem;
        font-weight: 600;
        color: #b8b8b8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      .vertical-nav-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        color: #ffffff;
        text-decoration: none;
        border-radius: 8px;
        transition: all 0.3s ease;
        margin-bottom: 4px;
      }

      .vertical-nav-link:hover {
        background: rgba(255,255,255,0.1);
        transform: translateX(4px);
      }

      .vertical-nav-link.active {
        background: rgba(33, 150, 243, 0.2);
        border-left: 3px solid #2196f3;
        font-weight: 600;
      }

      /* Burger Navigation */
      .burger-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: 1000;
        pointer-events: none;
      }

      .burger-nav.open {
        pointer-events: auto;
      }

      .burger-nav-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 25, 41, 0.7);
        backdrop-filter: blur(4px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        pointer-events: auto;
      }

      .burger-nav-overlay.visible {
        opacity: 1;
        visibility: visible;
      }

      .burger-nav-content {
        position: absolute;
        top: 0;
        left: -320px;
        width: 300px;
        height: 100vh;
        background: var(--ocean-gradient-surface);
        backdrop-filter: blur(20px);
        transition: left 0.3s ease;
        overflow-y: auto;
        box-shadow: var(--shadow-ocean-strong);
        border-right: 1px solid var(--ocean-primary);
      }

      .burger-nav.open .burger-nav-content {
        left: 0;
      }

      .burger-nav-content.visible {
        left: 0;
      }

      .burger-nav-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid var(--ocean-primary);
        background: var(--ocean-gradient-secondary);
        color: var(--text-primary);
        box-shadow: var(--shadow-ocean-light);
      }

      .nav-logo {
        font-size: 1.5rem;
        font-weight: 700;
        background: var(--ocean-gradient-accent);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .nav-close, .nav-back {
        background: var(--hover-ocean);
        border: 1px solid var(--ocean-accent);
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
      }

      .nav-close:hover, .nav-back:hover {
        background: var(--active-ocean);
        transform: scale(1.05);
        box-shadow: var(--shadow-ocean-light);
      }

      .nav-title {
        font-size: 1.2rem;
        font-weight: 600;
      }

      .nav-back {
        font-size: 1.8rem;
        padding: 4px 8px;
      }

      .burger-nav-menu {
        padding: 20px 0;
      }

      .burger-nav-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 20px;
        color: var(--text-primary);
        text-decoration: none;
        border-bottom: 1px solid var(--ocean-primary);
        transition: all 0.3s ease;
        border-radius: 8px;
        margin: 4px 0;
      }

      .burger-nav-item:hover {
        background: var(--hover-ocean);
        border-left: 4px solid var(--ocean-accent);
        transform: translateX(4px);
        box-shadow: var(--shadow-ocean-light);
      }

      .burger-nav-item.active {
        background: var(--active-ocean);
        border-left: 4px solid var(--ocean-accent);
        font-weight: 600;
        box-shadow: var(--shadow-ocean-light);
      }

      .item-icon {
        font-size: 1.3rem;
        width: 24px;
        text-align: center;
        flex-shrink: 0;
      }

      .item-text {
        flex: 1;
        font-size: 0.95rem;
      }

      .item-count {
        background: #e0e0e0;
        color: #666;
        border-radius: 12px;
        padding: 2px 8px;
        font-size: 0.8rem;
        font-weight: 600;
        min-width: 24px;
        text-align: center;
      }

      .burger-nav-item.active .item-count {
        background: #667eea;
        color: white;
      }

      .item-arrow {
        font-size: 1.2rem;
        color: #ccc;
        flex-shrink: 0;
      }

      .nav-divider {
        height: 1px;
        background: rgba(0,0,0,0.1);
        margin: 16px 20px;
      }

      /* Menu Toggle Button */
      .menu-toggle {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        color: white;
        padding: 10px 16px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
      }

      .menu-toggle:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-1px);
      }

      .menu-icon {
        font-size: 1.2rem;
      }

      .menu-text {
        font-weight: 500;
      }

      /* Responsive Navigation */
      @media (max-width: 768px) {
        .horizontal-nav {
          display: none;
        }

        .header-logo {
          font-size: 1.4rem;
        }

        .menu-text {
          display: none;
        }

        .vertical-nav {
          display: none;
        }

        .burger-nav-content {
          width: 280px;
          left: -280px;
        }

        .burger-nav.open .burger-nav-content {
          left: 0;
        }
      }

      @media (min-width: 769px) and (max-width: 1024px) {
        .vertical-nav {
          width: 240px;
        }

        .horizontal-nav .nav-main {
          gap: 16px;
        }

        .nav-text {
          display: none;
        }

        .nav-link {
          padding: 10px 12px;
        }
      }

      /* Focus States for Accessibility */
      .nav-link:focus,
      .burger-nav-item:focus,
      .vertical-nav-link:focus,
      .menu-toggle:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
      }

      /* Navigation Animation Classes */
      .nav-enter {
        opacity: 0;
        transform: translateX(-20px);
        animation: nav-enter 0.4s ease-out forwards;
      }

      .nav-exit {
        animation: nav-exit 0.3s ease-in forwards;
      }

      @keyframes nav-enter {
        0% {
          opacity: 0;
          transform: translateX(-20px);
        }
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes nav-exit {
        0% {
          opacity: 1;
          transform: translateX(0);
        }
        100% {
          opacity: 0;
          transform: translateX(-20px);
        }
      }

      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;

    app.appendChild(style);
    app.appendChild(sidebar);
    app.appendChild(header);
    app.appendChild(mainContainer);
    app.appendChild(footer);
    document.head.appendChild(navigationScript);

    // Make app instance globally accessible
    window.appInstance = this;

    // Initialize slider
    this.initializeSlider();
  }

  renderSkeletonCards(count = 6) {
    const skeletonContainer = document.createElement('div');
    skeletonContainer.className = 'skeleton-grid';

    for (let i = 0; i < count; i++) {
      const skeletonCard = document.createElement('div');
      skeletonCard.className = 'skeleton-card';
      skeletonCard.innerHTML = `
        <div class="skeleton-image skeleton"></div>
        <div class="skeleton-text skeleton" style="width: 90%;"></div>
        <div class="skeleton-text skeleton" style="width: 70%;"></div>
        <div class="skeleton-text skeleton" style="width: 50%;"></div>
        <div class="skeleton-button skeleton"></div>
      `;
      skeletonContainer.appendChild(skeletonCard);
    }

    return skeletonContainer;
  }

  renderCatalog() {
    const container = document.createElement('div');
    container.className = 'catalog-container page-enter';

    // Welcome section
    const welcome = document.createElement('div');
    welcome.style.cssText = 'text-align: center; margin-bottom: 32px;';
    welcome.innerHTML = `
      <h1 style="font-size: 2.5rem; font-weight: 300; margin: 0 0 16px 0; background: linear-gradient(45deg, #ffffff, #bbe1fa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
        Welcome to PolymerShop!
      </h1>
      <p style="color: #b8b8b8; margin: 0 0 8px 0;">
        Advanced e-commerce built with modern web technologies.
      </p>
      <p style="color: #888; font-size: 0.9rem;">
        🕒 ${new Date().toLocaleString()}
      </p>
    `;

    // Filters
    const filters = document.createElement('div');
    filters.style.cssText = 'background: rgba(255,255,255,0.05); padding: 20px; border-radius: 12px; margin-bottom: 24px;';

    const filtersGrid = document.createElement('div');
    filtersGrid.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; margin-bottom: 16px;';

    // Search
    const searchDiv = document.createElement('div');
    searchDiv.innerHTML = `
      <label style="color: white; font-size: 0.9rem; font-weight: 500; display: block; margin-bottom: 4px;">Search Products</label>
      <input
        type="text"
        placeholder="Search by name, description..."
        value="${this.searchQuery}"
        style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.1); color: white; font-size: 1rem;"
      >
    `;
    searchDiv.querySelector('input').addEventListener('input', (e) => this.updateSearch(e));

    // Category
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
      <label style="color: white; font-size: 0.9rem; font-weight: 500; display: block; margin-bottom: 4px;">Category</label>
      <select style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.1); color: white; font-size: 1rem;">
        <option value="all">All Categories</option>
        ${this.getCategories().map(cat => `<option value="${cat}" ${this.selectedCategory === cat ? 'selected' : ''}>${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`).join('')}
      </select>
    `;
    categoryDiv.querySelector('select').addEventListener('change', (e) => this.updateCategory(e));

    // Sort
    const sortDiv = document.createElement('div');
    sortDiv.innerHTML = `
      <label style="color: white; font-size: 0.9rem; font-weight: 500; display: block; margin-bottom: 4px;">Sort By</label>
      <select style="width: 100%; padding: 12px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; background: rgba(255,255,255,0.1); color: white; font-size: 1rem;">
        <option value="name" ${this.sortBy === 'name' ? 'selected' : ''}>Name (A-Z)</option>
        <option value="price-low" ${this.sortBy === 'price-low' ? 'selected' : ''}>Price (Low to High)</option>
        <option value="price-high" ${this.sortBy === 'price-high' ? 'selected' : ''}>Price (High to Low)</option>
        <option value="rating" ${this.sortBy === 'rating' ? 'selected' : ''}>Rating</option>
      </select>
    `;
    sortDiv.querySelector('select').addEventListener('change', (e) => this.updateSort(e));

    filtersGrid.appendChild(searchDiv);
    filtersGrid.appendChild(categoryDiv);
    filtersGrid.appendChild(sortDiv);

    // Results count
    const resultsCount = document.createElement('div');
    resultsCount.textContent = `Showing ${this.filteredProducts.length} of ${this.products.length} products`;
    resultsCount.style.cssText = 'color: #b8b8b8; font-size: 0.9rem;';

    filters.appendChild(filtersGrid);
    filters.appendChild(resultsCount);

    // Products grid
    const productsGrid = document.createElement('div');
    productsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-top: 24px;';

    this.filteredProducts.forEach((product, index) => {
      const card = document.createElement('div');
      card.className = 'product-card hover-lift';
      card.style.cssText = `
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 20px;
        cursor: pointer;
        position: relative;
        transition: all 0.3s ease;
        animation-delay: ${index * 0.1}s;
      `;

      card.onclick = () => this.showNotification(`Clicked on ${product.name}`, 'success');

      // Favorite button
      const favoriteBtn = document.createElement('button');
      favoriteBtn.textContent = this.isFavorite(product.id) ? '❤️' : '🤍';
      favoriteBtn.className = 'favorite-btn hover-scale focus-glow';
      favoriteBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: rgba(255,255,255,0.9);
        border: none;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 10;
      `;
      favoriteBtn.onclick = (e) => {
        e.stopPropagation();
        const wasFavorite = this.isFavorite(product.id);
        this.toggleFavorite(product.id);
        favoriteBtn.classList.add('success-check');
        setTimeout(() => favoriteBtn.classList.remove('success-check'), 1000);
      };

      // Product content - Image with fallback system
      const imageContainer = document.createElement('div');
      imageContainer.style.cssText = 'position: relative; width: 100%; height: 200px; margin-bottom: 16px; border-radius: 8px; overflow: hidden; background: rgba(255,255,255,0.05);';

      const image = document.createElement('img');
      image.src = product.currentImage || this.productService.getProductImage(product);
      image.alt = product.name;
      image.style.cssText = 'width: 100%; height: 100%; object-fit: cover; transition: opacity 0.3s ease;';
      image.loading = 'lazy';

      // Add error handling for image loading
      image.onerror = () => {
        console.warn(`Image failed to load for ${product.name}, using fallback`);
        image.src = product.fallbackImage || '/images/default-placeholder.svg';
      };

      image.onload = () => {
        image.style.opacity = '1';
      };

      // Add loading placeholder
      if (!product.imageLoaded) {
        image.style.opacity = '0.5';
      }

      imageContainer.appendChild(image);

      const name = document.createElement('h3');
      name.textContent = product.name;
      name.style.cssText = 'margin: 0 0 8px 0; font-size: 1.25rem; font-weight: 600;';

      const description = document.createElement('p');
      description.textContent = product.description;
      description.style.cssText = 'color: #b8b8b8; margin: 0 0 12px 0; font-size: 0.9rem; line-height: 1.4;';

      // Rating
      const rating = document.createElement('div');
      rating.style.cssText = 'display: flex; align-items: center; gap: 4px; margin-bottom: 8px;';
      for (let i = 0; i < 5; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        star.style.color = i < Math.floor(product.rating) ? '#ffc107' : '#ddd';
        rating.appendChild(star);
      }
      const ratingText = document.createElement('span');
      ratingText.textContent = `(${product.rating})`;
      ratingText.style.cssText = 'color: #b8b8b8; font-size: 0.9rem;';
      rating.appendChild(ratingText);

      const price = document.createElement('div');
      price.textContent = `$${product.price.toFixed(2)}`;
      price.style.cssText = 'font-size: 1.5rem; font-weight: 700; color: #4caf50; margin-bottom: 16px;';

      const addToCartBtn = document.createElement('button');
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.className = 'add-to-cart-btn btn-bounce btn-glow focus-glow';
      addToCartBtn.style.cssText = `
        width: 100%;
        background: linear-gradient(45deg, #2196f3, #1976d2);
        color: white;
        border: none;
        padding: 12px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      `;

      // Add ripple effect
      addToCartBtn.onclick = (e) => {
        e.stopPropagation();

        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.6);
          transform: scale(0);
          animation: ripple 0.6s linear;
          width: 20px;
          height: 20px;
          left: ${e.offsetX - 10}px;
          top: ${e.offsetY - 10}px;
        `;
        addToCartBtn.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);

        // Add to cart with animation
        addToCartBtn.textContent = '✓ Added!';
        addToCartBtn.style.background = 'linear-gradient(45deg, #4caf50, #45a049)';
        setTimeout(() => {
          addToCartBtn.textContent = 'Add to Cart';
          addToCartBtn.style.background = 'linear-gradient(45deg, #2196f3, #1976d2)';
        }, 1500);

        this.addToCart(product);
      };

      card.appendChild(favoriteBtn);
      card.appendChild(imageContainer);
      card.appendChild(name);
      card.appendChild(description);
      card.appendChild(rating);
      card.appendChild(price);
      card.appendChild(addToCartBtn);

      productsGrid.appendChild(card);
    });

    container.appendChild(welcome);
    container.appendChild(filters);
    container.appendChild(productsGrid);

    // No results message
    if (this.filteredProducts.length === 0) {
      const noResults = document.createElement('div');
      noResults.style.cssText = 'text-align: center; padding: 64px; color: #b8b8b8;';
      noResults.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 16px;">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your search or filters</p>
        <button onclick="app.clearSearch(); app.filterAndSortProducts(); app.render();"
                style="background: #2196f3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-top: 16px;">
          Clear Filters
        </button>
      `;
      container.appendChild(noResults);
    }

    return container;
  }

  renderFavorites() {
    const container = document.createElement('div');

    const title = document.createElement('h2');
    title.textContent = `❤️ My Favorite Products (${this.favorites.length})`;
    title.style.cssText = 'margin: 0 0 24px 0;';

    if (this.favorites.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'text-align: center; padding: 64px; color: #b8b8b8;';
      empty.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 16px;">🤍</div>
        <h3>No favorites yet</h3>
        <p>Start exploring products and add them to your favorites!</p>
        <button onclick="app.navigateTo('catalog')"
                style="background: #2196f3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-top: 16px;">
          Browse Products
        </button>
      `;
      container.appendChild(title);
      container.appendChild(empty);
      return container;
    }

    const favoriteProducts = this.products.filter(product => this.isFavorite(product.id));

    const productsGrid = document.createElement('div');
    productsGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;';

    favoriteProducts.forEach(product => {
      const card = document.createElement('div');
      card.style.cssText = `
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 20px;
        transition: all 0.3s ease;
        cursor: pointer;
        position: relative;
      `;

      const imageSrc = product.currentImage || app.productService.getProductImage(product);

      card.innerHTML = `
        <button onclick="app.toggleFavorite(${product.id}); event.stopPropagation();"
                style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
          ❤️
        </button>
        <div style="position: relative; width: 100%; height: 150px; margin-bottom: 16px; border-radius: 8px; overflow: hidden; background: rgba(255,255,255,0.05);">
          <img src="${imageSrc}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" onerror="this.src='/images/default-placeholder.svg'">
        </div>
        <h3 style="margin: 0 0 8px 0; font-size: 1.25rem; font-weight: 600;">${product.name}</h3>
        <p style="color: #b8b8b8; margin: 0 0 12px 0; font-size: 0.9rem; line-height: 1.4;">${product.description}</p>
        <div style="font-size: 1.5rem; font-weight: 700; color: #4caf50; margin-bottom: 16px;">$${product.price.toFixed(2)}</div>
        <button onclick="app.addToCart(app.products.find(p => p.id === ${product.id})); event.stopPropagation();"
                style="width: 100%; background: linear-gradient(45deg, #2196f3, #1976d2); color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer; font-weight: 600;">
          Add to Cart
        </button>
      `;

      productsGrid.appendChild(card);
    });

    container.appendChild(title);
    container.appendChild(productsGrid);

    return container;
  }

  renderCart() {
    const container = document.createElement('div');
    const cartItems = this.cartService.getCart();

    const title = document.createElement('h2');
    title.textContent = 'Shopping Cart';
    title.style.cssText = 'margin: 0 0 24px 0;';

    if (cartItems.length === 0) {
      const empty = document.createElement('div');
      empty.style.cssText = 'text-align: center; padding: 64px; color: #b8b8b8;';
      empty.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 16px;">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Discover our amazing products and start shopping!</p>
        <button onclick="app.navigateTo('catalog')"
                style="background: #2196f3; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; margin-top: 16px;">
          Browse Products
        </button>
      `;
      container.appendChild(title);
      container.appendChild(empty);
      return container;
    }

    const cartGrid = document.createElement('div');
    cartGrid.style.cssText = 'display: grid; grid-template-columns: 2fr 1fr; gap: 32px;';

    // Cart items
    const itemsContainer = document.createElement('div');
    itemsContainer.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

    cartItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.style.cssText = `
        display: flex;
        align-items: center;
        gap: 16px;
        background: rgba(255,255,255,0.05);
        padding: 16px;
        border-radius: 8px;
        border: 1px solid rgba(255,255,255,0.1);
      `;

      const itemImageSrc = item.image || app.productService.getProductImage(item);

      itemDiv.innerHTML = `
        <div style="width: 60px; height: 60px; border-radius: 8px; overflow: hidden; background: rgba(255,255,255,0.05);">
          <img src="${itemImageSrc}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/images/default-placeholder.svg'">
        </div>
        <div style="flex: 1;">
          <h3 style="margin: 0 0 4px 0; font-size: 1.2rem; font-weight: 600;">${item.name}</h3>
          <div style="color: #b8b8b8; font-size: 0.9rem;">
            $${item.price.toFixed(2)} × ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
        <button onclick="app.removeFromCart(${item.id})"
                style="background: #f44336; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">
          Remove
        </button>
      `;

      itemsContainer.appendChild(itemDiv);
    });

    // Cart summary
    const summaryContainer = document.createElement('div');
    summaryContainer.style.cssText = 'background: rgba(255,255,255,0.05); padding: 24px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1);';

    const summary = this.cartService.getCartSummary();

    summaryContainer.innerHTML = `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span>Items (${summary.itemCount})</span>
          <span>$${summary.subtotal.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span>Shipping</span>
          <span style="color: ${summary.isFreeShipping ? '#4caf50' : 'inherit'}">${summary.isFreeShipping ? 'Free' : '$' + summary.shipping.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
          <span>Tax</span>
          <span>$${summary.tax.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; font-weight: bold;">
          <span>Total</span>
          <span style="color: #4caf50; font-size: 1.2rem;">$${summary.total.toFixed(2)}</span>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <button onclick="app.clearCart()"
                style="background: #f44336; color: white; border: none; padding: 12px; border-radius: 8px; cursor: pointer;">
          Clear Cart
        </button>
        <button onclick="app.showNotification('Checkout feature coming soon!', 'warning')"
                style="background: linear-gradient(45deg, #4caf50, #45a049); color: white; border: none; padding: 16px; border-radius: 8px; cursor: pointer; font-size: 1.1rem; font-weight: 600;">
          Proceed to Checkout
        </button>
      </div>
    `;

    cartGrid.appendChild(itemsContainer);
    cartGrid.appendChild(summaryContainer);

    container.appendChild(title);
    container.appendChild(cartGrid);

    return container;
  }
}

// Initialize the fallback app
let app;
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Starting Fallback PolymerShop...');
  app = new FallbackPolymerShop();
});
