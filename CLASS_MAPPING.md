# Mappage des Classes CSS Générées vers Classes Sémantiques

Ce document liste toutes les classes CSS auto-générées qui ont été remplacées par des noms sémantiques dans `index-optimized.html` et `styles.css`.

## Classes Remplacées

| Classe Générée | Classe Sémantique | Usage |
|----------------|-------------------|-------|
| f19l8ale | root-container | Conteneur racine avec typographie de page |
| f1f4m9lc | header-section | Section d'en-tête/barre de navigation |
| f8obqgr | container-flush | Conteneur sans padding (edge-to-edge) |
| f1dlmh1s | section-heading | Titres de section (h2) |
| f1w5ugeb | paragraph-spacing | Espacement des paragraphes |
| f1p3vg09 | contact-banner | Bannière de contact en fond violet foncé |
| f2q6mzy | intro-section | Section d'introduction avec fond blanc |
| f9j4khj | full-width-center | Conteneur pleine largeur centré |
| fg93sa | section-padding | Padding standard de section (48-64px) |
| f14qxrhb | contact-section | Section contact avec fond violet foncé |
| f1rziroh | reviews-section | Section avis avec fond noir |
| faquzk0 | services-section | Section services avec fond violet clair |
| f1ld4zys | body-text | Style de texte de corps (16px) |
| f1y7ruft | intro-row | Ligne de conteneur d'introduction |
| f96or0t | full-width-content | Contenu pleine largeur |
| f1r530z1 | content-column | Colonne de contenu avec marges |
| f112xhzs | icon-border | Bordure supérieure/inférieure pour icônes |
| f13lgj57 | icon-no-shadow | Suppression d'ombre pour icônes |
| f1dqvktd | nav-links-container | Conteneur de liens de navigation |
| f1gbvfvs | feature-icon | Conteneur d'icône de fonctionnalité |
| f14z0jsa | reviews-heading | Titre de section avis |
| f1ii290s | flex-centered-row | Ligne flex centrée |
| fapbs0i | header-height | Hauteur fixe d'en-tête (72px) |
| fiej2jd | background-image | Conteneur d'image de fond |
| fin4unf | vertical-spacer | Espacement vertical (12px) |
| fjdvo17 | image-aspect-ratio | Ratio d'aspect d'image (1.33) |
| fskx96p | reviews-carousel | Carrousel d'avis clients |
| fxvdpxt | contact-background-image | Image de fond de contact avec overlay |

## Bénéfices

- **Lisibilité améliorée** : Les noms de classes décrivent maintenant clairement leur fonction
- **Maintenance facilitée** : Plus facile de comprendre et modifier le code
- **Documentation auto-descriptive** : Le HTML devient auto-documenté
- **Collaboration simplifiée** : Les développeurs peuvent comprendre le code plus rapidement
- **Debugging facilité** : Identification rapide des éléments dans les DevTools

## Fichiers Modifiés

- `index-optimized.html` : Toutes les classes générées utilisées ont été remplacées
- `styles.css` : Toutes les définitions de classes ont été mises à jour

## Notes

- Les classes Bootstrap (row, col, d-flex, etc.) ont été conservées
- Les classes utilitaires personnalisées ajoutées précédemment ont été conservées
- Certaines classes CSS non utilisées dans le HTML restent avec leurs noms générés
