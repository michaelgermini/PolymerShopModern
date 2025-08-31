/**
 * Test d'Accessibilité Automatisé pour PolymerShop
 * Utilise axe-core pour analyser les violations d'accessibilité
 */

import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer from 'puppeteer';

class AccessibilityTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.results = {
      violations: [],
      passes: [],
      incomplete: [],
      inapplicable: []
    };
  }

  async init() {
    console.log('🚀 Initialisation du testeur d\'accessibilité...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();

    // Configurer pour capturer les erreurs JavaScript
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Erreur JavaScript détectée:', msg.text());
      }
    });
  }

  async analyzePage(url, name) {
    console.log(`🔍 Analyse d'accessibilité pour: ${name}`);
    console.log(`📍 URL: ${url}`);

    try {
      await this.page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Attendre que le contenu dynamique se charge
      await this.page.waitForTimeout(2000);

      // Injecter axe-core
      await this.page.addScriptTag({
        url: 'https://cdn.jsdelivr.net/npm/axe-core@4.7.2/axe.min.js'
      });

      // Exécuter l'analyse axe-core
      const results = await this.page.evaluate(() => {
        return new Promise((resolve) => {
          axe.run(document, {
            rules: {
              'color-contrast': { enabled: true },
              'keyboard-accessible': { enabled: true },
              'screen-reader-accessible': { enabled: true }
            }
          }, (err, results) => {
            if (err) throw err;
            resolve(results);
          });
        });
      });

      console.log(`✅ Analyse terminée pour ${name}`);
      console.log(`📊 Violations trouvées: ${results.violations.length}`);
      console.log(`✅ Règles respectées: ${results.passes.length}`);

      return {
        page: name,
        url: url,
        results: results
      };

    } catch (error) {
      console.error(`❌ Erreur lors de l'analyse de ${name}:`, error.message);
      return {
        page: name,
        url: url,
        error: error.message
      };
    }
  }

  async testKeyboardNavigation() {
    console.log('⌨️ Test de navigation clavier...');

    try {
      // Simuler la navigation au clavier
      await this.page.keyboard.press('Tab');

      // Vérifier les éléments focusables
      const focusableElements = await this.page.$$('[tabindex]:not([tabindex="-1"]), a, button, input, select, textarea, [role="button"], [role="link"], [role="tab"]');

      console.log(`📋 Éléments focusables trouvés: ${focusableElements.length}`);

      // Tester quelques éléments
      for (let i = 0; i < Math.min(5, focusableElements.length); i++) {
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(100);

        const focusedElement = await this.page.evaluate(() => {
          const el = document.activeElement;
          return {
            tagName: el.tagName,
            id: el.id,
            className: el.className,
            textContent: el.textContent?.slice(0, 50)
          };
        });

        console.log(`🎯 Élément focusé ${i + 1}: ${focusedElement.tagName}#${focusedElement.id || 'no-id'}`);
      }

      return { success: true, focusableCount: focusableElements.length };

    } catch (error) {
      console.error('❌ Erreur navigation clavier:', error.message);
      return { success: false, error: error.message };
    }
  }

  async testColorContrast() {
    console.log('🎨 Test du contraste des couleurs...');

    try {
      const contrastResults = await this.page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const issues = [];

        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          const backgroundColor = style.backgroundColor;
          const color = style.color;
          const fontSize = style.fontSize;

          // Vérifier si le texte est lisible
          if (color && backgroundColor && color !== 'rgba(0, 0, 0, 0)' && backgroundColor !== 'rgba(0, 0, 0, 0)') {
            // Calcul simple du contraste (version simplifiée)
            const bgMatch = backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            const colorMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

            if (bgMatch && colorMatch) {
              const bgBrightness = (parseInt(bgMatch[1]) * 299 + parseInt(bgMatch[2]) * 587 + parseInt(bgMatch[3]) * 114) / 1000;
              const colorBrightness = (parseInt(colorMatch[1]) * 299 + parseInt(colorMatch[2]) * 587 + parseInt(colorMatch[3]) * 114) / 1000;
              const contrast = Math.abs(bgBrightness - colorBrightness);

              if (contrast < 125) { // Seuil approximatif pour WCAG AA
                issues.push({
                  element: el.tagName + (el.id ? '#' + el.id : ''),
                  text: el.textContent?.slice(0, 30),
                  contrast: contrast.toFixed(1),
                  backgroundColor,
                  color
                });
              }
            }
          }
        });

        return issues;
      });

      console.log(`⚠️ Problèmes de contraste trouvés: ${contrastResults.length}`);

      return contrastResults;

    } catch (error) {
      console.error('❌ Erreur analyse contraste:', error.message);
      return [];
    }
  }

  async analyzeSemanticStructure() {
    console.log('🏗️ Analyse de la structure sémantique...');

    try {
      const semanticResults = await this.page.evaluate(() => {
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          level: parseInt(h.tagName.charAt(1)),
          text: h.textContent.slice(0, 50),
          id: h.id
        }));

        const landmarks = Array.from(document.querySelectorAll('[role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"], header, nav, main, aside, footer')).map(el => ({
          tag: el.tagName.toLowerCase(),
          role: el.getAttribute('role'),
          id: el.id,
          className: el.className
        }));

        const images = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          hasAlt: !!img.alt,
          width: img.width,
          height: img.height
        }));

        const forms = Array.from(document.querySelectorAll('form')).map(form => {
          const inputs = Array.from(form.querySelectorAll('input, select, textarea'));
          const labels = Array.from(form.querySelectorAll('label'));
          return {
            inputs: inputs.length,
            labels: labels.length,
            hasLabels: labels.length > 0
          };
        });

        return {
          headings,
          landmarks,
          images,
          forms
        };
      });

      console.log(`📊 Analyse sémantique:`);
      console.log(`  - Titres: ${semanticResults.headings.length}`);
      console.log(`  - Points de repère: ${semanticResults.landmarks.length}`);
      console.log(`  - Images: ${semanticResults.images.length}`);
      console.log(`  - Formulaires: ${semanticResults.forms.length}`);

      return semanticResults;

    } catch (error) {
      console.error('❌ Erreur analyse sémantique:', error.message);
      return null;
    }
  }

  async runFullAudit() {
    console.log('🎯 Démarrage de l\'audit d\'accessibilité complet...\n');

    const auditResults = {
      timestamp: new Date().toISOString(),
      pages: [],
      summary: {
        totalViolations: 0,
        totalIssues: 0,
        criticalIssues: 0
      }
    };

    try {
      await this.init();

      // Pages à analyser
      const pages = [
        { url: 'http://localhost:8080', name: 'Page d\'accueil' },
        { url: 'http://localhost:8080#products', name: 'Page Produits' },
        { url: 'http://localhost:8080#about', name: 'Page À propos' },
        { url: 'http://localhost:8080#contact', name: 'Page Contact' }
      ];

      for (const page of pages) {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`📄 ANALYSE DE LA PAGE: ${page.name.toUpperCase()}`);
        console.log(`${'='.repeat(60)}\n`);

        const pageResult = await this.analyzePage(page.url, page.name);

        if (pageResult.results) {
          // Test navigation clavier
          const keyboardResult = await this.testKeyboardNavigation();

          // Test contraste
          const contrastIssues = await this.testColorContrast();

          // Analyse sémantique
          const semanticData = await this.analyzeSemanticStructure();

          pageResult.keyboardNavigation = keyboardResult;
          pageResult.contrastIssues = contrastIssues;
          pageResult.semanticData = semanticData;

          // Compter les violations
          auditResults.summary.totalViolations += pageResult.results.violations.length;
          auditResults.summary.totalIssues += pageResult.results.violations.length + contrastIssues.length;

          // Identifier les violations critiques
          const criticalViolations = pageResult.results.violations.filter(v =>
            ['color-contrast', 'keyboard', 'screen-reader'].includes(v.id) ||
            v.impact === 'critical' || v.impact === 'serious'
          );
          auditResults.summary.criticalIssues += criticalViolations.length;
        }

        auditResults.pages.push(pageResult);
      }

      console.log(`\n${'='.repeat(80)}`);
      console.log('📊 RÉSULTATS DE L\'AUDIT D\'ACCESSIBILITÉ');
      console.log(`${'='.repeat(80)}\n`);

      console.log(`📈 RÉSUMÉ:`);
      console.log(`  • Pages analysées: ${auditResults.pages.length}`);
      console.log(`  • Violations totales: ${auditResults.summary.totalViolations}`);
      console.log(`  • Problèmes critiques: ${auditResults.summary.criticalIssues}`);
      console.log(`  • Problèmes totaux: ${auditResults.summary.totalIssues}`);

      return auditResults;

    } catch (error) {
      console.error('❌ Erreur lors de l\'audit:', error.message);
      return { error: error.message };
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Fonction principale
async function runAccessibilityAudit() {
  const tester = new AccessibilityTester();

  try {
    const results = await tester.runFullAudit();
    console.log('\n✅ Audit d\'accessibilité terminé avec succès!');

    // Sauvegarder les résultats
    const fs = await import('fs');
    fs.writeFileSync('accessibility-audit-results.json', JSON.stringify(results, null, 2));
    console.log('💾 Résultats sauvegardés dans: accessibility-audit-results.json');

    return results;
  } catch (error) {
    console.error('❌ Erreur fatale lors de l\'audit:', error);
    return { error: error.message };
  }
}

// Exporter pour utilisation
export { AccessibilityTester, runAccessibilityAudit };

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  runAccessibilityAudit();
}
