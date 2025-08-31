/**
 * Mesure des Core Web Vitals pour PolymerShop
 * LCP, FID, CLS en temps réel
 */

class CoreWebVitalsMonitor {
  constructor() {
    this.vitals = {
      lcp: null,
      fid: null,
      cls: null,
      fcp: null,
      ttfb: null
    };
    this.observers = [];
  }

  /**
   * Initialise le monitoring des Core Web Vitals
   */
  init() {
    console.log('📊 Initialisation du monitoring Core Web Vitals...');

    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();

    // Afficher les résultats toutes les 5 secondes
    setInterval(() => this.displayVitals(), 5000);
  }

  /**
   * Largest Contentful Paint (LCP)
   */
  observeLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        this.vitals.lcp = {
          value: Math.round(lastEntry.startTime),
          element: lastEntry.element?.tagName || 'unknown',
          size: lastEntry.size || 0,
          timestamp: Date.now()
        };

        console.log(`🎯 LCP mis à jour: ${this.vitals.lcp.value}ms (${this.vitals.lcp.element})`);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * First Input Delay (FID)
   */
  observeFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach(entry => {
          this.vitals.fid = {
            value: Math.round(entry.processingStart - entry.startTime),
            event: entry.name,
            timestamp: Date.now()
          };

          console.log(`👆 FID mesuré: ${this.vitals.fid.value}ms (${this.vitals.fid.event})`);
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  /**
   * Cumulative Layout Shift (CLS)
   */
  observeCLS() {
    let clsValue = 0;

    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        this.vitals.cls = {
          value: Math.round(clsValue * 1000) / 1000, // 3 décimales
          timestamp: Date.now()
        };

        console.log(`📐 CLS mis à jour: ${this.vitals.cls.value}`);
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  /**
   * First Contentful Paint (FCP)
   */
  observeFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach(entry => {
          this.vitals.fcp = {
            value: Math.round(entry.startTime),
            timestamp: Date.now()
          };

          console.log(`🎨 FCP mesuré: ${this.vitals.fcp.value}ms`);
        });
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * Time to First Byte (TTFB)
   */
  observeTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach(entry => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart;

            this.vitals.ttfb = {
              value: Math.round(ttfb),
              timestamp: Date.now()
            };

            console.log(`⚡ TTFB mesuré: ${this.vitals.ttfb.value}ms`);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  /**
   * Affiche les métriques actuelles
   */
  displayVitals() {
    console.log('\n📊 CORE WEB VITALS - État actuel:');
    console.log('='.repeat(40));

    const metrics = [
      { name: 'LCP', value: this.vitals.lcp?.value, unit: 'ms', good: 2500, poor: 4000 },
      { name: 'FID', value: this.vitals.fid?.value, unit: 'ms', good: 100, poor: 300 },
      { name: 'CLS', value: this.vitals.cls?.value, unit: '', good: 0.1, poor: 0.25 },
      { name: 'FCP', value: this.vitals.fcp?.value, unit: 'ms', good: 1800, poor: 3000 },
      { name: 'TTFB', value: this.vitals.ttfb?.value, unit: 'ms', good: 800, poor: 1800 }
    ];

    metrics.forEach(metric => {
      if (metric.value !== null && metric.value !== undefined) {
        const status = this.getMetricStatus(metric.value, metric.good, metric.poor);
        console.log(`  ${metric.name}: ${metric.value}${metric.unit} ${status}`);
      } else {
        console.log(`  ${metric.name}: En attente...`);
      }
    });

    console.log('='.repeat(40));
  }

  /**
   * Évalue le statut d'une métrique
   */
  getMetricStatus(value, good, poor) {
    if (value <= good) return '🟢 Bon';
    if (value <= poor) return '🟡 Améliorable';
    return '🔴 À améliorer';
  }

  /**
   * Obtient les métriques actuelles
   */
  getVitals() {
    return { ...this.vitals };
  }

  /**
   * Exporte les métriques pour analyse
   */
  exportVitals() {
    const exportData = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      vitals: this.getVitals(),
      scores: this.calculateScores()
    };

    console.log('📤 Export des métriques:', exportData);
    return exportData;
  }

  /**
   * Calcule les scores Lighthouse approximatifs
   */
  calculateScores() {
    const scores = {};

    if (this.vitals.lcp?.value) {
      scores.lcp = Math.max(0, Math.min(100, 100 - (this.vitals.lcp.value - 2500) / 50));
    }

    if (this.vitals.fid?.value) {
      scores.fid = Math.max(0, Math.min(100, 100 - (this.vitals.fid.value - 100) / 4));
    }

    if (this.vitals.cls?.value !== undefined) {
      scores.cls = Math.max(0, Math.min(100, 100 - this.vitals.cls.value * 1000));
    }

    if (this.vitals.fcp?.value) {
      scores.fcp = Math.max(0, Math.min(100, 100 - (this.vitals.fcp.value - 1800) / 24));
    }

    if (this.vitals.ttfb?.value) {
      scores.ttfb = Math.max(0, Math.min(100, 100 - (this.vitals.ttfb.value - 800) / 16));
    }

    // Score moyen
    const validScores = Object.values(scores).filter(score => score !== undefined);
    scores.overall = validScores.length > 0 ?
      Math.round(validScores.reduce((a, b) => a + b, 0) / validScores.length) : 0;

    return scores;
  }

  /**
   * Nettoie les observers
   */
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Instance globale
let monitor = null;

/**
 * Initialise le monitoring des Core Web Vitals
 */
function initCoreWebVitalsMonitoring() {
  if (!monitor) {
    monitor = new CoreWebVitalsMonitor();
    monitor.init();

    // Rendre disponible globalement
    window.coreWebVitalsMonitor = monitor;

    console.log('✅ Monitoring Core Web Vitals activé');
    console.log('💡 Les métriques s\'affichent automatiquement toutes les 5 secondes');
  }

  return monitor;
}

/**
 * Obtient les métriques actuelles
 */
function getCoreWebVitals() {
  return monitor ? monitor.getVitals() : null;
}

/**
 * Exporte les métriques
 */
function exportCoreWebVitals() {
  return monitor ? monitor.exportVitals() : null;
}

// Auto-initialisation si le script est chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCoreWebVitalsMonitoring);
} else {
  initCoreWebVitalsMonitoring();
}

// Exporter pour utilisation
window.initCoreWebVitalsMonitoring = initCoreWebVitalsMonitoring;
window.getCoreWebVitals = getCoreWebVitals;
window.exportCoreWebVitals = exportCoreWebVitals;

console.log('🔧 Core Web Vitals Monitor chargé. Utilisez:');
console.log('  • getCoreWebVitals() - Obtenir les métriques actuelles');
console.log('  • exportCoreWebVitals() - Exporter pour analyse');
