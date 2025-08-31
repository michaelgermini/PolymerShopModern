// Lit Entry Point with proper configuration
import './lit-app.js';

/**
 * Lit-based entry point for PolymerShop
 */
document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    // Clear any existing content
    appContainer.innerHTML = '';

    // Create Lit component
    const litApp = document.createElement('lit-polymershop-app');
    appContainer.appendChild(litApp);

    console.log('🚀 PolymerShop Lit version loaded successfully!');
  } else {
    console.error('❌ App container not found!');
  }
});
