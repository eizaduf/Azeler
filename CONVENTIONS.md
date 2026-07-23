# AZELER — Règles de travail en parallèle (À LIRE PAR CHAQUE TERMINAL)

Site statique HTML/CSS/JS. Aucun `npm`, aucun serveur. On ouvre `index.html` dans le navigateur.

## Règle d'or : chacun son dossier
| Terminal | Dossier / fichiers qu'il possède | Interdiction |
|----------|----------------------------------|--------------|
| 1 | `se-lancer/` | ne touche à rien d'autre |
| 2 | `infos-ase/` | ne touche à rien d'autre |
| 3 | `associations/` + `data/associations.js` | ne touche à rien d'autre |
| 4 | `epiceries/` + `data/epiceries.js` | ne touche à rien d'autre |
| 5 | `kit-hygiene/` | ne touche à rien d'autre |

## Rubrique « Fiches pratiques » (Kit d'accès aux droits) — dossier `fiches/`
Une fiche = un fichier HTML dans `fiches/`. Modèle de référence déjà rédigé : `fiches/orientation.html`.
Fiches à remplir depuis les PDF (~/Downloads) : logement.html (02), aide-alimentaire.html (03),
violences-sexuelles.html (04), aides-financieres.html (05), aide-psychologique.html (06).
Composants dédiés dispo dans le CSS : `urgence`, `danger-box`, `conseil-box`, `fiche-table`, `fiche-sources`, `fiche-note`.
Toujours citer les sources officielles et garder la mention « Informations vérifiées le 23 juillet 2026 ».

## Fichiers GELÉS — personne n'y touche
- `assets/css/design-system.css` (charte + composants communs)
- `assets/js/layout.js` (menu + pied de page communs)
- `index.html` (page d'accueil / hub)
- `CONVENTIONS.md` (ce fichier)

## Charte graphique (déjà dans le CSS, à réutiliser via les variables et classes)
- Bleu principal : `#5170ff` → `var(--azeler-blue)`
- Corail de marque (secondaire) : `#FF5A6E` → `var(--azeler-red)` = l'accent (`var(--azeler-accent)`)
- Ardoise (secondaire) : `#464555` → `var(--azeler-slate)` (surfaces foncées, pied de page)
- Blanc : `#ffffff`
- Police logo/titres décoratifs : **Chewy** (`var(--font-logo)`)
- Police texte : **Nunito** (déjà par défaut)
- Slogan : « Votre asso, vos infos ! »

## Composants prêts à l'emploi (classes CSS)
- Conteneur : `<div class="container">`
- Section : `<section class="section">` ou `section--soft` (fond bleu clair)
- Carte : `<div class="card">` avec `card__icon`, `card__title`, `card__text`
- Grilles : `grid grid--2 / grid--3 / grid--4`
- Boutons : `btn btn--primary` | `btn--accent` | `btn--ghost` | `btn--white`
- Statistique : `stat` > `stat__num` + `stat__label`
- Badge : `<span class="badge">Texte</span>`

## Structure imposée de chaque page (déjà en place, ne pas casser)
```html
<body data-base="../" data-page="NOM-DE-LA-PAGE">
  <header id="site-header"></header>      <!-- menu injecté auto -->
  <section class="page-hero">…</section>  <!-- garder le titre + fil d'ariane -->
  <section class="section"><div class="container"> … TON CONTENU … </div></section>
  <footer id="site-footer"></footer>      <!-- pied injecté auto -->
  <script src="../assets/js/layout.js"></script>
</body>
```
- Tu remplaces uniquement le bloc « ZONE DE TRAVAIL » (le `.wip`) par ton contenu.
- Tu peux créer des fichiers PROPRES à ta page dans ton dossier : `page.css`, `page.js`, images.
- Ton et style : bienveillant, tutoiement, phrases courtes, mobile d'abord.

## Ce qu'on ne met PAS (pour l'instant)
- Pas de vrai back-end (le formulaire simule l'envoi).
- Pas de données personnelles réelles dans le code.
- Toujours indiquer les sources des chiffres.

## Pour prévisualiser
Ouvre `~/Downloads/azeler/index.html` dans ton navigateur et clique dans le menu.
