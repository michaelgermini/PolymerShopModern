/**
 * Test Rapide de Performance pour PolymerShop
 * Mesure basique des métriques de performance
 */

(function() {
  'use strict';

  console.log('⚡ PERFORMANCE TEST - POLYMERSHOP');
  console.log('=================================');

  // Attendre que la page soit chargée
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPerformanceTest);
  } else {
    runPerformanceTest();
  }

  function runPerformanceTest() {
    console.log('🚀 Démarrage du test de performance...\n');

    const results = {
      navigationTiming: {},
      resourceTiming: {},
      memoryUsage: {},
      recommendations: []
    };

    // 1. Mesurer les métriques de navigation
    console.log('1️⃣ Analyse des métriques de navigation...');
    if (performance.timing) {
      const timing = performance.timing;
      results.navigationTiming = {
        dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
        tcpConnect: timing.connectEnd - timing.connectStart,
        serverResponse: timing.responseStart - timing.requestStart,
        pageLoad: timing.loadEventEnd - timing.navigationStart,
        domReady: timing.domContentLoadedEventEnd - timing.navigationStart,
        firstPaint: getFirstPaint(),
        firstContentfulPaint: getFirstContentfulPaint()
      };

      console.log(`   ⏱️ DNS Lookup: ${results.navigationTiming.dnsLookup}ms`);
      console.log(`   🔗 TCP Connect: ${results.navigationTiming.tcpConnect}ms`);
      console.log(`   🖥️ Server Response: ${results.navigationTiming.serverResponse}ms`);
      console.log(`   📄 DOM Ready: ${results.navigationTiming.domReady}ms`);
      console.log(`   🎨 First Paint: ${results.navigationTiming.firstPaint}ms`);
      console.log(`   📝 First Contentful Paint: ${results.navigationTiming.firstContentfulPaint}ms`);
      console.log(`   🚀 Page Load: ${results.navigationTiming.pageLoad}ms`);
    }

    // 2. Analyser les ressources chargées
    console.log('\n2️⃣ Analyse des ressources...');
    if (performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      results.resourceTiming = {
        totalResources: resources.length,
        totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
        byType: {}
      };

      // Grouper par type
      resources.forEach(resource => {
        const type = getResourceType(resource.name);
        if (!results.resourceTiming.byType[type]) {
          results.resourceTiming.byType[type] = { count: 0, size: 0 };
        }
        results.resourceTiming.byType[type].count++;
        results.resourceTiming.byType[type].size += resource.transferSize || 0;
      });

      console.log(`   📦 Total ressources: ${results.resourceTiming.totalResources}`);
      console.log(`   💾 Taille totale: ${formatBytes(results.resourceTiming.totalSize)}`);

      Object.entries(results.resourceTiming.byType).forEach(([type, data]) => {
        console.log(`   ${getTypeIcon(type)} ${type}: ${data.count} (${formatBytes(data.size)})`);
      });
    }

    // 3. Vérifier l'utilisation mémoire (si disponible)
    console.log('\n3️⃣ Analyse de l\'utilisation mémoire...');
    if (performance.memory) {
      results.memoryUsage = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
      };

      console.log(`   💾 Mémoire utilisée: ${formatBytes(results.memoryUsage.used)}`);
      console.log(`   📊 Mémoire totale: ${formatBytes(results.memoryUsage.total)}`);
      console.log(`   🎯 Limite mémoire: ${formatBytes(results.memoryUsage.limit)}`);

      const usagePercent = (results.memoryUsage.used / results.memoryUsage.limit) * 100;
      console.log(`   📈 Utilisation: ${usagePercent.toFixed(1)}%`);
    }

    // 4. Vérifier les optimisations présentes
    console.log('\n4️⃣ Vérification des optimisations...');
    checkOptimizations(results);

    // 5. Générer des recommandations
    console.log('\n5️⃣ Recommandations de performance...');
    generateRecommendations(results);

    // Résumé final
    console.log('\n' + '='.repeat(50));
    console.log('📊 RÉSULTATS DU TEST DE PERFORMANCE');
    console.log('='.repeat(50));

    const score = calculatePerformanceScore(results);
    console.log(`🎯 Score de performance: ${score}/100`);

    if (score >= 90) {
      console.log('🌟 Excellentes performances!');
    } else if (score >= 75) {
      console.log('✅ Bonnes performances');
    } else if (score >= 60) {
      console.log('⚠️ Performances moyennes - optimisations recommandées');
    } else {
      console.log('🚨 Performances faibles - corrections urgentes');
    }

    // Stocker les résultats pour utilisation programmatique
    window.performanceTestResults = results;
    window.performanceScore = score;

    console.log('\n💡 Résultats stockés dans window.performanceTestResults');
    console.log('\n' + '='.repeat(50));

    return results;
  }

  function getFirstPaint() {
    if (performance.getEntriesByType) {
      const paintEntries = performance.getEntriesByType('paint');
      const fp = paintEntries.find(entry => entry.name === 'first-paint');
      return fp ? Math.round(fp.startTime) : 0;
    }
    return 0;
  }

  function getFirstContentfulPaint() {
    if (performance.getEntriesByType) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp ? Math.round(fcp.startTime) : 0;
    }
    return 0;
  }

  function getResourceType(url) {
    if (url.includes('.js')) return 'JavaScript';
    if (url.includes('.css')) return 'CSS';
    if (/\.(png|jpg|jpeg|gif|svg|webp)$/i.test(url)) return 'Image';
    if (url.includes('.woff') || url.includes('.ttf')) return 'Font';
    if (url.includes('google') || url.includes('fonts')) return 'External';
    return 'Other';
  }

  function getTypeIcon(type) {
    const icons = {
      'JavaScript': '📜',
      'CSS': '🎨',
      'Image': '🖼️',
      'Font': '🔤',
      'External': '🌐',
      'Other': '📄'
    };
    return icons[type] || '📄';
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  function checkOptimizations(results) {
    const optimizations = {
      lazyLoading: document.querySelector('img[loading="lazy"]') !== null,
      asyncDecoding: document.querySelector('img[decoding="async"]') !== null,
      preloadLinks: document.querySelector('link[rel="preload"]') !== null,
      compressedResources: checkCompression(results),
      codeSplitting: checkCodeSplitting()
    };

    console.log('   🔍 Lazy loading détecté:', optimizations.lazyLoading ? '✅' : '❌');
    console.log('   🔍 Décodage async détecté:', optimizations.asyncDecoding ? '✅' : '❌');
    console.log('   🔍 Préchargement détecté:', optimizations.preloadLinks ? '✅' : '❌');
    console.log('   🔍 Compression détectée:', optimizations.compressedResources ? '✅' : '❌');
    console.log('   🔍 Code splitting détecté:', optimizations.codeSplitting ? '✅' : '❌');

    return optimizations;
  }

  function checkCompression(results) {
    // Vérifier si les ressources semblent compressées (taille raisonnable)
    return results.resourceTiming.totalSize < 2 * 1024 * 1024; // Moins de 2MB
  }

  function checkCodeSplitting() {
    // Vérifier s'il y a plusieurs chunks JavaScript
    const scripts = document.querySelectorAll('script[src]');
    return scripts.length > 2; // Plus de 2 scripts = probablement du code splitting
  }

  function generateRecommendations(results) {
    const recommendations = [];

    // Recommandations basées sur les métriques
    if (results.navigationTiming.pageLoad > 3000) {
      recommendations.push('🚨 Temps de chargement élevé (>3s) - Optimiser les images et compresser les assets');
    }

    if (results.resourceTiming.totalSize > 2 * 1024 * 1024) {
      recommendations.push('📦 Bundle volumineux (>2MB) - Implémenter le code splitting');
    }

    if (results.resourceTiming.byType.Image && results.resourceTiming.byType.Image.size > 1024 * 1024) {
      recommendations.push('🖼️ Images volumineuses (>1MB) - Utiliser WebP et lazy loading');
    }

    if (results.memoryUsage.used && results.memoryUsage.used > results.memoryUsage.limit * 0.8) {
      recommendations.push('💾 Utilisation mémoire élevée - Optimiser les fuites mémoire');
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ Performances satisfaisantes - Continuer le monitoring');
    }

    recommendations.forEach(rec => console.log(`   ${rec}`));

    results.recommendations = recommendations;
  }

  function calculatePerformanceScore(results) {
    let score = 100;

    // Pénalités basées sur les métriques
    if (results.navigationTiming.pageLoad > 3000) {
      score -= Math.min(30, (results.navigationTiming.pageLoad - 3000) / 100);
    }

    if (results.resourceTiming.totalSize > 2 * 1024 * 1024) {
      score -= Math.min(20, (results.resourceTiming.totalSize - 2 * 1024 * 1024) / (1024 * 1024));
    }

    if (results.resourceTiming.byType.Image && results.resourceTiming.byType.Image.size > 1024 * 1024) {
      score -= Math.min(15, (results.resourceTiming.byType.Image.size - 1024 * 1024) / (512 * 1024));
    }

    if (results.memoryUsage.used && results.memoryUsage.used > results.memoryUsage.limit * 0.8) {
      score -= 10;
    }

    // Bonus pour les optimisations détectées
    if (document.querySelector('img[loading="lazy"]')) score += 5;
    if (document.querySelector('link[rel="preload"]')) score += 5;
    if (checkCodeSplitting()) score += 10;

    return Math.max(0, Math.min(100, Math.round(score)));
  }

  // Fonction publique pour relancer le test
  window.runPerformanceTest = runPerformanceTest;

})();
