// Test Lit étape par étape pour diagnostiquer le problème

console.log('🚀 Starting Lit step-by-step test...');

// Étape 1: Test de l'import Lit de base
let LitElement, html, css;
try {
  const litModule = await import('lit');
  LitElement = litModule.LitElement;
  html = litModule.html;
  css = litModule.css;
  console.log('✅ Étape 1 - Lit import successful');
} catch (error) {
  console.error('❌ Étape 1 - Lit import failed:', error);
  // Fallback: utiliser du JavaScript vanilla
  document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '<h1 style="color: red;">Lit import failed, using fallback</h1><p>Error: ' + error.message + '</p>';
    }
  });
  throw error;
}

// Étape 2: Test des décorateurs (si Lit fonctionne)
let customElement, property, state;
try {
  const decoratorsModule = await import('lit/decorators.js');
  customElement = decoratorsModule.customElement;
  property = decoratorsModule.property;
  state = decoratorsModule.state;
  console.log('✅ Étape 2 - Decorators import successful');
} catch (error) {
  console.error('❌ Étape 2 - Decorators import failed:', error);
}

// Étape 3: Test des services
let CartService, ProductService;
try {
  const cartModule = await import('./services/cart-service.js');
  CartService = cartModule.CartService;

  const productModule = await import('./services/product-service.js');
  ProductService = productModule.ProductService;

  console.log('✅ Étape 3 - Services import successful');
} catch (error) {
  console.error('❌ Étape 3 - Services import failed:', error);
}

// Étape 4: Créer un composant simple si tout fonctionne
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM Content Loaded');

  const app = document.getElementById('app');
  if (!app) {
    console.error('❌ App container not found');
    return;
  }

  try {
    // Créer un composant simple avec Lit
    class TestLitComponent extends LitElement {
      static styles = css`
        :host {
          display: block;
          padding: 20px;
          background: linear-gradient(135deg, #0f4c75, #3282b8);
          color: white;
          border-radius: 12px;
          margin: 20px;
        }

        h1 {
          margin: 0 0 10px 0;
          color: #ffffff;
        }

        .status {
          padding: 10px;
          margin: 10px 0;
          border-radius: 8px;
        }

        .success { background: rgba(76, 175, 80, 0.2); color: #81c784; }
        .error { background: rgba(244, 67, 54, 0.2); color: #ef5350; }
      `;

      render() {
        return html`
          <h1>🎉 Lit Component Working!</h1>

          <div class="status success">
            ✅ Lit import: OK<br>
            ✅ Decorators: ${customElement ? 'OK' : 'FAILED'}<br>
            ✅ Services: ${CartService ? 'OK' : 'FAILED'}<br>
            ✅ Component: OK
          </div>

          <p>Timestamp: ${new Date().toLocaleString()}</p>

          <button @click=${() => alert('Lit event handling works! 🎉')}>
            Test Lit Event
          </button>
        `;
      }
    }

    // Enregistrer le composant
    customElements.define('test-lit-component', TestLitComponent);

    // Créer l'instance
    const component = document.createElement('test-lit-component');
    app.appendChild(component);

    console.log('✅ Lit component created successfully');

  } catch (error) {
    console.error('❌ Error creating Lit component:', error);

    // Fallback en cas d'erreur
    app.innerHTML = `
      <div style="padding: 20px; background: #ffebee; border: 2px solid #f44336; border-radius: 8px; margin: 20px;">
        <h1 style="color: #c62828; margin: 0 0 10px 0;">❌ Lit Component Failed</h1>
        <p style="color: #d32f2f; margin: 0 0 10px 0;">Error: ${error.message}</p>
        <p style="color: #666; margin: 0;">Using fallback vanilla JavaScript...</p>
      </div>
    `;
  }
});
