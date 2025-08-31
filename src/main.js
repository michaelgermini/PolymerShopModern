import { LitElement, html, css } from 'lit';

/**
 * OceanShop Modern - Hybrid Interface
 * Combines e-commerce interface with modern colored design
 */
export class PolymerShopApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      font-family: 'Roboto', sans-serif;
    }

    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f4c75 0%, #3282b8 25%, #bbe1fa 50%, #3282b8 75%, #0f4c75 100%);
    }

    .header {
      background: rgba(0,0,0,0.3);
      backdrop-filter: blur(15px);
      color: #e8e8e8;
      padding: 1rem 2rem;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      position: sticky;
      top: 0;
      z-index: 100;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.8rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .nav {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .search-container {
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 1rem;
    }

    .search-input {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 25px;
      padding: 0.5rem 1rem;
      color: #e8e8e8;
      font-size: 0.9rem;
      width: 250px;
      transition: all 0.3s;
      backdrop-filter: blur(10px);
    }

    .search-input:focus {
      outline: none;
      border-color: #00d4aa;
      background: rgba(255,255,255,0.15);
      width: 300px;
    }

    .search-input::placeholder {
      color: #b8b8b8;
    }

    .search-button {
      background: none;
      border: none;
      color: #e8e8e8;
      cursor: pointer;
      padding: 0.5rem;
      margin-left: 0.5rem;
      border-radius: 50%;
      transition: all 0.3s;
    }

    .search-button:hover {
      background: rgba(255,255,255,0.1);
      color: #ffffff;
    }

    .clear-search {
      background: none;
      border: none;
      color: #b8b8b8;
      cursor: pointer;
      padding: 0.25rem;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      border-radius: 50%;
      transition: all 0.3s;
    }

    .clear-search:hover {
      background: rgba(255,255,255,0.1);
      color: #e8e8e8;
    }

    .search-results {
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #b8b8b8;
      margin-left: 1rem;
    }

    .nav-item {
      color: #b8b8b8;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s;
      border: 1px solid transparent;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.2);
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,212,170,0.2);
    }

    .cart-button {
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      font-weight: 500;
      box-shadow: 0 4px 12px rgba(0,212,170,0.3);
      transition: all 0.3s;
    }

    .cart-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,212,170,0.4);
    }

    .main-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .hero-section {
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(15px);
      color: #f0f0f0;
      padding: 4rem 2rem;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 3rem;
      border: 1px solid rgba(255,255,255,0.1);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(0,212,170,0.1), rgba(50,130,184,0.1));
      pointer-events: none;
    }

    .hero-section > * {
      position: relative;
      z-index: 1;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 300;
      margin: 0 0 1rem 0;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-subtitle {
      font-size: 1.3rem;
      opacity: 0.9;
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }

    .cta-button {
      background: linear-gradient(45deg, #00d4aa, #00a8cc);
      color: white;
      border: none;
      padding: 1.2rem 2.5rem;
      border-radius: 50px;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 8px 24px rgba(0,212,170,0.3);
    }

    .cta-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(0,212,170,0.4);
    }

    .products-section {
      margin-bottom: 3rem;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 300;
      color: white;
      margin: 0 0 2rem 0;
      text-align: center;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .product-card {
      background: rgba(30,30,46,0.8);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      border: 1px solid rgba(255,255,255,0.1);
      cursor: pointer;
    }

    .product-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 30px 60px rgba(0,212,170,0.2);
      background: rgba(40,40,60,0.9);
      border-color: rgba(0,212,170,0.3);
    }

    .product-image {
      width: 100%;
      height: 220px;
      background: linear-gradient(45deg, #2a2a3e, #3a3a4e);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4rem;
      color: #00d4aa;
      position: relative;
      overflow: hidden;
    }

    .product-image::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, rgba(0,212,170,0.1), rgba(0,168,204,0.1));
    }

    .product-info {
      padding: 2rem;
    }

    .product-name {
      font-size: 1.4rem;
      font-weight: 600;
      color: #e8e8e8;
      margin: 0 0 0.5rem 0;
    }

    .product-description {
      color: #b8b8b8;
      font-size: 1rem;
      margin: 0 0 1.5rem 0;
      line-height: 1.5;
    }

    .product-price {
      font-size: 1.8rem;
      font-weight: 700;
      background: linear-gradient(45deg, #00d4aa, #00a8cc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 1.5rem 0;
    }

    .add-to-cart {
      width: 100%;
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 12px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      box-shadow: 0 4px 12px rgba(0,212,170,0.3);
      position: relative;
      overflow: hidden;
    }

    .add-to-cart::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .add-to-cart:hover::before {
      left: 100%;
    }

    .add-to-cart:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 8px 25px rgba(0,212,170,0.5);
    }

    .add-to-cart:active {
      transform: translateY(-1px) scale(0.98);
    }

    .features-section {
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(15px);
      padding: 3rem 2rem;
      border-radius: 20px;
      margin-bottom: 3rem;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .feature-item {
      text-align: center;
      padding: 1.5rem;
      background: rgba(30,30,46,0.6);
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s;
    }

    .feature-item:hover {
      transform: translateY(-5px);
      background: rgba(40,40,60,0.8);
    }

    .feature-icon {
      font-size: 3.5rem;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: white;
      margin: 0 0 0.5rem 0;
    }

    .feature-description {
      color: rgba(255,255,255,0.8);
      font-size: 1rem;
      line-height: 1.5;
    }

    .status-section {
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(15px);
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      margin-bottom: 2rem;
      border: 2px solid rgba(0,212,170,0.3);
    }

    .status-title {
      color: #00d4aa;
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
    }

    .status-text {
      color: #e8e8e8;
      font-size: 1.1rem;
      margin: 0;
    }

    .footer {
      background: rgba(0,0,0,0.5);
      color: #b8b8b8;
      padding: 2rem;
      text-align: center;
      margin-top: 3rem;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.3);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% {
        transform: scale(0.9);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    /* Classes d'animation */
    .animate-fade-in {
      animation: fadeIn 0.6s ease-out forwards;
    }

    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    .animate-slide-in-left {
      animation: slideInLeft 0.7s ease-out forwards;
    }

    .animate-slide-in-right {
      animation: slideInRight 0.7s ease-out forwards;
    }

    .animate-scale-in {
      animation: scaleIn 0.5s ease-out forwards;
    }

    .animate-bounce-in {
      animation: bounceIn 0.8s ease-out forwards;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    /* Délais d'animation */
    .animate-delay-1 { animation-delay: 0.1s; }
    .animate-delay-2 { animation-delay: 0.2s; }
    .animate-delay-3 { animation-delay: 0.3s; }
    .animate-delay-4 { animation-delay: 0.4s; }
    .animate-delay-5 { animation-delay: 0.5s; }

    /* Styles for detailed views (inspired by Polymer Shop) */
    .product-detail-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .product-detail-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .back-button {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #e8e8e8;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s;
      font-weight: 500;
    }

    .back-button:hover {
      background: rgba(255,255,255,0.2);
      transform: translateX(-5px);
    }

    .product-detail-title {
      font-size: 2.5rem;
      font-weight: 300;
      color: white;
      margin: 0;
    }

    .product-detail-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
    }

    .product-detail-image {
      position: relative;
      text-align: center;
    }

    .product-image-large {
      font-size: 8rem;
      margin-bottom: 2rem;
    }

    .discount-badge {
      position: absolute;
      top: 10px;
      left: 10px;
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .stars {
      display: flex;
      gap: 0.25rem;
    }

    .star {
      color: #666;
      font-size: 1.2rem;
    }

    .star.filled {
      color: #ffb400;
    }

    .rating-text {
      color: #b8b8b8;
      font-size: 0.9rem;
    }

    .product-prices {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .current-price {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .original-price {
      font-size: 1.5rem;
      color: #888;
      text-decoration: line-through;
    }

    .product-stock {
      margin-bottom: 2rem;
    }

    .stock-status {
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 500;
      font-size: 0.9rem;
    }

    .stock-status.in-stock {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
      border: 1px solid rgba(76, 175, 80, 0.3);
    }

    .stock-status.out-of-stock {
      background: rgba(244, 67, 54, 0.2);
      color: #f44336;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    .product-description-detail,
    .product-specs {
      margin-bottom: 2rem;
    }

    .product-description-detail h3,
    .product-specs h3 {
      color: white;
      font-size: 1.3rem;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .product-description-detail p {
      color: #b8b8b8;
      line-height: 1.6;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .spec-item {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem 1rem;
      background: rgba(30,30,46,0.6);
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .spec-label {
      color: #b8b8b8;
      font-weight: 500;
    }

    .spec-value {
      color: white;
      font-weight: 600;
    }

    .add-to-cart-large {
      width: 100%;
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      color: white;
      border: none;
      padding: 1.25rem;
      border-radius: 12px;
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0,212,170,0.3);
    }

    .add-to-cart-large:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,212,170,0.5);
    }

    .add-to-cart-large:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Cart styles */
    .cart-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .cart-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .cart-header h1 {
      color: white;
      font-size: 2.5rem;
      font-weight: 300;
      margin: 0;
    }

    .empty-cart {
      text-align: center;
      padding: 4rem 2rem;
      background: rgba(0,0,0,0.4);
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .empty-cart-icon {
      font-size: 5rem;
      margin-bottom: 2rem;
    }

    .empty-cart h2 {
      color: white;
      font-size: 2rem;
      margin: 0 0 1rem 0;
    }

    .empty-cart p {
      color: #b8b8b8;
      font-size: 1.1rem;
      margin: 0 0 2rem 0;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      background: rgba(30,30,46,0.8);
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s;
    }

    .cart-item:hover {
      background: rgba(40,40,60,0.9);
      transform: translateY(-2px);
    }

    .cart-item-image {
      font-size: 3rem;
      width: 80px;
      text-align: center;
    }

    .cart-item-info {
      flex: 1;
    }

    .cart-item-name {
      color: white;
      font-size: 1.2rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }

    .cart-item-price,
    .cart-item-subtotal {
      color: #b8b8b8;
      font-size: 0.9rem;
    }

    .cart-item-subtotal {
      font-weight: 600;
      color: #00d4aa;
    }

    .cart-item-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .quantity-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }

    .quantity-btn:hover {
      background: rgba(255,255,255,0.2);
    }

    .quantity {
      min-width: 30px;
      text-align: center;
      color: white;
      font-weight: 600;
    }

    .remove-btn {
      background: rgba(244, 67, 54, 0.2);
      border: 1px solid rgba(244, 67, 54, 0.3);
      color: #f44336;
      padding: 0.5rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
    }

    .remove-btn:hover {
      background: rgba(244, 67, 54, 0.4);
    }

    .cart-summary {
      background: rgba(0,0,0,0.4);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
      height: fit-content;
    }

    .cart-total {
      margin-bottom: 2rem;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .total-row:last-child {
      border-bottom: none;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .total-amount {
      color: #00d4aa;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .cart-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .clear-cart-btn {
      background: rgba(244, 67, 54, 0.2);
      border: 1px solid rgba(244, 67, 54, 0.3);
      color: #f44336;
      padding: 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s;
    }

    .clear-cart-btn:hover {
      background: rgba(244, 67, 54, 0.4);
    }

    .checkout-btn {
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      color: white;
      border: none;
      padding: 1.25rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0,212,170,0.3);
    }

    .checkout-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,212,170,0.5);
    }

    /* Styles pour les nouvelles pages */
    .products-page {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .products-filters {
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(15px);
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .filter-section h3 {
      color: white;
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .filter-btn {
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: #b8b8b8;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9rem;
    }

    .filter-btn:hover {
      background: rgba(255,255,255,0.2);
      color: white;
    }

    .filter-btn.active {
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      color: white;
      border-color: rgba(0,212,170,0.5);
    }

    .products-grid-full {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .no-results {
      text-align: center;
      padding: 4rem 2rem;
      background: rgba(0,0,0,0.4);
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .no-results-icon {
      font-size: 4rem;
      margin-bottom: 2rem;
    }

    .no-results h3 {
      color: white;
      font-size: 2rem;
      margin: 0 0 1rem 0;
    }

    .no-results p {
      color: #b8b8b8;
      font-size: 1.1rem;
      margin: 0;
    }

    .no-results a {
      color: #00d4aa;
      text-decoration: none;
    }

    .no-results a:hover {
      text-decoration: underline;
    }

    /* Styles pour la page À propos */
    .about-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .about-content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .about-hero {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .about-hero-content h2 {
      color: white;
      font-size: 2.5rem;
      margin: 0 0 1.5rem 0;
    }

    .about-hero-content p {
      color: #b8b8b8;
      font-size: 1.1rem;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .tech-stack {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .tech-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(30,30,46,0.8);
      padding: 1.5rem;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .tech-icon {
      font-size: 2rem;
    }

    .tech-item span {
      color: white;
      font-weight: 600;
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .value-item {
      background: rgba(30,30,46,0.8);
      padding: 2rem;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
      text-align: center;
      transition: all 0.3s;
    }

    .value-item:hover {
      transform: translateY(-5px);
      background: rgba(40,40,60,0.9);
    }

    .value-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .value-item h3 {
      color: white;
      margin: 0 0 1rem 0;
      font-size: 1.3rem;
    }

    .value-item p {
      color: #b8b8b8;
      margin: 0;
      line-height: 1.5;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
      padding: 2rem;
      background: rgba(30,30,46,0.8);
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .stat-number {
      font-size: 3rem;
      font-weight: 700;
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #b8b8b8;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .about-cta {
      text-align: center;
      padding: 3rem;
      background: rgba(0,0,0,0.4);
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .about-cta h2 {
      color: white;
      font-size: 2rem;
      margin: 0 0 1rem 0;
    }

    .about-cta p {
      color: #b8b8b8;
      font-size: 1.1rem;
      margin: 0 0 2rem 0;
    }

    /* Styles pour la page Contact */
    .contact-page {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .contact-content {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
    }

    .contact-info h2,
    .contact-form h2 {
      color: white;
      font-size: 2rem;
      margin: 0 0 2rem 0;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .contact-item {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
      padding: 1.5rem;
      background: rgba(30,30,46,0.8);
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .contact-icon {
      font-size: 2rem;
      margin-top: 0.25rem;
    }

    .contact-item h3 {
      color: white;
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }

    .contact-item p {
      color: #b8b8b8;
      margin: 0;
      line-height: 1.5;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      color: white;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 1rem;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 8px;
      background: rgba(30,30,46,0.8);
      color: white;
      font-size: 1rem;
      transition: all 0.3s;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #00d4aa;
      background: rgba(40,40,60,0.9);
    }

    .submit-btn {
      background: linear-gradient(45deg, #00d4aa, #3282b8);
      color: white;
      border: none;
      padding: 1.25rem 2rem;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: 600;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0,212,170,0.3);
    }

    .submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,212,170,0.5);
    }

    .contact-faq {
      background: rgba(0,0,0,0.4);
      padding: 3rem;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .contact-faq h2 {
      color: white;
      text-align: center;
      font-size: 2rem;
      margin: 0 0 2rem 0;
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .faq-item {
      background: rgba(30,30,46,0.8);
      padding: 2rem;
      border-radius: 15px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .faq-item h3 {
      color: white;
      margin: 0 0 1rem 0;
      font-size: 1.2rem;
    }

    .faq-item p {
      color: #b8b8b8;
      margin: 0;
      line-height: 1.5;
    }

    /* Styles pour les headers de page */
    .page-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      color: white;
      font-size: 2.5rem;
      font-weight: 300;
      margin: 0;
    }

    .product-detail-title {
      font-size: 2.5rem;
      font-weight: 300;
      color: white;
      margin: 0;
    }

    /* Styles pour l'accessibilité */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* Focus visible pour la navigation clavier */
    .nav-item:focus-visible,
    .cart-button:focus-visible,
    .add-to-cart:focus-visible,
    .search-input:focus-visible,
    .clear-search:focus-visible {
      outline: 3px solid #00d4aa;
      outline-offset: 2px;
      box-shadow: 0 0 0 2px rgba(0, 212, 170, 0.3);
    }

    /* Responsive Menu Styles */
    @media (max-width: 768px) {
      .header-content {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }

      .logo {
        font-size: 1.5rem;
        text-align: center;
      }

      .nav {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
      }

      .nav-item {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
        min-width: auto;
      }

      .search-container {
        width: 100%;
        max-width: none;
        margin: 0;
      }

      .search-input {
        width: 100%;
      }

      .search-input:focus {
        width: 100%;
      }

      .cart-button {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
      .product-detail-content {
        grid-template-columns: 1fr;
      }

      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }

      .product-detail-title,
      .cart-header h1,
      .page-header h1 {
        font-size: 2rem;
      }

      .specs-grid {
        grid-template-columns: 1fr;
      }

      .about-hero {
        grid-template-columns: 1fr;
      }

      .contact-grid {
        grid-template-columns: 1fr;
      }

      .products-grid-full {
        grid-template-columns: 1fr;
      }

      .values-grid,
      .stats-grid,
      .faq-grid {
        grid-template-columns: 1fr;
      }

      .page-header {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
    }


  `;

  static get properties() {
    return {
      cartCount: { type: Number },
      searchQuery: { type: String },
      filteredProducts: { type: Array },
      showSearch: { type: Boolean },
      currentView: { type: String },
      selectedProduct: { type: Object },
      selectedCategory: { type: String }
    };
  }

  constructor() {
    super();
    this.cartCount = 0;
    this.searchQuery = '';
    this.showSearch = false;
    this.currentView = 'home';
    this.selectedProduct = null;
    this.cart = [];
    this.selectedCategory = null;

    // Cache DOM pour optimiser les performances
    this._domCache = new Map();

    // Debounce pour les opérations coûteuses
    this._debounceTimer = null;

    // Lazy loading state
    this._loadedComponents = new Set();

    console.log('PolymerShop Modern Hybrid initialized');

    // Enriched product data (inspired by Polymer Shop)
    this.allProducts = [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        description: 'Experience the future with the iPhone 15 Pro Max. Featuring the powerful A17 Pro chip, titanium design, and professional camera system with 5x Telephoto zoom.',
        price: 1199.99,
        originalPrice: 1299.99,
        category: 'smartphones',
        image: '📱',
        rating: 4.8,
        reviews: 342,
        inStock: true,
        longDescription: 'The iPhone 15 Pro Max represents the pinnacle of smartphone innovation. With its titanium design, the device is incredibly durable yet lightweight. The A17 Pro chip delivers unprecedented performance for gaming, photography, and productivity. The camera system includes a 48MP main sensor, 12MP Ultra Wide, and 12MP Telephoto with 5x optical zoom. Experience studio-quality video recording with 4K Dolby Vision HDR and Cinematic mode.',
        specs: {
          screen: '6.7" Super Retina XDR OLED',
          processor: 'A17 Pro Bionic',
          storage: '256GB',
          camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto (5x zoom)',
          battery: '4680mAh with up to 29h video playback',
          os: 'iOS 17',
          dimensions: '159.9 x 76.7 x 8.25mm',
          weight: '221g',
          connectivity: '5G, WiFi 6E, Bluetooth 5.3, USB-C',
          security: 'Face ID, Touch ID not available'
        },
        features: [
          'Pro camera system with 5x Telephoto zoom',
          'Titanium design for premium feel',
          'Action Button for quick actions',
          'USB-C for universal connectivity',
          'Emergency SOS via satellite',
          'Roadside assistance available'
        ]
      },
      {
        id: 2,
        name: 'MacBook Pro 16"',
        description: 'Professional laptop powered by M3 Max chip, Liquid Retina XDR display, and all-day battery life. Perfect for creative professionals and developers.',
        price: 2499.99,
        originalPrice: 2699.99,
        category: 'ordinateurs',
        image: '💻',
        rating: 4.9,
        reviews: 198,
        inStock: true,
        longDescription: 'The MacBook Pro 16" is designed for professionals who demand the best performance. The M3 Max chip delivers incredible processing power for demanding tasks like video editing, 3D rendering, and software development. The stunning Liquid Retina XDR display provides exceptional color accuracy and brightness. With up to 22 hours of battery life, you can work all day without worrying about power outlets.',
        specs: {
          screen: '16.2" Liquid Retina XDR',
          processor: 'Apple M3 Max',
          memory: '32GB unified memory',
          storage: '1TB SSD',
          graphics: 'Integrated 40-core GPU',
          battery: 'Up to 22 hours',
          os: 'macOS Sonoma',
          dimensions: '355.7 x 248.1 x 16.8mm',
          weight: '2.15kg',
          ports: '3x Thunderbolt 4, HDMI, SDXC card slot, MagSafe',
          connectivity: 'WiFi 6E, Bluetooth 5.3'
        },
        features: [
          'M3 Max chip for ultimate performance',
          '16.2" Liquid Retina XDR display',
          'Up to 22 hours battery life',
          'Three Thunderbolt 4 ports',
          '1080p FaceTime HD camera',
          'Six-speaker sound system'
        ]
      },
      {
        id: 3,
        name: 'Écouteurs Sans Fil',
        description: 'Bluetooth headphones with active noise cancellation and high-quality sound.',
        price: 199.99,
        originalPrice: 249.99,
        category: 'audio',
        image: '🎧',
        rating: 4.3,
        reviews: 256,
        inStock: true,
        specs: {
          battery: '30h',
          noiseCancellation: 'Active',
          connection: 'Bluetooth 5.2',
          weight: '250g'
        }
      },
      {
        id: 4,
        name: 'Montre Connectée',
        description: 'Smart watch with health tracking, notifications and long battery life.',
        price: 299.99,
        originalPrice: 349.99,
        category: 'wearables',
        image: '⌚',
        rating: 4.6,
        reviews: 187,
        inStock: true,
        specs: {
          screen: '1.4" AMOLED',
          battery: '7 days',
          waterproof: '5ATM',
          sensors: 'GPS, Cardio, SpO2'
        }
      },
      {
        id: 5,
        name: 'Écran 4K Ultra HD',
        description: '27-inch monitor with 4K resolution, accurate colors and elegant design.',
        price: 599.99,
        category: 'ecrans',
        image: '🖥️',
        rating: 4.4,
        reviews: 73,
        inStock: true,
        specs: {
          size: '27"',
          resolution: '4K UHD',
          refreshRate: '144Hz',
          responseTime: '1ms',
          ports: 'HDMI, DP, USB-C'
        }
      },
      {
        id: 6,
        name: 'Clavier Mécanique',
        description: 'Gaming keyboard with mechanical switches, RGB backlighting and ergonomic design.',
        price: 149.99,
        category: 'peripheriques',
        image: '⌨️',
        rating: 4.7,
        reviews: 142,
        inStock: true,
        specs: {
          switches: 'Cherry MX Red',
          backlight: 'RGB per key',
          connection: 'USB-C',
          software: 'Compatible iCUE'
        }
      },
      {
        id: 7,
        name: 'Caméra 360°',
        description: 'Connected security camera with 360° vision, motion detection and mobile app.',
        price: 249.99,
        category: 'securite',
        image: '📷',
        rating: 4.2,
        reviews: 89,
        inStock: true,
        specs: {
          vision: '360°',
          resolution: '4K',
          detection: 'Mouvement + IA',
          stockage: 'Cloud + Local',
          connexion: 'WiFi 6'
        }
      },
      {
        id: 8,
        name: 'Tablette Pro',
        description: 'Professional tablet with stylus, high-resolution screen and premium performance.',
        price: 799.99,
        category: 'tablettes',
        image: '📱',
        rating: 4.5,
        reviews: 156,
        inStock: true,
        specs: {
          screen: '12.9" Liquid Retina',
          storage: '256GB',
          ram: '8GB',
          stylus: 'ProMotion',
          battery: '10h'
        }
      }
    ];

    this.filteredProducts = [...this.allProducts];

    // Charger le panier depuis localStorage
    this.loadCart();

    // Initialiser les optimisations de performance
    this._initPerformanceOptimizations();
  }

  /**
   * Optimisations de performance
   */
  _initPerformanceOptimizations() {
    // Intersection Observer pour lazy loading des images
    this._initLazyLoading();

    // Optimiser les événements
    this._optimizeEventListeners();

    // Précharger les ressources critiques
    this._preloadCriticalResources();
  }

  /**
   * Cache DOM optimisé
   */
  _getCachedElement(selector) {
    if (!this._domCache.has(selector)) {
      const element = this.shadowRoot ? this.shadowRoot.querySelector(selector) : document.querySelector(selector);
      if (element) {
        this._domCache.set(selector, element);
      }
    }
    return this._domCache.get(selector);
  }

  /**
   * Lazy loading des images
   */
  _initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          }
        });
      });

      // Observer toutes les images avec lazy loading
      this.updateComplete.then(() => {
        const lazyImages = this.shadowRoot ?
          this.shadowRoot.querySelectorAll('img[data-src]') :
          document.querySelectorAll('img[data-src]');

        lazyImages.forEach(img => imageObserver.observe(img));
      });
    }
  }

  /**
   * Optimisation des event listeners
   */
  _optimizeEventListeners() {
    // Utiliser passive listeners quand approprié
    this._passiveListeners = new Set(['touchstart', 'touchmove', 'touchend', 'wheel']);
  }

  /**
   * Préchargement des ressources critiques
   */
  _preloadCriticalResources() {
    // Précharger les polices critiques
    if ('fonts' in document) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap';
      fontLink.as = 'style';
      document.head.appendChild(fontLink);
    }

    // Précharger les images importantes (hero, produits populaires)
    this._preloadImage('/images/polymershop-icon.svg');
    this._preloadImage('/images/default-placeholder.svg');
  }

  /**
   * Précharger une image
   */
  _preloadImage(src) {
    const img = new Image();
    img.src = src;
  }

  /**
   * Debounce pour optimiser les recherches
   */
  _debounceSearch(func, wait) {
    clearTimeout(this._debounceTimer);
    this._debounceTimer = setTimeout(func, wait);
  }

  // Shopping cart methods (inspired by Polymer Shop)
  loadCart() {
    const savedCart = localStorage.getItem('polymershop-cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
      this.updateCartCount();
    }
  }

  saveCart() {
    localStorage.setItem('polymershop-cart', JSON.stringify(this.cart));
  }

  addToCart(product, quantity = 1) {
    const existingItem = this.cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity: quantity,
        addedAt: new Date().toISOString()
      });
    }

    this.updateCartCount();
    this.saveCart();

    // Notification de succès avec accessibilité
    this.showNotification(`${product.name} added to cart!`, 'success');

    // Annonce pour les lecteurs d'écran
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'assertive');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `${product.name} has been added to your cart. Cart now contains ${this.cartCount} items.`;
    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);

    console.log('Item added to cart:', product.name, 'Total items:', this.cartCount);
  }

  removeFromCart(productId) {
    const index = this.cart.findIndex(item => item.id === productId);
    if (index > -1) {
      const removedItem = this.cart.splice(index, 1)[0];
      this.updateCartCount();
      this.saveCart();
      this.showNotification(`${removedItem.name} removed from cart`, 'info');
    }
  }

  updateCartCount() {
    this.cartCount = this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemsCount() {
    return this.cart.length;
  }

  clearCart() {
    this.cart = [];
    this.updateCartCount();
    this.saveCart();
    this.showNotification('Cart cleared', 'info');
  }

  // Navigation simple (inspiré de Polymer Shop)
  navigateTo(view, product = null) {
    this.currentView = view;
    this.selectedProduct = product;

    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Notifications (inspiré de Polymer Shop)
  showNotification(message, type = 'info') {
    // Créer une notification temporaire
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
      ${type === 'success' ? 'background: linear-gradient(45deg, #4caf50, #45a049);' :
        type === 'error' ? 'background: linear-gradient(45deg, #f44336, #d32f2f);' :
        'background: linear-gradient(45deg, #2196f3, #1976d2);'}
    `;

    document.body.appendChild(notification);

    // Animation d'entrée
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto-suppression après 3 secondes
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  updateSearch(e) {
    this.searchQuery = e.target.value;

    // Utiliser debounce pour éviter les recherches trop fréquentes
    this._debounceSearch(() => {
      this.filterProducts();
    }, 300); // 300ms de délai
  }

  filterProducts() {
    if (!this.searchQuery.trim()) {
      this.filteredProducts = [...this.allProducts];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchQuery = '';
      this.filterProducts();
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterProducts();
  }

  getSearchResultsCount() {
    return this.filteredProducts.length;
  }

  // Rendu des vues détaillées (inspiré de Polymer Shop)
  renderProductDetail() {
    if (!this.selectedProduct) return '';

    const product = this.selectedProduct;
    const discount = product.originalPrice ?
      Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

    return html`
      <div class="product-detail-page animate-fade-in-up">
        <div class="product-detail-header">
          <button class="back-button" @click="${() => this.navigateTo('home')}">
            ← Back to Products
          </button>
          <h1 class="product-detail-title">${product.name}</h1>
        </div>

        <div class="product-detail-content">
          <div class="product-detail-image">
            <div class="product-image-large">
              ${this.renderProductImage(product.image)}
            </div>
            ${product.originalPrice ? html`
              <div class="discount-badge">-${discount}%</div>
            ` : ''}
          </div>

          <div class="product-detail-info">
            <div class="product-rating">
              <div class="stars">
                ${Array.from({length: 5}, (_, i) =>
                  html`<span class="star ${i < Math.floor(product.rating) ? 'filled' : ''}">★</span>`
                )}
              </div>
              <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
            </div>

            <div class="product-prices">
              <span class="current-price">€${product.price.toFixed(2)}</span>
              ${product.originalPrice ? html`
                <span class="original-price">€${product.originalPrice.toFixed(2)}</span>
              ` : ''}
            </div>

            <div class="product-stock">
              <span class="stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                ${product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </span>
            </div>

            <div class="product-description-detail">
              <h3>Description</h3>
              <p>${product.description}</p>
            </div>

            <div class="product-specs">
              <h3>Specifications</h3>
              <div class="specs-grid">
                ${Object.entries(product.specs).map(([key, value]) => html`
                  <div class="spec-item">
                    <span class="spec-label">${key}:</span>
                    <span class="spec-value">${value}</span>
                  </div>
                `)}
              </div>
            </div>

            <div class="product-actions">
              <button
                class="add-to-cart-large"
                @click="${() => this.addToCart(product)}"
                ?disabled="${!product.inStock}"
              >
                ${product.inStock ? 'Add to Cart' : 'Unavailable'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderCart() {
    const total = this.getCartTotal();

    return html`
      <div class="cart-page animate-fade-in-up">
        <div class="cart-header">
          <button class="back-button" @click="${() => this.navigateTo('home')}">
            ← Continue Shopping
          </button>
          <h1>Your Cart</h1>
        </div>

        ${this.cart.length === 0 ? html`
          <div class="empty-cart">
            <div class="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Discover our products and start shopping!</p>
            <button class="cta-button" @click="${() => this.navigateTo('home')}">
              View Products
            </button>
          </div>
        ` : html`
          <div class="cart-content">
            <div class="cart-items">
              ${this.cart.map(item => html`
                <div class="cart-item">
                  <div class="cart-item-image">
                    ${this.renderProductImage(item.image)}
                  </div>
                  <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">
                      €${item.price.toFixed(2)} × ${item.quantity}
                    </div>
                    <div class="cart-item-subtotal">
                      €${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                  <div class="cart-item-actions">
                    <button class="quantity-btn" @click="${() => this.updateItemQuantity(item.id, item.quantity - 1)}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" @click="${() => this.updateItemQuantity(item.id, item.quantity + 1)}">+</button>
                    <button class="remove-btn" @click="${() => this.removeFromCart(item.id)}">🗑️</button>
                  </div>
                </div>
              `)}
            </div>

            <div class="cart-summary">
              <div class="cart-total">
                <div class="total-row">
                  <span>Total:</span>
                  <span class="total-amount">€${total.toFixed(2)}</span>
                </div>
              </div>

              <div class="cart-actions">
                <button class="clear-cart-btn" @click="${this.clearCart}">
                  Clear Cart
                </button>
                <button class="checkout-btn" @click="${() => this.showNotification('Payment feature coming soon!', 'info')}">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }

  updateItemQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.updateCartCount();
      this.saveCart();
      this.requestUpdate();
    }
  }

  // Rendu de la page d'accueil
  renderHome() {
    return html`
      <!-- Hero Section -->
      <section class="hero-section animate-fade-in-up animate-delay-1">
        <h1 class="hero-title animate-float">Bienvenue chez PolymerShop Modern</h1>
        <p class="hero-subtitle">
          Découvrez notre collection de produits modernes avec une expérience e-commerce exceptionnelle.
          Interface hybride combinant design moderne et fonctionnalités avancées.
        </p>
        <button class="cta-button animate-pulse" @click="${() => console.log('CTA clicked')}">
          Découvrir nos produits
        </button>
      </section>

      <!-- Status Section -->
      <section class="status-section animate-scale-in animate-delay-2">
        <h3 class="status-title">✅ Application Loaded Successfully!</h3>
        <p class="status-text">
          PolymerShop Modern v2.0.0 - Interface hybride fonctionnelle avec toutes les technologies modernes
        </p>
      </section>

      <!-- Products Section -->
      <section class="products-section animate-fade-in-up animate-delay-3">
        <h2 class="section-title">
          ${this.searchQuery ? `Résultats pour "${this.searchQuery}"` : 'Nos Produits Populaires'}
        </h2>
        <div class="products-grid">
          ${this.filteredProducts.map((product, index) => html`
            <div class="product-card animate-scale-in animate-delay-${(index % 5) + 1}" @click="${() => this.navigateTo('product-detail', product)}">
              <div class="product-image">
                ${this.renderProductImage(product.image)}
              </div>
              <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">€${product.price.toFixed(2)}</div>
                <button
                  class="add-to-cart"
                  @click="${(e) => { e.stopPropagation(); this.addToCart(product); }}"
                  aria-label="Add ${product.name} to shopping cart"
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          `)}
        </div>

        ${this.filteredProducts.length === 0 ? html`
          <div style="text-align: center; padding: 3rem; color: #b8b8b8;">
            <h3>No products found</h3>
            <p>Try modifying your search terms.</p>
            <button class="cta-button" @click="${this.clearSearch}" style="margin-top: 1rem;">
              View all products
            </button>
          </div>
        ` : ''}
      </section>

      <!-- Features Section -->
      <section class="features-section animate-fade-in-up animate-delay-4">
        <h2 class="section-title">Why Choose OceanShop Modern?</h2>
        <div class="features-grid">
          <div class="feature-item animate-scale-in animate-delay-1">
            <div class="feature-icon animate-float">⚡</div>
            <h3 class="feature-title">Performance</h3>
            <p class="feature-description">
              Ultra-fast application built with the latest web technologies
            </p>
          </div>
          <div class="feature-item animate-scale-in animate-delay-2">
            <div class="feature-icon animate-float">🔒</div>
            <h3 class="feature-title">Security</h3>
            <p class="feature-description">
              Secure payments and protection of your personal data
            </p>
          </div>
          <div class="feature-item animate-scale-in animate-delay-3">
            <div class="feature-icon animate-float">📱</div>
            <h3 class="feature-title">Mobile First</h3>
            <p class="feature-description">
              Interface optimized for all devices, from mobile to desktop
            </p>
          </div>
          <div class="feature-item animate-scale-in animate-delay-4">
            <div class="feature-icon animate-float">🚚</div>
            <h3 class="feature-title">Fast Delivery</h3>
            <p class="feature-description">
              Shipping within 24h and free delivery from €50
            </p>
          </div>
        </div>
      </section>
    `;
  }

  // Rendu des nouvelles pages
  renderProducts() {
    return html`
      <div class="products-page animate-fade-in-up">
        <div class="page-header">
          <button class="back-button" @click="${() => this.navigateTo('home')}">
            ← Back to Home
          </button>
          <h1>All Our Products</h1>
        </div>

        <!-- Filters and sorting -->
        <div class="products-filters">
          <div class="filter-section">
            <h3>Categories</h3>
            <div class="category-filters">
              <button class="filter-btn ${!this.selectedCategory ? 'active' : ''}" @click="${() => this.filterByCategory(null)}">
                All (${this.allProducts.length})
              </button>
              ${this.getCategories().map(category => html`
                <button class="filter-btn ${this.selectedCategory === category ? 'active' : ''}" @click="${() => this.filterByCategory(category)}">
                  ${this.getCategoryName(category)} (${this.getProductsByCategory(category).length})
                </button>
              `)}
            </div>
          </div>
        </div>

        <!-- Grille de produits -->
        <div class="products-grid-full">
          ${this.getFilteredProducts().map((product, index) => html`
            <div class="product-card animate-scale-in animate-delay-${(index % 5) + 1}" @click="${() => this.navigateTo('product-detail', product)}">
              <div class="product-image">
                ${this.renderProductImage(product.image)}
              </div>
              <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                  <div class="stars">
                    ${Array.from({length: 5}, (_, i) =>
                      html`<span class="star ${i < Math.floor(product.rating) ? 'filled' : ''}">★</span>`
                    )}
                  </div>
                  <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-prices">
                  <span class="current-price">€${product.price.toFixed(2)}</span>
                  ${product.originalPrice ? html`
                    <span class="original-price">€${product.originalPrice.toFixed(2)}</span>
                  ` : ''}
                </div>
                <button
                  class="add-to-cart"
                  @click="${(e) => { e.stopPropagation(); this.addToCart(product); }}"
                  aria-label="Add ${product.name} to shopping cart"
                  type="button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          `)}
        </div>

        ${this.getFilteredProducts().length === 0 ? html`
          <div class="no-results">
            <div class="no-results-icon">🔍</div>
            <h3>No products found</h3>
            <p>Try changing the filters or <a href="#" @click="${() => this.navigateTo('home')}">return to home</a></p>
          </div>
        ` : ''}
      </div>
    `;
  }

  renderAbout() {
    return html`
      <div class="about-page animate-fade-in-up">
        <div class="page-header">
          <button class="back-button" @click="${() => this.navigateTo('home')}">
            ← Back to Home
          </button>
          <h1>About OceanShop Modern</h1>
        </div>

        <div class="about-content">
          <section class="about-hero">
            <div class="about-hero-content">
              <h2>Our Story</h2>
              <p>
                OceanShop Modern was born from a passion for modern technologies and elegant design.
                We believe that e-commerce should be a smooth, intuitive and pleasant experience, like ocean waves.
              </p>
              <p>
                Inspired by ocean depths and modern web best practices, we use the latest technologies
                like Lit, Web Components and Material Design to create exceptional user experiences.
              </p>
            </div>
            <div class="about-hero-image">
              <div class="tech-stack">
                <div class="tech-item">
                  <div class="tech-icon">⚡</div>
                  <span>Lit 3.x</span>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">🌐</div>
                  <span>Web Components</span>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">🎨</div>
                  <span>Material Design</span>
                </div>
                <div class="tech-item">
                  <div class="tech-icon">📱</div>
                  <span>PWA Ready</span>
                </div>
              </div>
            </div>
          </section>

          <section class="about-values">
            <h2>Our Values</h2>
            <div class="values-grid">
              <div class="value-item">
                <div class="value-icon">🚀</div>
                <h3>Innovation</h3>
                <p>Always at the forefront of modern web technologies</p>
              </div>
              <div class="value-item">
                <div class="value-icon">🎯</div>
                <h3>Quality</h3>
                <p>Each product is carefully selected</p>
              </div>
              <div class="value-item">
                <div class="value-icon">🤝</div>
                <h3>Transparency</h3>
                <p>Clear information and direct communication</p>
              </div>
              <div class="value-item">
                <div class="value-icon">🌱</div>
                <h3>Sustainability</h3>
                <p>Commitment to responsible e-commerce</p>
              </div>
            </div>
          </section>

          <section class="about-stats">
            <h2>Our Numbers</h2>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">${this.allProducts.length}</div>
                <div class="stat-label">Products</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">${this.allProducts.reduce((sum, p) => sum + p.reviews, 0)}</div>
                <div class="stat-label">Customer Reviews</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Satisfaction</div>
              </div>
            </div>
          </section>

          <section class="about-cta">
            <h2>Ready to discover our products?</h2>
            <p>Explore our catalog and find the perfect product for you.</p>
            <button class="cta-button" @click="${() => this.navigateTo('products')}">
              View Our Products
            </button>
          </section>
        </div>
      </div>
    `;
  }

  renderContact() {
    return html`
      <div class="contact-page animate-fade-in-up">
        <div class="page-header">
          <button class="back-button" @click="${() => this.navigateTo('home')}">
            ← Back to Home
          </button>
          <h1>Contact Us</h1>
        </div>

        <div class="contact-content">
          <div class="contact-grid">
            <div class="contact-info">
              <h2>Contact Information</h2>
              <div class="contact-details">
                <div class="contact-item">
                  <div class="contact-icon">📧</div>
                  <div>
                    <h3>Email</h3>
                    <p>contact@oceanshop-modern.com</p>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">📞</div>
                  <div>
                    <h3>Phone</h3>
                    <p>+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">📍</div>
                  <div>
                    <h3>Address</h3>
                    <p>123 Commerce Street<br>75001 Paris, France</p>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon">🕒</div>
                  <div>
                    <h3>Hours</h3>
                    <p>Mon-Fri: 9am-6pm<br>Sat: 10am-5pm</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="contact-form">
              <h2>Send us a message</h2>
              <form @submit="${this.handleContactSubmit}">
                <div class="form-group">
                  <label for="name">Full Name</label>
                  <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <select id="subject" name="subject" required>
                    <option value="">Choose a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="commande">Order Tracking</option>
                    <option value="retour">Product Return</option>
                    <option value="autre">Other</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div class="contact-faq">
            <h2>Frequently Asked Questions</h2>
            <div class="faq-grid">
              <div class="faq-item">
                <h3>Free shipping?</h3>
                <p>Yes, free shipping from €50 purchase.</p>
              </div>
              <div class="faq-item">
                <h3>Delivery times?</h3>
                <p>24-48h for mainland France.</p>
              </div>
              <div class="faq-item">
                <h3>Return possible?</h3>
                <p>Free return within 30 days.</p>
              </div>
              <div class="faq-item">
                <h3>Secure payment?</h3>
                <p>256-bit SSL and secure online payment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Méthodes utilitaires pour les nouvelles pages
  getCategories() {
    return [...new Set(this.allProducts.map(product => product.category))];
  }

  getCategoryName(category) {
    const names = {
      smartphones: 'Smartphones',
      ordinateurs: 'Computers',
      audio: 'Audio',
      wearables: 'Wearables',
      ecrans: 'Screens',
      peripheriques: 'Peripherals',
      securite: 'Security',
      tablettes: 'Tablets'
    };
    return names[category] || category;
  }

  getProductsByCategory(category) {
    return this.allProducts.filter(product => product.category === category);
  }

  filterByCategory(category) {
    this.selectedCategory = category;
    this.requestUpdate();
  }

  getFilteredProducts() {
    if (!this.selectedCategory) {
      return this.allProducts;
    }
    return this.allProducts.filter(product => product.category === this.selectedCategory);
  }

  handleContactSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    // Simulation d'envoi
    this.showNotification('Message sent successfully! We will reply within 24 hours.', 'success');

    // Réinitialiser le formulaire
    e.target.reset();
  }

  renderProductImage(imageType) {
    // Utiliser lazy loading pour les images
    const lazyClass = 'lazy';
    const lazyAttrs = 'loading="lazy" decoding="async"';

    switch(imageType) {
      case '📱':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <rect x="5" y="2" width="14" height="20" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <rect x="7" y="4" width="10" height="12" rx="1" fill="rgba(255,107,157,0.1)"/>
          <circle cx="12" cy="18" r="1" fill="#ff6b9d"/>
          <rect x="10" y="6" width="4" height="2" rx="1" fill="#3282b8"/>
          <rect x="9" y="9" width="6" height="1" rx="0.5" fill="#3282b8"/>
          <rect x="9" y="11" width="4" height="1" rx="0.5" fill="#3282b8"/>
        </svg>`;
      case '💻':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <rect x="3" y="4" width="18" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <rect x="4" y="5" width="16" height="8" rx="1" fill="rgba(255,107,157,0.1)"/>
          <rect x="2" y="16" width="20" height="2" rx="1" fill="#3282b8"/>
          <rect x="8" y="18" width="8" height="1" rx="0.5" fill="#3282b8"/>
          <rect x="10" y="7" width="4" height="2" rx="0.5" fill="#3282b8"/>
          <rect x="9" y="10" width="6" height="1" rx="0.5" fill="#3282b8"/>
          <rect x="9" y="12" width="4" height="1" rx="0.5" fill="#3282b8"/>
        </svg>`;
      case '🎧':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <path d="M3 14v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <path d="M21 14v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <path d="M8 14v-4a4 4 0 0 1 8 0v4" stroke="#c44569" stroke-width="2" fill="none"/>
          <circle cx="12" cy="10" r="2" fill="rgba(0,212,170,0.2)"/>
          <rect x="6" y="12" width="2" height="4" rx="1" fill="#3282b8"/>
          <rect x="16" y="12" width="2" height="4" rx="1" fill="#3282b8"/>
          <path d="M10 16h4" stroke="#00d4aa" stroke-width="1" stroke-linecap="round"/>
        </svg>`;
      case '⌚':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <circle cx="12" cy="12" r="10" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <circle cx="12" cy="12" r="8" fill="rgba(255,107,157,0.1)"/>
          <circle cx="12" cy="12" r="6" stroke="#c44569" stroke-width="1" fill="none"/>
          <path d="M12 6v6l4 2" stroke="#00d4aa" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="12" r="1" fill="#3282b8"/>
          <rect x="10" y="2" width="4" height="2" rx="1" fill="#3282b8"/>
          <rect x="10" y="20" width="4" height="2" rx="1" fill="#3282b8"/>
          <rect x="2" y="10" width="2" height="4" rx="1" fill="#3282b8"/>
          <rect x="20" y="10" width="2" height="4" rx="1" fill="#3282b8"/>
        </svg>`;
      case '🖥️':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <rect x="6" y="8" width="12" height="8" rx="1" fill="rgba(255,107,157,0.1)"/>
          <rect x="8" y="10" width="8" height="4" rx="0.5" fill="#3282b8"/>
          <rect x="9" y="11" width="6" height="2" rx="0.5" fill="#ff6b9d"/>
          <circle cx="12" cy="4" r="1" fill="#3282b8"/>
          <path d="M12 4v2" stroke="#c44569" stroke-width="1"/>
          <rect x="10" y="18" width="4" height="2" rx="1" fill="#3282b8"/>
        </svg>`;
      case '⌨️':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <rect x="3" y="8" width="18" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <rect x="5" y="10" width="14" height="8" rx="1" fill="rgba(255,107,157,0.1)"/>
          <rect x="7" y="12" width="10" height="4" rx="0.5" fill="#3282b8"/>
          <rect x="8" y="13" width="8" height="2" rx="0.5" fill="#ff6b9d"/>
          <circle cx="12" cy="6" r="2" fill="#3282b8"/>
          <path d="M10 6h4" stroke="#00d4aa" stroke-width="1"/>
          <rect x="9" y="18" width="6" height="2" rx="1" fill="#3282b8"/>
        </svg>`;
      case '📷':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <circle cx="12" cy="12" r="8" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <circle cx="12" cy="12" r="6" fill="rgba(255,107,157,0.1)"/>
          <circle cx="12" cy="12" r="4" stroke="#c44569" stroke-width="1" fill="none"/>
          <path d="M8 8l8 8" stroke="#00d4aa" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 8l-8 8" stroke="#00d4aa" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="12" r="1" fill="#3282b8"/>
          <rect x="10" y="2" width="4" height="2" rx="1" fill="#3282b8"/>
          <rect x="10" y="20" width="4" height="2" rx="1" fill="#3282b8"/>
        </svg>`;
      case '📱':
        return html`<svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${lazyAttrs}>
          <rect x="2" y="6" width="20" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
          <rect x="4" y="8" width="16" height="8" rx="1" fill="rgba(255,107,157,0.1)"/>
          <rect x="6" y="10" width="12" height="4" rx="0.5" fill="#3282b8"/>
          <rect x="7" y="11" width="10" height="2" rx="0.5" fill="#ff6b9d"/>
          <circle cx="12" cy="4" r="1" fill="#3282b8"/>
          <path d="M12 4v2" stroke="#c44569" stroke-width="1"/>
          <rect x="8" y="18" width="8" height="2" rx="1" fill="#3282b8"/>
          <rect x="10" y="20" width="4" height="1" rx="0.5" fill="#3282b8"/>
        </svg>`;
      default:
        return html`<span style="font-size: 4rem;">${imageType}</span>`;
    }
  }

  render() {
    return html`
      <div class="app-container">
        <!-- Header -->
        <header class="header animate-fade-in">
          <div class="header-content">
            <div class="logo animate-slide-in-left">
              🌊 OceanShop Modern
            </div>
            <nav class="nav animate-slide-in-right animate-delay-1">
              <a href="#" class="nav-item" @click="${() => this.navigateTo('home')}">Home</a>
              <a href="#" class="nav-item" @click="${() => this.navigateTo('products')}">Products</a>
              <a href="#" class="nav-item" @click="${() => this.navigateTo('about')}">About</a>
              <a href="#" class="nav-item" @click="${() => this.navigateTo('contact')}">Contact</a>

              <!-- Barre de recherche -->
              <div class="search-container" role="search" aria-label="Search products">
                <input
                  type="text"
                  class="search-input"
                  placeholder="Search for products..."
                  .value="${this.searchQuery}"
                  @input="${this.updateSearch}"
                  aria-label="Search input"
                  aria-describedby="${this.searchQuery ? 'search-results' : ''}"
                  autocomplete="off"
                />
                ${this.searchQuery ? html`
                  <button
                    class="clear-search"
                    @click="${this.clearSearch}"
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                ` : ''}
              </div>

              <!-- Compteur de résultats -->
              ${this.searchQuery ? html`
                <div class="search-results" id="search-results" role="status" aria-live="polite">
                  ${this.getSearchResultsCount()} result${this.getSearchResultsCount() !== 1 ? 's' : ''} for "${this.searchQuery}"
                </div>
              ` : ''}
            </nav>
            <button
              class="cart-button animate-bounce-in animate-delay-2"
              @click="${() => this.navigateTo('cart')}"
              aria-label="Open shopping cart, ${this.cartCount} items"
              aria-expanded="false"
            >
              🛒 Cart
              <span class="cart-count" aria-label="${this.cartCount} items in cart">(${this.cartCount})</span>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="main-content" role="main" aria-label="Main content">
          ${this.currentView === 'home' ? this.renderHome() :
            this.currentView === 'products' ? this.renderProducts() :
            this.currentView === 'product-detail' ? this.renderProductDetail() :
            this.currentView === 'cart' ? this.renderCart() :
            this.currentView === 'about' ? this.renderAbout() :
            this.currentView === 'contact' ? this.renderContact() :
            this.renderHome()}
        </main>
          <!-- Hero Section -->
          <section class="hero-section animate-fade-in-up animate-delay-1">
            <h1 class="hero-title animate-float">Welcome to OceanShop Modern</h1>
            <p class="hero-subtitle">
              Dive into our collection of modern products with an exceptional e-commerce experience.
              Hybrid interface combining ocean-inspired design and advanced features.
            </p>
            <button class="cta-button animate-pulse" @click="${() => console.log('CTA clicked')}">
              Discover Our Products
            </button>
          </section>

          <!-- Status Section -->
          <section class="status-section animate-scale-in animate-delay-2">
            <h3 class="status-title">✅ Application Loaded Successfully!</h3>
            <p class="status-text">
              OceanShop Modern v2.0.0 - Fully functional hybrid interface with all modern technologies
            </p>
          </section>

          <!-- Products Section -->
          <section class="products-section animate-fade-in-up animate-delay-3">
            <h2 class="section-title">
              ${this.searchQuery ? `Results for "${this.searchQuery}"` : 'Our Popular Products'}
            </h2>
            <div class="products-grid">
              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="5" y="2" width="14" height="20" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <rect x="7" y="4" width="10" height="12" rx="1" fill="rgba(255,107,157,0.1)"/>
                    <circle cx="12" cy="18" r="1" fill="#ff6b9d"/>
                    <rect x="10" y="6" width="4" height="2" rx="1" fill="#3282b8"/>
                    <rect x="9" y="9" width="6" height="1" rx="0.5" fill="#3282b8"/>
                    <rect x="9" y="11" width="4" height="1" rx="0.5" fill="#3282b8"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">Premium Smartphone</h3>
                  <p class="product-description">
                    A high-end smartphone with the latest technologies and elegant design.
                  </p>
                  <div class="product-price">€899.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <rect x="4" y="5" width="16" height="8" rx="1" fill="rgba(255,107,157,0.1)"/>
                    <rect x="2" y="16" width="20" height="2" rx="1" fill="#3282b8"/>
                    <rect x="8" y="18" width="8" height="1" rx="0.5" fill="#3282b8"/>
                    <rect x="10" y="7" width="4" height="2" rx="0.5" fill="#3282b8"/>
                    <rect x="9" y="10" width="6" height="1" rx="0.5" fill="#3282b8"/>
                    <rect x="9" y="12" width="4" height="1" rx="0.5" fill="#3282b8"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">Laptop Pro</h3>
                  <p class="product-description">
                    Professional laptop with exceptional performance for work.
                  </p>
                  <div class="product-price">€1,299.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 14v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <path d="M21 14v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <path d="M8 14v-4a4 4 0 0 1 8 0v4" stroke="#00a8cc" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="10" r="2" fill="rgba(0,212,170,0.2)"/>
                    <rect x="6" y="12" width="2" height="4" rx="1" fill="#00a8cc"/>
                    <rect x="16" y="12" width="2" height="4" rx="1" fill="#00a8cc"/>
                    <path d="M10 16h4" stroke="#00d4aa" stroke-width="1" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">Wireless Headphones</h3>
                  <p class="product-description">
                    Bluetooth headphones with active noise cancellation and high-quality sound.
                  </p>
                  <div class="product-price">€199.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="12" r="8" fill="rgba(0,212,170,0.1)"/>
                    <circle cx="12" cy="12" r="6" stroke="#00a8cc" stroke-width="1" fill="none"/>
                    <path d="M12 6v6l4 2" stroke="#00d4aa" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="12" r="1" fill="#00a8cc"/>
                    <rect x="10" y="2" width="4" height="2" rx="1" fill="#00a8cc"/>
                    <rect x="10" y="20" width="4" height="2" rx="1" fill="#00a8cc"/>
                    <rect x="2" y="10" width="2" height="4" rx="1" fill="#00a8cc"/>
                    <rect x="20" y="10" width="2" height="4" rx="1" fill="#00a8cc"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">Smart Watch</h3>
                  <p class="product-description">
                    Smart watch with health tracking, notifications and long battery life.
                  </p>
                  <div class="product-price">€299.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Additional Products Section -->
          <section class="products-section">
            <h2 class="section-title">Nouveautés</h2>
            <div class="products-grid">
              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="6" width="16" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <rect x="6" y="8" width="12" height="8" rx="1" fill="rgba(255,107,157,0.1)"/>
                    <rect x="8" y="10" width="8" height="4" rx="0.5" fill="#3282b8"/>
                    <rect x="9" y="11" width="6" height="2" rx="0.5" fill="#ff6b9d"/>
                    <circle cx="12" cy="4" r="1" fill="#3282b8"/>
                    <path d="M12 4v2" stroke="#c44569" stroke-width="1"/>
                    <rect x="10" y="18" width="4" height="2" rx="1" fill="#3282b8"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">Écran 4K Ultra HD</h3>
                  <p class="product-description">
                    Moniteur 27 pouces avec résolution 4K, couleurs précises et design élégant.
                  </p>
                  <div class="product-price">€599.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="8" width="18" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <rect x="5" y="10" width="14" height="8" rx="1" fill="rgba(0,212,170,0.1)"/>
                    <rect x="7" y="12" width="10" height="4" rx="0.5" fill="#00a8cc"/>
                    <rect x="8" y="13" width="8" height="2" rx="0.5" fill="#00d4aa"/>
                    <circle cx="12" cy="6" r="2" fill="#00a8cc"/>
                    <path d="M10 6h4" stroke="#00d4aa" stroke-width="1"/>
                    <rect x="9" y="18" width="6" height="2" rx="1" fill="#00a8cc"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">Clavier Mécanique</h3>
                  <p class="product-description">
                    Clavier gaming avec switches mécaniques, rétroéclairage RGB et design ergonomique.
                  </p>
                  <div class="product-price">€149.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="8" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <circle cx="12" cy="12" r="6" fill="rgba(0,212,170,0.1)"/>
                    <circle cx="12" cy="12" r="4" stroke="#00a8cc" stroke-width="1" fill="none"/>
                    <path d="M8 8l8 8" stroke="#00d4aa" stroke-width="2" stroke-linecap="round"/>
                    <path d="M16 8l-8 8" stroke="#00d4aa" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="12" cy="12" r="1" fill="#00a8cc"/>
                    <rect x="10" y="2" width="4" height="2" rx="1" fill="#00a8cc"/>
                    <rect x="10" y="20" width="4" height="2" rx="1" fill="#00a8cc"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">360° Camera</h3>
                  <p class="product-description">
                    Connected security camera with 360° vision, motion detection and mobile app.
                  </p>
                  <div class="product-price">€249.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div class="product-card">
                <div class="product-image">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="6" width="20" height="12" rx="2" stroke="#00d4aa" stroke-width="2" fill="none"/>
                    <rect x="4" y="8" width="16" height="8" rx="1" fill="rgba(0,212,170,0.1)"/>
                    <rect x="6" y="10" width="12" height="4" rx="0.5" fill="#00a8cc"/>
                    <rect x="7" y="11" width="10" height="2" rx="0.5" fill="#00d4aa"/>
                    <circle cx="12" cy="4" r="1" fill="#00a8cc"/>
                    <path d="M12 4v2" stroke="#00a8cc" stroke-width="1"/>
                    <rect x="8" y="18" width="8" height="2" rx="1" fill="#00a8cc"/>
                    <rect x="10" y="20" width="4" height="1" rx="0.5" fill="#00a8cc"/>
                  </svg>
                </div>
                <div class="product-info">
                  <h3 class="product-name">Pro Tablet</h3>
                  <p class="product-description">
                    Professional tablet with stylus, high-resolution screen and premium performance.
                  </p>
                  <div class="product-price">€799.99</div>
                  <button class="add-to-cart" @click="${this.addToCart}">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </section>

          <!-- Features Section -->
          <section class="features-section animate-fade-in-up animate-delay-4">
            <h2 class="section-title">Why Choose OceanShop Modern?</h2>
            <div class="features-grid">
              <div class="feature-item animate-scale-in animate-delay-1">
                <div class="feature-icon animate-float">⚡</div>
                <h3 class="feature-title">Performance</h3>
                <p class="feature-description">
                  Application ultra-rapide construite avec les dernières technologies web
                </p>
              </div>
              <div class="feature-item animate-scale-in animate-delay-2">
                <div class="feature-icon animate-float">🔒</div>
                <h3 class="feature-title">Security</h3>
                <p class="feature-description">
                  Paiements sécurisés et protection de vos données personnelles
                </p>
              </div>
              <div class="feature-item animate-scale-in animate-delay-3">
                <div class="feature-icon animate-float">📱</div>
                <h3 class="feature-title">Mobile First</h3>
                <p class="feature-description">
                  Interface optimisée pour tous les appareils, de mobile à desktop
                </p>
              </div>
              <div class="feature-item animate-scale-in animate-delay-4">
                <div class="feature-icon animate-float">🚚</div>
                <h3 class="feature-title">Fast Delivery</h3>
                <p class="feature-description">
                  Expédition sous 24h et livraison gratuite à partir de €50
                </p>
              </div>
            </div>
          </section>
        </main>

        <!-- Footer -->
        <footer class="footer animate-fade-in-up animate-delay-5">
          <p>&copy; 2024 OceanShop Modern. All rights reserved.</p>
          <p>Built with ❤️ using Lit, Web Components and Material Design</p>
        </footer>
      </div>
    `;
  }
}

// Register the custom element
customElements.define('polymershop-app', PolymerShopApp);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const app = document.createElement('polymershop-app');
    appContainer.appendChild(app);
    console.log('PolymerShop Modern Hybrid app loaded successfully!');
  }
});