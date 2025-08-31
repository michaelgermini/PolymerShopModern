import './app-simple.js';

/**
 * Simple entry point for the PolymerShop application
 */
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const app = document.createElement('polymer-shop-app');
    appContainer.appendChild(app);
    console.log('PolymerShop Modern app loaded successfully!');
  } else {
    console.error('App container not found!');
  }
});
