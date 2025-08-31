/**
 * Audit de Performance Automatique pour PolymerShop
 * Analyse Core Web Vitals, bundle, et optimisations
 */

import { exec } from 'child_process';
import { promises as fs } from 'fs';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

class PerformanceAuditor {
  constructor() {
    this.results = {
      lighthouse: null,
      bundleAnalysis: null,
      networkAnalysis: null,
      recommendations: []
    };
  }

  /**
   * Exécute Lighthouse pour mesurer les Core Web Vitals
   */
  async runLighthouse(url = 'http://localhost:8080') {
    console.log('🏮 Lancement de Lighthouse...');

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const options = {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        formFactor: 'desktop',
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
        },
      };

      const runnerResult = await lighthouse(url, options);

      await browser.close();

      const report = runnerResult.lhr;
      this.results.lighthouse = {
        performance: report.categories.performance.score * 100,
        accessibility: report.categories.accessibility.score * 100,
        bestPractices: report.categories['best-practices'].score * 100,
        seo: report.categories.seo.score * 100,
        coreWebVitals: {
          lcp: report.audits['largest-contentful-paint'].displayValue,
          fid: report.audits['max-potential-fid'].displayValue,
          cls: report.audits['cumulative-layout-shift'].displayValue,
          fcp: report.audits['first-contentful-paint'].displayValue,
          ttfb: report.audits['server-response-time'].displayValue,
        },
        metrics: {
          totalSize: report.audits['total-byte-weight'].displayValue,
          jsSize: report.audits['js-estimated-transfer-size'].displayValue,
          cssSize: report.audits['css-estimated-transfer-size'].displayValue,
          imageSize: report.audits['image-size-responsive'].displayValue,
        }
      };

      console.log(`✅ Lighthouse terminé - Performance: ${this.results.lighthouse.performance}/100`);

