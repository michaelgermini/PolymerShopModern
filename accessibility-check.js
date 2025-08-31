/**
 * Vérificateur d'Accessibilité Automatique pour PolymerShop
 * Test rapide des problèmes courants d'accessibilité
 */

class AccessibilityChecker {
  constructor() {
    this.issues = [];
    this.passes = [];
  }

  /**
   * Vérifie les images sans attribut alt
   */
  checkImages() {
    console.log('🔍 Vérification des images...');
    const images = document.querySelectorAll('img');
    let issues = 0;

    images.forEach((img, index) => {
      if (!img.alt || img.alt.trim() === '') {
        this.issues.push({
          type: 'image-alt-missing',
          severity: 'critical',
          element: `img:nth-child(${index + 1})`,
          src: img.src,
          message: 'Image sans attribut alt',
          fix: 'Ajouter alt="description de l\'image"'
        });
        issues++;
      } else {
        this.passes.push(`✅ Image avec alt: "${img.alt}"`);
      }
    });

    console.log(`📊 Images analysées: ${images.length}, problèmes: ${issues}`);
  }

  /**
   * Vérifie les éléments interactifs
   */
  checkInteractiveElements() {
    console.log('🔍 Vérification des éléments interactifs...');

    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    const inputs = document.querySelectorAll('input, select, textarea');

    // Vérifier les boutons
    buttons.forEach((btn, index) => {
      if (!btn.getAttribute('aria-label') && !btn.textContent.trim() && !btn.getAttribute('aria-labelledby')) {
        this.issues.push({
          type: 'button-accessible-name',
          severity: 'critical',
          element: `button:nth-child(${index + 1})`,
          message: 'Bouton sans nom accessible',
          fix: 'Ajouter aria-label ou du texte visible'
        });
      }
    });

    // Vérifier les liens
    links.forEach((link, index) => {
      if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
        if (!link.getAttribute('role') || link.getAttribute('role') !== 'button') {
          this.issues.push({
            type: 'link-invalid',
            severity: 'serious',
            element: `a:nth-child(${index + 1})`,
            href: link.href,
            message: 'Lien invalide ou sans destination',
            fix: 'Ajouter href valide ou role="button"'
          });
        }
      }
    });

