/**
 * Test d'Accessibilité Simple pour PolymerShop
 * Vérifications de base dans la console du navigateur
 */

(function() {
  'use strict';

  console.log('♿ 🔍 ACCESSIBILITY CHECK - POLYMERSHOP');
  console.log('=====================================');

  // Attendre que le DOM soit chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runChecks);
  } else {
    runChecks();
  }

  function runChecks() {
    console.log('🚀 Démarrage des vérifications d\'accessibilité...\n');

    const results = {
      passed: 0,
      failed: 0,
      warnings: 0
    };

    // 1. Vérifier la présence de lang attribute
    console.log('1️⃣ Vérification de l\'attribut lang...');
    const html = document.documentElement;
    if (html.lang) {
      console.log('✅ Langue définie:', html.lang);
      results.passed++;
    } else {
      console.log('❌ Attribut lang manquant sur <html>');
      results.failed++;
    }

    // 2. Vérifier le title de la page
    console.log('\n2️⃣ Vérification du titre de la page...');
    const title = document.title;
    if (title && title.trim().length > 0) {
      console.log('✅ Titre présent:', title);
      results.passed++;
    } else {
      console.log('❌ Title manquant ou vide');
      results.failed++;
    }

    // 3. Vérifier les images sans alt
    console.log('\n3️⃣ Vérification des images...');
    const images = document.querySelectorAll('img');
    let imagesWithoutAlt = 0;

    images.forEach((img, index) => {
      if (!img.alt || img.alt.trim() === '') {
        console.log(`❌ Image ${index + 1} sans alt:`, img.src);
        imagesWithoutAlt++;
      }
    });

    if (imagesWithoutAlt === 0) {
      console.log(`✅ Toutes les ${images.length} images ont un alt`);
      results.passed++;
    } else {
      console.log(`❌ ${imagesWithoutAlt}/${images.length} images sans alt`);
      results.failed++;
    }

    // 4. Vérifier les liens vides
    console.log('\n4️⃣ Vérification des liens...');
    const links = document.querySelectorAll('a');
    let emptyLinks = 0;

    links.forEach((link, index) => {
      const href = link.getAttribute('href');
      const text = link.textContent.trim();

      if (!href || href === '#') {
        if (!text && !link.querySelector('img')) {
          console.log(`❌ Lien ${index + 1} vide et sans destination`);
          emptyLinks++;
        }
      }
    });

    if (emptyLinks === 0) {
      console.log(`✅ Tous les ${links.length} liens sont valides`);
      results.passed++;
    } else {
      console.log(`❌ ${emptyLinks} liens problématiques`);
      results.failed++;
    }

    // 5. Vérifier les boutons
    console.log('\n5️⃣ Vérification des boutons...');
    const buttons = document.querySelectorAll('button');
    let buttonsWithoutLabel = 0;

    buttons.forEach((btn, index) => {
      const text = btn.textContent.trim();
      const ariaLabel = btn.getAttribute('aria-label');
      const ariaLabelledBy = btn.getAttribute('aria-labelledby');

      if (!text && !ariaLabel && !ariaLabelledBy && !btn.querySelector('img')) {
        console.log(`❌ Bouton ${index + 1} sans nom accessible`);
        buttonsWithoutLabel++;
      }
    });

    if (buttonsWithoutLabel === 0) {
      console.log(`✅ Tous les ${buttons.length} boutons ont un nom accessible`);
      results.passed++;
    } else {
      console.log(`❌ ${buttonsWithoutLabel} boutons sans nom accessible`);
      results.failed++;
    }

    // 6. Vérifier la structure des titres
    console.log('\n6️⃣ Vérification de la structure des titres...');
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const h1Count = document.querySelectorAll('h1').length;

    if (h1Count === 0) {
      console.log('❌ Aucun titre H1 trouvé');
      results.failed++;
    } else if (h1Count > 1) {
      console.log(`⚠️ ${h1Count} titres H1 trouvés (idéalement 1 seul)`);
      results.warnings++;
    } else {
      console.log('✅ Un titre H1 présent');
      results.passed++;
    }

    console.log(`📊 Total de titres: ${headings.length}`);

    // 7. Vérifier les éléments focusables
    console.log('\n7️⃣ Vérification de la navigation clavier...');
    const focusableElements = document.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    console.log(`📊 Éléments focusables: ${focusableElements.length}`);

    if (focusableElements.length < 3) {
      console.log('⚠️ Très peu d\'éléments focusables');
      results.warnings++;
    } else {
      console.log('✅ Nombre d\'éléments focusables raisonnable');
      results.passed++;
    }

    // 8. Vérifier les attributs ARIA
    console.log('\n8️⃣ Vérification des attributs ARIA...');
    const ariaElements = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby], [role]');
    console.log(`📊 Éléments avec attributs ARIA: ${ariaElements.length}`);

    if (ariaElements.length > 0) {
      console.log('✅ Utilisation d\'attributs ARIA détectée');
      results.passed++;
    } else {
      console.log('ℹ️ Aucun attribut ARIA détecté (pas nécessairement un problème)');
      results.passed++;
    }

    // 9. Vérifier les formulaires
    console.log('\n9️⃣ Vérification des formulaires...');
    const forms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input, select, textarea');
    const labels = document.querySelectorAll('label');

    console.log(`📊 Formulaires: ${forms.length}, Champs: ${inputs.length}, Labels: ${labels.length}`);

    if (inputs.length > 0) {
      if (labels.length === 0) {
        console.log('❌ Champs de formulaire sans labels');
        results.failed++;
      } else {
        console.log('✅ Labels présents pour les formulaires');
        results.passed++;
      }
    } else {
      console.log('ℹ️ Aucun formulaire détecté');
      results.passed++;
    }

    // 10. Test de contraste basique
    console.log('\n🔟 Vérification basique du contraste...');
    const elementsWithColor = document.querySelectorAll('*');
    let contrastIssues = 0;

    elementsWithColor.forEach(element => {
      const style = window.getComputedStyle(element);
      const color = style.color;
      const backgroundColor = style.backgroundColor;

      if (color === backgroundColor &&
          color !== 'rgba(0, 0, 0, 0)' &&
          color !== 'rgb(0, 0, 0)') {
        contrastIssues++;
      }
    });

    if (contrastIssues === 0) {
      console.log('✅ Aucun problème de contraste détecté (vérification basique)');
      results.passed++;
    } else {
      console.log(`⚠️ ${contrastIssues} éléments avec contraste potentiellement problématique`);
      results.warnings++;
    }

    // Résumé final
    console.log('\n' + '='.repeat(50));
    console.log('📊 RÉSULTATS FINAUX');
    console.log('='.repeat(50));
    console.log(`✅ Tests réussis: ${results.passed}`);
    console.log(`❌ Échecs: ${results.failed}`);
    console.log(`⚠️ Avertissements: ${results.warnings}`);

    const totalTests = results.passed + results.failed + results.warnings;
    const score = Math.round((results.passed / totalTests) * 100);

    console.log(`🎯 Score d'accessibilité: ${score}/100`);

    if (score >= 90) {
      console.log('🌟 Excellent niveau d\'accessibilité!');
    } else if (score >= 75) {
      console.log('✅ Bon niveau d\'accessibilité');
    } else if (score >= 60) {
      console.log('⚠️ Accessibilité moyenne - améliorations recommandées');
    } else {
      console.log('🚨 Accessibilité faible - corrections nécessaires');
    }

    console.log('\n💡 Pour des tests plus avancés, utilisez:');
    console.log('   • axe DevTools (extension navigateur)');
    console.log('   • Lighthouse (Chrome DevTools)');
    console.log('   • WAVE Web Accessibility Tool');

    console.log('\n' + '='.repeat(50));

    // Stocker les résultats pour utilisation programmatique
    window.accessibilityResults = results;
    window.accessibilityScore = score;

    return results;
  }

  // Fonction publique pour relancer les tests
  window.runAccessibilityCheck = runChecks;

})();