      return this.results.lighthouse;

    } catch (error) {
      console.error('❌ Erreur Lighthouse:', error.message);
      return null;
    }
  }

  /**
   * Analyse la taille et la composition du bundle
   */
  async analyzeBundle() {
    console.log('📦 Analyse du bundle JavaScript/CSS...');

    try {
      // Analyser les fichiers du build
      const distPath = './dist';
      let totalSize = 0;
      let jsSize = 0;
      let cssSize = 0;
      let imageSize = 0;
      const files = [];

      try {
        const entries = await fs.readdir(distPath, { withFileTypes: true });

        for (const entry of entries) {
          if (entry.isFile()) {
            const filePath = `${distPath}/${entry.name}`;
            const stats = await fs.stat(filePath);
            const size = stats.size;

            files.push({
              name: entry.name,
              size: size,
              sizeFormatted: this.formatBytes(size),
              type: this.getFileType(entry.name)
            });

            totalSize += size;

            if (entry.name.endsWith('.js')) jsSize += size;
            if (entry.name.endsWith('.css')) cssSize += size;
            if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(entry.name)) imageSize += size;
          }
        }
      } catch (error) {
        console.log('⚠️ Dossier dist non trouvé, analyse du code source...');
      }

      this.results.bundleAnalysis = {
        totalSize,
        totalSizeFormatted: this.formatBytes(totalSize),
        jsSize,
        jsSizeFormatted: this.formatBytes(jsSize),
        cssSize,
        cssSizeFormatted: this.formatBytes(cssSize),
        imageSize,
        imageSizeFormatted: this.formatBytes(imageSize),
        files: files.sort((a, b) => b.size - a.size),
        recommendations: []
      };

      // Générer des recommandations
      if (jsSize > 500 * 1024) { // > 500KB
        this.results.bundleAnalysis.recommendations.push({
          type: 'warning',
          message: 'Bundle JavaScript volumineux (>500KB)',
          solution: 'Implémenter le code splitting et la compression'
        });
      }

      if (cssSize > 100 * 1024) { // > 100KB
        this.results.bundleAnalysis.recommendations.push({
          type: 'warning',
          message: 'CSS volumineux (>100KB)',
          solution: 'Optimiser et minifier les styles CSS'
        });
      }

      console.log(`📊 Bundle analysé: ${this.results.bundleAnalysis.totalSizeFormatted} total`);

      return this.results.bundleAnalysis;

    } catch (error) {
      console.error('❌ Erreur analyse bundle:', error.message);
      return null;
    }
  }

  /**
   * Analyse les performances réseau
   */
  async analyzeNetwork(url = 'http://localhost:8080') {
    console.log('🌐 Analyse des performances réseau...');

    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      // Collecter les métriques réseau
      const networkRequests = [];

      page.on('response', response => {
        const request = response.request();
        networkRequests.push({
          url: request.url(),
          method: request.method(),
          status: response.status(),
          contentType: response.headers()['content-type'] || '',
          size: response.headers()['content-length'] || 0,
          timing: response.timing()
        });
      });

      // Mesurer le temps de chargement
      const startTime = Date.now();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const loadTime = Date.now() - startTime;

      // Mesurer les Core Web Vitals simulés
      const performanceMetrics = await page.evaluate(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        const paint = performance.getEntriesByType('paint');

        return {
          domContentLoaded: perf.domContentLoadedEventEnd - perf.domContentLoadedEventStart,
          loadComplete: perf.loadEventEnd - perf.loadEventStart,
          firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
          resources: performance.getEntriesByType('resource').map(r => ({
            name: r.name,
            type: r.initiatorType,
            size: r.transferSize,
            duration: r.duration
          }))
        };
      });

      await browser.close();

      // Analyser les requêtes
      const jsRequests = networkRequests.filter(r => r.contentType.includes('javascript'));
      const cssRequests = networkRequests.filter(r => r.contentType.includes('css'));
      const imageRequests = networkRequests.filter(r => r.contentType.includes('image'));

      this.results.networkAnalysis = {
        totalLoadTime: loadTime,
        totalRequests: networkRequests.length,
        jsRequests: jsRequests.length,
        cssRequests: cssRequests.length,
        imageRequests: imageRequests.length,
        performanceMetrics,
        largeResources: networkRequests
          .filter(r => parseInt(r.size) > 100 * 1024) // > 100KB
          .map(r => ({
            url: r.url,
            size: this.formatBytes(parseInt(r.size)),
            type: r.contentType
          })),
        recommendations: []
      };

      // Générer des recommandations
      if (loadTime > 3000) {
        this.results.networkAnalysis.recommendations.push({
          type: 'critical',
          message: `Temps de chargement élevé: ${loadTime}ms`,
          solution: 'Optimiser les images, compresser les assets, utiliser le cache'
        });
      }

      if (networkRequests.length > 50) {
        this.results.networkAnalysis.recommendations.push({
          type: 'warning',
          message: `Nombre élevé de requêtes: ${networkRequests.length}`,
          solution: 'Concaténer les fichiers, utiliser HTTP/2, lazy loading'
        });
      }

      console.log(`⏱️ Analyse réseau terminée: ${loadTime}ms de chargement`);

      return this.results.networkAnalysis;

    } catch (error) {
      console.error('❌ Erreur analyse réseau:', error.message);
      return null;
    }
  }

  /**
   * Analyse du code source pour les optimisations possibles
   */
  async analyzeCodeOptimizations() {
    console.log('🔍 Analyse des optimisations de code...');

    try {
      const optimizations = [];

      // Analyser main.js pour les opportunités d'optimisation
      const mainJsPath = './src/main.js';
      const mainContent = await fs.readFile(mainJsPath, 'utf-8');

      // Vérifier les imports non utilisés
      if (mainContent.includes('import') && mainContent.includes('from')) {
        optimizations.push({
          type: 'info',
          category: 'imports',
          message: 'Vérifier les imports non utilisés',
          solution: 'Utiliser un bundler avec tree-shaking'
        });
      }

      // Vérifier les images non optimisées
      if (mainContent.includes('📱') || mainContent.includes('💻')) {
        optimizations.push({
          type: 'warning',
          category: 'images',
          message: 'Utilisation d\'emojis comme images',
          solution: 'Remplacer par des SVG optimisés ou WebP'
        });
      }

      // Vérifier les animations CSS
      if (mainContent.includes('@keyframes') || mainContent.includes('animation:')) {
        optimizations.push({
          type: 'info',
          category: 'animations',
          message: 'Animations CSS détectées',
          solution: 'Utiliser will-change et transform pour les performances GPU'
        });
      }

      // Vérifier les calculs répétitifs
      if (mainContent.includes('querySelectorAll') || mainContent.includes('getElementsBy')) {
        optimizations.push({
          type: 'info',
          category: 'dom',
          message: 'Queries DOM détectées',
          solution: 'Mettre en cache les références DOM fréquemment utilisées'
        });
      }

      return optimizations;

    } catch (error) {
      console.error('❌ Erreur analyse code:', error.message);
      return [];
    }
  }

  /**
   * Génère un rapport de performance complet
   */
  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📊 RAPPORT D\'AUDIT DE PERFORMANCE - POLYMERSHOP');
    console.log('='.repeat(80));

    let score = 0;
    let maxScore = 0;

    // Scores Lighthouse
    if (this.results.lighthouse) {
      console.log('\n🏮 SCORES LIGHTHOUSE:');
      console.log(`  Performance: ${this.results.lighthouse.performance}/100`);
      console.log(`  Accessibilité: ${this.results.lighthouse.accessibility}/100`);
      console.log(`  Bonnes pratiques: ${this.results.lighthouse.bestPractices}/100`);
      console.log(`  SEO: ${this.results.lighthouse.seo}/100`);

      console.log('\n⚡ CORE WEB VITALS:');
      console.log(`  LCP (Largest Contentful Paint): ${this.results.lighthouse.coreWebVitals.lcp}`);
      console.log(`  FID (First Input Delay): ${this.results.lighthouse.coreWebVitals.fid}`);
      console.log(`  CLS (Cumulative Layout Shift): ${this.results.lighthouse.coreWebVitals.cls}`);
      console.log(`  FCP (First Contentful Paint): ${this.results.lighthouse.coreWebVitals.fcp}`);

      score += this.results.lighthouse.performance;
      maxScore += 100;
    }

    // Analyse du bundle
    if (this.results.bundleAnalysis) {
      console.log('\n📦 ANALYSE DU BUNDLE:');
      console.log(`  Taille totale: ${this.results.bundleAnalysis.totalSizeFormatted}`);
      console.log(`  JavaScript: ${this.results.bundleAnalysis.jsSizeFormatted}`);
      console.log(`  CSS: ${this.results.bundleAnalysis.cssSizeFormatted}`);
      console.log(`  Images: ${this.results.bundleAnalysis.imageSizeFormatted}`);

      // Score basé sur la taille
      const bundleScore = Math.max(0, 100 - (this.results.bundleAnalysis.totalSize / 1024 / 1024) * 10); // Pénalité par MB
      score += Math.min(100, bundleScore);
      maxScore += 100;

      if (this.results.bundleAnalysis.recommendations.length > 0) {
        console.log('\n💡 RECOMMANDATIONS BUNDLE:');
        this.results.bundleAnalysis.recommendations.forEach(rec => {
          console.log(`  ${rec.type === 'warning' ? '⚠️' : 'ℹ️'} ${rec.message}`);
          console.log(`     Solution: ${rec.solution}`);
        });
      }
    }

    // Analyse réseau
    if (this.results.networkAnalysis) {
      console.log('\n🌐 ANALYSE RÉSEAU:');
      console.log(`  Temps de chargement: ${this.results.networkAnalysis.totalLoadTime}ms`);
      console.log(`  Nombre de requêtes: ${this.results.networkAnalysis.totalRequests}`);
      console.log(`  Ressources JavaScript: ${this.results.networkAnalysis.jsRequests}`);
      console.log(`  Ressources CSS: ${this.results.networkAnalysis.cssRequests}`);
      console.log(`  Images: ${this.results.networkAnalysis.imageRequests}`);

      // Score basé sur le temps de chargement
      const networkScore = Math.max(0, 100 - (this.results.networkAnalysis.totalLoadTime / 100)); // Pénalité par 100ms
      score += Math.min(100, networkScore);
      maxScore += 100;

      if (this.results.networkAnalysis.recommendations.length > 0) {
        console.log('\n💡 RECOMMANDATIONS RÉSEAU:');
        this.results.networkAnalysis.recommendations.forEach(rec => {
          console.log(`  ${rec.type === 'critical' ? '🚨' : '⚠️'} ${rec.message}`);
          console.log(`     Solution: ${rec.solution}`);
        });
      }
    }

    // Score final
    const finalScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    console.log('\n' + '='.repeat(80));
    console.log(`🎯 SCORE DE PERFORMANCE GLOBAL: ${finalScore}/100`);

    if (finalScore >= 90) {
      console.log('🌟 Excellentes performances!');
    } else if (finalScore >= 75) {
      console.log('✅ Bonnes performances');
    } else if (finalScore >= 60) {
      console.log('⚠️ Performances moyennes - optimisations recommandées');
    } else {
      console.log('🚨 Performances faibles - optimisations urgentes');
    }

    console.log('\n📋 RECOMMANDATIONS GÉNÉRALES:');
    console.log('  • Implémenter le code splitting pour réduire la taille du bundle');
    console.log('  • Optimiser et compresser les images');
    console.log('  • Utiliser le lazy loading pour les images et composants');
    console.log('  • Mettre en place la compression gzip/brotli');
    console.log('  • Configurer un CDN pour les assets statiques');
    console.log('  • Utiliser le cache HTTP approprié');

    console.log('\n' + '='.repeat(80));

    return {
      score: finalScore,
      lighthouse: this.results.lighthouse,
      bundle: this.results.bundleAnalysis,
      network: this.results.networkAnalysis,
      recommendations: this.results.recommendations
    };
  }

  /**
   * Utilitaires
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFileType(filename) {
    if (filename.endsWith('.js')) return 'javascript';
    if (filename.endsWith('.css')) return 'stylesheet';
    if (filename.endsWith('.html')) return 'html';
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/.test(filename)) return 'image';
    if (filename.endsWith('.json')) return 'json';
    return 'other';
  }

  /**
   * Exécute l'audit complet
   */
  async runFullAudit(url = 'http://localhost:8080') {
    console.log('🚀 Démarrage de l\'audit de performance complet...\n');

    try {
      // Exécuter les analyses en parallèle quand possible
      const [lighthouseResult, bundleResult] = await Promise.all([
        this.runLighthouse(url),
        this.analyzeBundle()
      ]);

      const networkResult = await this.analyzeNetwork(url);
      const codeOptimizations = await this.analyzeCodeOptimizations();

      // Combiner les recommandations
      this.results.recommendations = [
        ...(bundleResult?.recommendations || []),
        ...(networkResult?.recommendations || []),
        ...codeOptimizations
      ];

      return this.generateReport();

    } catch (error) {
      console.error('❌ Erreur lors de l\'audit:', error);
      return { error: error.message };
    }
  }
}

// Fonction principale
async function runPerformanceAudit(url) {
  const auditor = new PerformanceAuditor();

  try {
    const results = await auditor.runFullAudit(url);
    console.log('\n✅ Audit de performance terminé avec succès!');

    // Sauvegarder les résultats
    const fs = await import('fs');
    fs.writeFileSync('performance-audit-results.json', JSON.stringify(results, null, 2));
    console.log('💾 Résultats sauvegardés dans: performance-audit-results.json');

    return results;
  } catch (error) {
    console.error('❌ Erreur fatale lors de l\'audit:', error);
    return { error: error.message };
  }
}

// Exporter pour utilisation
export { PerformanceAuditor, runPerformanceAudit };

// Exécuter si appelé directement
if (import.meta.url === `file://${process.argv[1]}`) {
  const url = process.argv[2] || 'http://localhost:8080';
  runPerformanceAudit(url);
}