    console.log(`📊 Éléments interactifs: ${buttons.length} boutons, ${links.length} liens, ${inputs.length} inputs`);
  }

  /**
   * Vérifie la structure des titres
   */
  checkHeadingStructure() {
    console.log('🔍 Vérification de la structure des titres...');

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels = [0, 0, 0, 0, 0, 0]; // h1 to h6

    headings.forEach(heading => {
      const level = parseInt(heading.tagName.charAt(1));
      headingLevels[level - 1]++;
    });

    // Vérifier s'il y a un h1
    if (headingLevels[0] === 0) {
      this.issues.push({
        type: 'heading-missing-h1',
        severity: 'serious',
        message: 'Aucun titre h1 trouvé',
        fix: 'Ajouter un titre h1 principal'
      });
    }

    // Vérifier les sauts de niveaux
    let previousLevel = 0;
    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      if (currentLevel - previousLevel > 1 && index > 0) {
        this.issues.push({
          type: 'heading-skip',
          severity: 'moderate',
          element: heading.tagName,
          text: heading.textContent.slice(0, 30),
          message: `Saut de niveau de titre (h${previousLevel} vers h${currentLevel})`,
          fix: 'Utiliser des niveaux de titre séquentiels'
        });
      }
      previousLevel = currentLevel;
    });

    console.log(`📊 Titres trouvés: H1:${headingLevels[0]}, H2:${headingLevels[1]}, H3:${headingLevels[2]}, H4:${headingLevels[3]}, H5:${headingLevels[4]}, H6:${headingLevels[5]}`);
  }

  /**
   * Vérifie les attributs ARIA
   */
  checkAriaAttributes() {
    console.log('🔍 Vérification des attributs ARIA...');

    // Chercher les aria-* mal utilisés
    const allElements = document.querySelectorAll('*');
    let ariaIssues = 0;

    allElements.forEach(element => {
      const attrs = element.attributes;
      for (let attr of attrs) {
        if (attr.name.startsWith('aria-')) {
          // Vérifier aria-hidden sur des éléments interactifs
          if (attr.name === 'aria-hidden' && attr.value === 'true') {
            if (element.tagName.match(/^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/i)) {
              this.issues.push({
                type: 'aria-hidden-interactive',
                severity: 'critical',
                element: element.tagName,
                message: 'Élément interactif avec aria-hidden="true"',
                fix: 'Retirer aria-hidden ou rendre l\'élément non-interactif'
              });
              ariaIssues++;
            }
          }
        }
      }
    });

    console.log(`📊 Attributs ARIA vérifiés, problèmes trouvés: ${ariaIssues}`);
  }

  /**
   * Vérifie le contraste des couleurs
   */
  checkColorContrast() {
    console.log('🔍 Vérification du contraste des couleurs...');

    // Cette vérification est basique - axe-core fait mieux
    const elements = document.querySelectorAll('*');
    let contrastIssues = 0;

    elements.forEach(element => {
      const style = window.getComputedStyle(element);
      const backgroundColor = style.backgroundColor;
      const color = style.color;

      // Vérification très basique
      if (color && backgroundColor &&
          color !== 'rgba(0, 0, 0, 0)' &&
          backgroundColor !== 'rgba(0, 0, 0, 0)' &&
          color === backgroundColor) {
        this.issues.push({
          type: 'color-contrast',
          severity: 'serious',
          element: element.tagName,
          message: 'Couleur de texte identique à la couleur de fond',
          fix: 'Changer la couleur du texte ou du fond'
        });
        contrastIssues++;
      }
    });

    console.log(`📊 Éléments vérifiés pour le contraste: ${elements.length}, problèmes: ${contrastIssues}`);
  }

  /**
   * Vérifie la navigation clavier
   */
  checkKeyboardNavigation() {
    console.log('🔍 Vérification de la navigation clavier...');

    const focusableElements = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length < 5) {
      this.issues.push({
        type: 'keyboard-navigation',
        severity: 'moderate',
        message: 'Très peu d\'éléments focusables détectés',
        fix: 'Vérifier que tous les éléments interactifs sont accessibles au clavier'
      });
    }

    // Vérifier les tabindex négatifs sur des éléments normalement focusables
    const negativeTabIndex = document.querySelectorAll('[tabindex="-1"]');
    negativeTabIndex.forEach(element => {
      if (element.tagName.match(/^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/i)) {
        console.log(`⚠️ Élément ${element.tagName} avec tabindex="-1"`);
      }
    });

    console.log(`📊 Éléments focusables: ${focusableElements.length}`);
  }

  /**
   * Génère un rapport d'accessibilité
   */
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 RAPPORT D\'ACCESSIBILITÉ POLYMERSHOP');
    console.log('='.repeat(80));

    console.log(`\n📈 RÉSUMÉ:`);
    console.log(`  • Problèmes critiques: ${this.issues.filter(i => i.severity === 'critical').length}`);
    console.log(`  • Problèmes sérieux: ${this.issues.filter(i => i.severity === 'serious').length}`);
    console.log(`  • Problèmes modérés: ${this.issues.filter(i => i.severity === 'moderate').length}`);
    console.log(`  • Tests réussis: ${this.passes.length}`);

    if (this.issues.length > 0) {
      console.log('\n🚨 PROBLÈMES DÉTECTÉS:');

      const critical = this.issues.filter(i => i.severity === 'critical');
      const serious = this.issues.filter(i => i.severity === 'serious');
      const moderate = this.issues.filter(i => i.severity === 'moderate');

      if (critical.length > 0) {
        console.log('\n🔴 CRITIQUES:');
        critical.forEach((issue, index) => {
          console.log(`  ${index + 1}. ${issue.message}`);
          console.log(`     Élément: ${issue.element || 'N/A'}`);
          console.log(`     Solution: ${issue.fix}`);
        });
      }

      if (serious.length > 0) {
        console.log('\n🟠 SÉRIEUX:');
        serious.forEach((issue, index) => {
          console.log(`  ${index + 1}. ${issue.message}`);
          console.log(`     Élément: ${issue.element || 'N/A'}`);
          console.log(`     Solution: ${issue.fix}`);
        });
      }

      if (moderate.length > 0) {
        console.log('\n🟡 MODÉRÉS:');
        moderate.forEach((issue, index) => {
          console.log(`  ${index + 1}. ${issue.message}`);
          console.log(`     Élément: ${issue.element || 'N/A'}`);
          console.log(`     Solution: ${issue.fix}`);
        });
      }
    }

    console.log('\n✅ TESTS RÉUSSIS:');
    this.passes.slice(0, 10).forEach(pass => console.log(`  ${pass}`));
    if (this.passes.length > 10) {
      console.log(`  ... et ${this.passes.length - 10} autres tests réussis`);
    }

    // Score d'accessibilité
    const totalChecks = this.issues.length + this.passes.length;
    const score = totalChecks > 0 ? Math.round((this.passes.length / totalChecks) * 100) : 100;

    console.log(`\n🎯 SCORE D'ACCESSIBILITÉ: ${score}/100`);

    if (score >= 90) {
      console.log('🌟 Excellent niveau d\'accessibilité!');
    } else if (score >= 70) {
      console.log('✅ Bon niveau d\'accessibilité');
    } else if (score >= 50) {
      console.log('⚠️ Accessibilité moyenne - améliorations nécessaires');
    } else {
      console.log('🚨 Accessibilité faible - corrections urgentes requises');
    }

    console.log('\n' + '='.repeat(80));

    return {
      score,
      issues: this.issues,
      passes: this.passes,
      summary: {
        critical: this.issues.filter(i => i.severity === 'critical').length,
        serious: this.issues.filter(i => i.severity === 'serious').length,
        moderate: this.issues.filter(i => i.severity === 'moderate').length,
        totalIssues: this.issues.length,
        totalPasses: this.passes.length
      }
    };
  }

  /**
   * Exécute tous les tests d'accessibilité
   */
  async runAllChecks() {
    console.log('🚀 Démarrage des tests d\'accessibilité...\n');

    try {
      this.checkImages();
      this.checkInteractiveElements();
      this.checkHeadingStructure();
      this.checkAriaAttributes();
      this.checkColorContrast();
      this.checkKeyboardNavigation();

      return this.generateReport();
    } catch (error) {
      console.error('❌ Erreur lors des tests:', error);
      return { error: error.message };
    }
  }
}

// Fonction pour exécuter les tests
function runAccessibilityCheck() {
  const checker = new AccessibilityChecker();
  return checker.runAllChecks();
}

// Exporter pour utilisation
window.AccessibilityChecker = AccessibilityChecker;
window.runAccessibilityCheck = runAccessibilityCheck;

// Auto-exécution si chargé directement
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔧 Accessibility Checker loaded. Run: runAccessibilityCheck()');
  });
} else {
  console.log('🔧 Accessibility Checker loaded. Run: runAccessibilityCheck()');
}
