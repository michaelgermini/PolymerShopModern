import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  server: {
    port: 8080,
    open: true
  },
  preview: {
    port: 4173
  },
  build: {
    // Optimiser pour les navigateurs modernes
    target: 'esnext',

    // Compression et minification
    minify: 'esbuild',
    cssMinify: true,

    // Code splitting avancé
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer Lit du reste du code
          vendor: ['lit'],

          // Grouper les services
          services: ['./src/services/cart-service.js', './src/services/product-service.js'],

          // Grouper les composants
          components: ['./src/components/app-shell.js', './src/components/product-catalog.js']
        },

        // Noms de fichiers optimisés
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      },

      // Optimisations supplémentaires
      treeshake: true,
      modulePreload: {
        polyfill: false
      }
    },

    // Optimisations de build
    sourcemap: false, // Désactiver en production pour réduire la taille
    reportCompressedSize: true,

    // Chunk splitting intelligent
    chunkSizeWarningLimit: 1000 // Avertir si un chunk dépasse 1MB
  },

  // Optimisations CSS
  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    }
  },

  // Optimisations pour le développement
  optimizeDeps: {
    include: ['lit']
  }
});
