# 🤝 Guide de Contribution - PolymerShop Modern

Bienvenue ! Nous sommes ravis que vous souhaitiez contribuer à PolymerShop Modern. Ce guide vous aidera à comprendre comment contribuer efficacement à ce projet.

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Configuration de l'Environnement](#configuration-de-lenvironnement)
- [Structure du Projet](#structure-du-projet)
- [Guidelines de Développement](#guidelines-de-développement)
- [Processus de Pull Request](#processus-de-pull-request)
- [Tests et Qualité](#tests-et-qualité)

## 🤝 Code de Conduite

Ce projet suit un code de conduite pour assurer un environnement accueillant pour tous. En participant, vous acceptez de :

- 🎯 Être respectueux et inclusif
- 🤝 Collaborer constructivement
- 🔍 Respecter les opinions divergentes
- 📝 Fournir un feedback utile
- 🎉 Célébrer les succès de l'équipe

## 🚀 Comment Contribuer

### Types de Contributions

#### 🐛 **Rapports de Bugs**
- Utilisez le template de bug dans [Issues](https://github.com/votre-username/polymershop-modern/issues/new?template=bug_report.md)
- Incluez les étapes pour reproduire
- Ajoutez captures d'écran si pertinent
- Spécifiez votre environnement (OS, navigateur, version)

#### 💡 **Fonctionnalités**
- Vérifiez les [Issues](https://github.com/votre-username/polymershop-modern/issues) existantes
- Utilisez le template de fonctionnalité
- Décrivez le problème résolu
- Proposez une solution détaillée

#### 📝 **Documentation**
- Corrections de fautes
- Améliorations de clarté
- Nouveaux guides ou tutoriels
- Traductions

#### 🛠️ **Code**
- Corrections de bugs
- Nouvelles fonctionnalités
- Améliorations de performance
- Refactoring

## 🛠️ Configuration de l'Environnement

### Prérequis
- Node.js >= 18.0.0
- npm >= 8.0.0
- Git

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/polymershop-modern.git
cd polymershop-modern

# Installer les dépendances
npm install

# Installer les dépendances de développement optionnelles
npm install --save-dev eslint prettier lighthouse

# Démarrer le serveur de développement
npm run dev
```

### Outils Recommandés

#### IDE
- [VS Code](https://code.visualstudio.com/) avec extensions :
  - Lit Plugin
  - ESLint
  - Prettier
  - GitLens

#### Navigateurs
- Chrome/Chromium (développement)
- Firefox (tests cross-browser)
- Safari (tests iOS)

## 📁 Structure du Projet

```
polymershop-modern/
├── 📁 src/
│   ├── 📄 main.js                 # Point d'entrée
│   ├── 📄 app.js                  # Application principale
│   ├── 📁 components/             # Composants Web Components
│   ├── 📁 services/              # Services métier
│   └── 📁 utils/                 # Utilitaires
├── 📁 public/                    # Assets statiques
├── 📁 docs/                      # Documentation
├── 📁 tests/                     # Tests
└── 📁 scripts/                   # Scripts de build/déploiement
```

## 📏 Guidelines de Développement

### 🏗️ **Architecture**

#### Web Components
```javascript
// Bon exemple
class ProductCard extends LitElement {
  static properties = {
    product: { type: Object },
    loading: { type: Boolean }
  };

  static styles = css`
    :host {
      display: block;
      border-radius: 8px;
      box-shadow: var(--shadow);
    }
  `;

  render() {
    return html`
      <div class="product-card">
        <img src="${this.product.image}" alt="${this.product.name}" loading="lazy">
        <h3>${this.product.name}</h3>
        <p>${this.product.description}</p>
      </div>
    `;
  }
}
```

#### Services
```javascript
// Bon exemple
export class CartService {
  constructor() {
    this.items = [];
    this.listeners = new Set();
  }

  addItem(product, quantity = 1) {
    // Validation
    if (!product || !product.id) {
      throw new Error('Invalid product');
    }

    // Logique métier
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...product, quantity });
    }

    // Notification
    this._notifyListeners();
  }
}
```

### 🎨 **Styles et Design**

#### CSS Custom Properties
```css
/* Préférer les variables CSS */
:root {
  --primary-color: #3498db;
  --spacing-unit: 8px;
  --border-radius: 4px;
}

.product-card {
  padding: calc(var(--spacing-unit) * 2);
  border-radius: var(--border-radius);
}
```

#### Responsive Design
```css
/* Mobile-first approach */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-unit);
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### ♿ **Accessibilité**

#### Attributs ARIA
```javascript
// Bon exemple
render() {
  return html`
    <button
      @click="${this.handleClick}"
      aria-label="Ajouter ${this.product.name} au panier"
      aria-expanded="false"
    >
      🛒 Ajouter au panier
    </button>
  `;
}
```

#### Navigation Clavier
```javascript
// Gestion des événements clavier
_handleKeydown(event) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      this.handleClick();
      break;
    case 'Escape':
      this.close();
      break;
  }
}
```

### ⚡ **Performance**

#### Code Splitting
```javascript
// Lazy loading des composants
const ProductDetail = lazy(() =>
  import('./components/ProductDetail.js')
);

// Préchargement intelligent
if (userIsLikelyToClick) {
  import('./components/HeavyComponent.js');
}
```

#### Optimisations Images
```javascript
// Utiliser des attributs modernes
render() {
  return html`
    <img
      src="${this.imageSrc}"
      alt="${this.altText}"
      loading="lazy"
      decoding="async"
      width="${this.width}"
      height="${this.height}"
    >
  `;
}
```

## 🔄 Processus de Pull Request

### 1. Préparation
```bash
# Créer une branche
git checkout -b feature/amazing-feature

# Ou pour un bug fix
git checkout -b fix/bug-description

# Ou pour la documentation
git checkout -b docs/update-readme
```

### 2. Développement
```bash
# Installer les dépendances si nécessaire
npm install

# Démarrer le développement
npm run dev

# Vérifier la qualité du code
npm run lint
npm run format

# Tests d'accessibilité et performance
npm run audit:acc
npm run audit:perf
```

### 3. Tests
```bash
# Tests unitaires (à implémenter)
npm run test

# Tests manuels
# - Vérifier dans différents navigateurs
# - Tester l'accessibilité avec un lecteur d'écran
# - Vérifier les performances avec Lighthouse
```

### 4. Commit
```bash
# Commits conventionnels
git add .

# Fonctionnalité
git commit -m "feat: add amazing new feature"

# Correction de bug
git commit -m "fix: resolve issue with product loading"

# Documentation
git commit -m "docs: update installation guide"

# Performance
git commit -m "perf: optimize image lazy loading"

# Accessibilité
git commit -m "a11y: improve keyboard navigation"
```

### 5. Pull Request
```bash
# Pousser la branche
git push origin feature/amazing-feature

# Créer la PR sur GitHub avec :
# - Description détaillée
# - Screenshots si UI
# - Tests effectués
# - Breaking changes si applicable
```

## 🧪 Tests et Qualité

### Tests Automatisés
```bash
# Linting
npm run lint

# Formatage
npm run format

# Audits
npm run audit:sec    # Sécurité
npm run audit:perf   # Performance
npm run audit:acc    # Accessibilité
```

### Tests Manuels

#### Fonctionnalités
- [ ] Application se charge correctement
- [ ] Navigation fonctionne sur tous les écrans
- [ ] Produits s'affichent correctement
- [ ] Panier fonctionne (ajout, suppression, modification)
- [ ] Recherche et filtres opérationnels

#### Accessibilité
- [ ] Navigation au clavier complète
- [ ] Lecteurs d'écran compatibles
- [ ] Contraste suffisant
- [ ] Focus visible
- [ ] Attributs ARIA corrects

#### Performance
- [ ] Core Web Vitals optimaux
- [ ] Temps de chargement < 3s
- [ ] Bundle size raisonnable
- [ ] Images optimisées

#### Compatibilité
- [ ] Chrome/Chromium (dernier)
- [ ] Firefox (dernier)
- [ ] Safari (dernier)
- [ ] Edge (dernier)
- [ ] Mobile (iOS Safari, Chrome Android)

## 📞 Support

### Où Obtenir de l'Aide

#### Questions Générales
- [GitHub Discussions](https://github.com/votre-username/polymershop-modern/discussions)
- [Documentation Wiki](https://github.com/votre-username/polymershop-modern/wiki)

#### Bugs et Issues
- [GitHub Issues](https://github.com/votre-username/polymershop-modern/issues)
- Fournir un exemple minimal reproductible

#### Contributions
- [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md)
- [Issue Templates](.github/ISSUE_TEMPLATES/)

### Labels et Priorités

#### Types
- `bug` - Correction de bug
- `enhancement` - Nouvelle fonctionnalité
- `documentation` - Documentation
- `performance` - Optimisation performance
- `accessibility` - Amélioration accessibilité
- `security` - Sécurité

#### Priorités
- `P0` - Critique (sécurité, crash)
- `P1` - Haute (fonctionnalité majeure)
- `P2` - Moyenne (amélioration)
- `P3` - Basse (nice-to-have)

## 🎯 Bonnes Pratiques

### ✅ À Faire
- [x] Commits descriptifs et conventionnels
- [x] Tests avant de pousser
- [x] Documentation des changements
- [x] Respect des guidelines d'accessibilité
- [x] Vérification des performances

### ❌ À Éviter
- [ ] Commits trop volumineux
- [ ] Changements non testés
- [ ] Breaking changes sans avertissement
- [ ] Code non documenté
- [ ] Issues de performance/accessibilité

## 🏆 Reconnaissance

Tous les contributeurs sont reconnus :
- Dans le fichier `CONTRIBUTORS.md`
- Dans les releases notes
- Dans la section remerciements du README

Merci de contribuer à PolymerShop Modern ! 🎉

---

<div align="center">

**Questions ?** [Ouvrir une discussion](https://github.com/votre-username/polymershop-modern/discussions)

</div>
