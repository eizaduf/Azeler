/* =========================================================================
   AZELER — EN-TÊTE + FIL D'ARIANE + « VOIR AUSSI » + PIED DE PAGE COMMUNS
   =========================================================================

   Ce script injecte, de façon identique sur toutes les pages :
     1. les feuilles/scripts communs (layout.css, pack animations, favicon) ;
     2. l'en-tête (logo + navigation des 6 rubriques, sticky, menu mobile) ;
     3. le fil d'Ariane « Accueil › Rubrique › Page » ;
     4. un bloc « Voir aussi » (liens croisés entre pages liées) ;
     5. le pied de page (4 colonnes + numéros d'urgence + mentions légales).

   -------------------------------------------------------------------------
   ARBORESCENCE DU SITE
   -------------------------------------------------------------------------
   Accueil (index.html, data-page="accueil")
   ├── Se lancer ............ se-lancer/index.html        data-page="se-lancer"
   ├── Infos & fiches ....... fiches/index.html           data-page="fiches"
   │     ├── orientation.html, logement.html, sante.html,
   │     │   aide-alimentaire.html, aides-financieres.html,
   │     │   aide-psychologique.html, aide-juridique.html,
   │     │   violences-sexuelles.html, …  (fiches statiques)
   │     └── fiche.html?f=SLUG  (fiches générées depuis data/fiches.js)
   │   (l'ancienne rubrique infos-ase/ a FUSIONNÉ ici : infos-ase/index.html
   │    n'est plus qu'une redirection vers fiches/index.html#droits-ase)
   ├── Associations ......... associations/index.html     data-page="associations"
   ├── Épiceries ............ epiceries/index.html         data-page="epiceries"
   ├── Kit hygiène (CTA) .... kit-hygiene/index.html       data-page="kit-hygiene"
   ├── FAQ (secondaire) ..... faq/index.html               data-page="faq"
   └── Mentions légales ..... mentions.html                (à créer)

   Chaque page doit fournir :
     <body data-base="../" data-page="fiches">   (base = chemin vers la racine ;
                                                   "" pour la page d'accueil)
     <header id="site-header"></header>
     <footer id="site-footer"></footer>
   Le fil d'Ariane et le bloc « Voir aussi » sont déduits automatiquement de
   data-page + du nom de fichier : AUCUNE page n'a besoin de les coder à la main.
   ========================================================================= */
(function () {
  'use strict';

  var body = document.body;
  var base = body.getAttribute('data-base') || '';
  var current = body.getAttribute('data-page') || '';
  var head = document.head;

  /* Nom de fichier courant (ex. "logement.html" → slug "logement") */
  var pathname = location.pathname;
  var file = pathname.substring(pathname.lastIndexOf('/') + 1);
  var slug = file.replace(/\.html?$/i, '');
  var isIndex = (file === '' || slug === 'index');

  /* --------------------------------------------------------------------- */
  /* Registre des rubriques                                                */
  /* --------------------------------------------------------------------- */
  // Rubriques affichées dans la navigation principale (dans l'ordre).
  var NAV = [
    { id: 'se-lancer',    href: 'se-lancer/index.html',    label: 'Se lancer' },
    { id: 'fiches',       href: 'fiches/index.html',       label: 'Infos & fiches' },
    { id: 'associations', href: 'associations/index.html', label: 'Associations' },
    { id: 'epiceries',    href: 'epiceries/index.html',    label: 'Épiceries' },
    { id: 'kit-hygiene',  href: 'kit-hygiene/index.html',  label: 'Kit hygiène', cta: true }
  ];

  // Libellés + liens de TOUTES les entrées (nav + secondaires), pour le fil
  // d'Ariane, le bloc « Voir aussi » et le pied de page.
  var PAGES = {
    'accueil':      { label: 'Accueil',              href: 'index.html',              ico: '🏠' },
    'se-lancer':    { label: 'Se lancer',            href: 'se-lancer/index.html',    ico: '🚀' },
    'fiches':       { label: 'Infos & fiches',       href: 'fiches/index.html',       ico: '📄' },
    'associations': { label: 'Associations',         href: 'associations/index.html', ico: '🤝' },
    'epiceries':    { label: 'Épiceries',            href: 'epiceries/index.html',    ico: '🛒' },
    'kit-hygiene':  { label: 'Kit hygiène',          href: 'kit-hygiene/index.html',  ico: '🧼' },
    'faq':          { label: 'Questions fréquentes', href: 'faq/index.html',          ico: '❓' }
  };

  /* --------------------------------------------------------------------- */
  /* Blocs « Voir aussi » — liens croisés entre pages liées                */
  /* Un élément est soit un id de rubrique (string), soit {label, href}.   */
  /* --------------------------------------------------------------------- */
  var RELATED = {
    'se-lancer':    ['fiches', 'associations', 'kit-hygiene'],
    'fiches':       ['se-lancer', 'associations', 'epiceries'],
    'associations': ['fiches', 'epiceries', 'se-lancer'],
    'epiceries':    ['fiches', 'associations', 'kit-hygiene'],
    'kit-hygiene':  ['epiceries', 'associations', 'se-lancer'],
    'faq':          ['se-lancer', 'fiches', 'kit-hygiene']
  };

  // Par fiche statique (clé = nom de fichier sans .html). Ne cible que des
  // rubriques ou des fiches statiques dont l'existence est confirmée.
  var F = function (label, href) { return { label: label, href: href }; };
  var FICHE_RELATED = {
    'logement':            ['associations', 'epiceries', F('Fiche : aides financières', 'fiches/aides-financieres.html')],
    'aide-alimentaire':    ['epiceries', 'associations', F('Fiche : aides financières', 'fiches/aides-financieres.html')],
    'aides-financieres':   [F('Fiche : logement', 'fiches/logement.html'), 'epiceries', 'se-lancer'],
    'sante':               [F('Fiche : soutien psychologique', 'fiches/aide-psychologique.html'), 'associations', 'se-lancer'],
    'aide-psychologique':  [F('Fiche : santé', 'fiches/sante.html'), 'associations', 'fiches'],
    'violences-sexuelles': [F('Fiche : aide juridique', 'fiches/aide-juridique.html'), F('Fiche : soutien psychologique', 'fiches/aide-psychologique.html'), 'associations'],
    'aide-juridique':      [F('Fiche : violences sexuelles', 'fiches/violences-sexuelles.html'), 'associations', 'fiches'],
    'orientation':         ['se-lancer', 'fiches', 'associations'],
    // Nouvelles fiches « logement & droits » : rattachées au logement.
    'droits-locataire':    [F('Fiche : logement', 'fiches/logement.html'), 'associations', 'epiceries'],
    'logement-indigne':    [F('Fiche : logement', 'fiches/logement.html'), 'associations', 'se-lancer'],
    'impayes-expulsion':   [F('Fiche : logement', 'fiches/logement.html'), 'associations', F('Fiche : aides financières', 'fiches/aides-financieres.html')],
    'accession-sociale':   [F('Fiche : logement', 'fiches/logement.html'), 'se-lancer', 'associations'],
    'trouver-adil':        [F('Fiche : logement', 'fiches/logement.html'), F('Fiche : droits du locataire', 'fiches/droits-locataire.html'), 'associations']
  };

  /* --------------------------------------------------------------------- */
  /* Outils                                                                */
  /* --------------------------------------------------------------------- */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  // Résout un item de « Voir aussi » (id de rubrique ou {label, href}) en lien.
  function resolveLink(item) {
    if (typeof item === 'string') {
      var p = PAGES[item];
      if (!p) { return null; }
      return { label: p.label, href: base + p.href, ico: p.ico };
    }
    return { label: item.label, href: base + item.href, ico: item.ico || '➜' };
  }
  // Libellé de la page courante (feuille du fil d'Ariane), déduit du <h1>.
  function leafLabel() {
    var override = body.getAttribute('data-crumb');
    if (override) { return override; }
    var h1 = document.querySelector('.page-hero h1') || document.querySelector('h1');
    if (!h1) { return ''; }
    var raw = (h1.textContent || '').trim();
    // Retire la traîne d'emoji/symbole décoratif en fin de titre
    // (ex. « Logement & hébergement 🏠 » → « Logement & hébergement »).
    var cleaned = raw;
    try {
      cleaned = raw.replace(/[\s‍️]*(?:\p{Extended_Pictographic}[\s‍️]*)+$/u, '').trim();
    } catch (e) { /* moteur sans \p{...} : on garde le titre tel quel */ }
    return cleaned || raw;
  }

  /* --------------------------------------------------------------------- */
  /* 1. Feuilles/scripts communs + favicon                                 */
  /* --------------------------------------------------------------------- */
  if (head && !head.querySelector('link[data-az-layout]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = base + 'assets/css/layout.css';
    css.setAttribute('data-az-layout', '');
    head.appendChild(css);
  }
  // Couche « moderne » (additive) : contraste WCAG + finitions esthétiques.
  // Chargée après design-system.css et layout.css pour pouvoir les affiner.
  if (head && !head.querySelector('link[data-az-theme]')) {
    var tcss = document.createElement('link');
    tcss.rel = 'stylesheet';
    tcss.href = base + 'assets/css/theme-modern.css';
    tcss.setAttribute('data-az-theme', '');
    head.appendChild(tcss);
  }
  if (head && !head.querySelector('link[rel="icon"]')) {
    var ic = document.createElement('link');
    ic.rel = 'icon'; ic.type = 'image/png'; ic.href = base + 'assets/img/favicon.png';
    head.appendChild(ic);
    var at = document.createElement('link');
    at.rel = 'apple-touch-icon'; at.href = base + 'assets/img/apple-touch-icon.png';
    head.appendChild(at);
  }
  // Pack animations (feuille + script) — conservé de la version précédente.
  if (head && !head.querySelector('link[data-anim]')) {
    var acss = document.createElement('link');
    acss.rel = 'stylesheet';
    acss.href = base + 'assets/css/anim.css';
    acss.setAttribute('data-anim', '');
    head.appendChild(acss);
  }
  if (!document.querySelector('script[data-anim]')) {
    var ajs = document.createElement('script');
    ajs.src = base + 'assets/js/anim.js';
    ajs.setAttribute('data-anim', '');
    body.appendChild(ajs);
  }

  /* --------------------------------------------------------------------- */
  /* 2. EN-TÊTE                                                            */
  /* --------------------------------------------------------------------- */
  var header = document.getElementById('site-header');
  if (header) {
    var navLinks = NAV.map(function (l) {
      var cur = (l.id === current) ? ' aria-current="page"' : '';
      var cls = l.cta ? ' class="az-nav__cta"' : '';
      return '<a href="' + base + l.href + '"' + cls + cur + '>' + esc(l.label) + '</a>';
    }).join('');

    header.className = 'az-header';
    header.innerHTML =
      '<div class="container az-header__inner">' +
        '<a class="az-brand" href="' + base + 'index.html" aria-label="AZELER — retour à l\'accueil">' +
          '<img src="' + base + 'assets/img/logo-azeler.png" alt="AZELER — Votre asso, vos infos !">' +
        '</a>' +
        '<button class="az-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="az-mainnav">' +
          '<span class="az-burger__bars" aria-hidden="true"></span>' +
        '</button>' +
        '<nav class="az-nav" id="az-mainnav" aria-label="Navigation principale">' + navLinks + '</nav>' +
      '</div>';

    var burger = header.querySelector('.az-burger');
    var nav = header.querySelector('#az-mainnav');

    var setMenu = function (open) {
      header.classList.toggle('nav-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };
    burger.addEventListener('click', function (e) {
      e.stopPropagation();
      setMenu(!header.classList.contains('nav-open'));
    });
    // Fermeture sur Échap (et retour du focus sur le burger)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('nav-open')) {
        setMenu(false);
        burger.focus();
      }
    });
    // Fermeture au clic à l'extérieur du menu
    document.addEventListener('click', function (e) {
      if (header.classList.contains('nav-open') && !nav.contains(e.target) && e.target !== burger) {
        setMenu(false);
      }
    });
    // Fermeture après un clic sur un lien (utile en mobile)
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { setMenu(false); }
    });

    // Ombre au scroll
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.pageYOffset > 4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --------------------------------------------------------------------- */
  /* 3. FIL D'ARIANE                                                       */
  /* --------------------------------------------------------------------- */
  if (current && current !== 'accueil') {
    var rub = PAGES[current];
    var trail = [{ label: 'Accueil', href: base + 'index.html' }];
    if (rub) {
      if (isIndex) {
        // Page d'accueil d'une rubrique : « Accueil › Rubrique »
        trail.push({ label: rub.label });
      } else {
        // Sous-page (ex. une fiche) : « Accueil › Rubrique › Page »
        trail.push({ label: rub.label, href: base + rub.href });
        trail.push({ label: leafLabel() || rub.label });
      }
    }
    var crumbHtml = trail.map(function (t, i) {
      var sep = i > 0 ? '<span class="az-breadcrumb__sep" aria-hidden="true">›</span>' : '';
      if (t.href) {
        return sep + '<a href="' + t.href + '">' + esc(t.label) + '</a>';
      }
      return sep + '<span aria-current="page">' + esc(t.label) + '</span>';
    }).join('');

    // On remplace un fil existant, sinon on l'ajoute en tête du page-hero.
    var crumbEl = document.querySelector('.page-hero .breadcrumb, .page-hero .az-breadcrumb');
    if (!crumbEl) {
      var heroC = document.querySelector('.page-hero .container');
      if (heroC) {
        crumbEl = document.createElement('nav');
        heroC.insertBefore(crumbEl, heroC.firstChild);
      }
    }
    if (crumbEl) {
      crumbEl.className = 'breadcrumb az-breadcrumb';
      crumbEl.setAttribute('aria-label', 'Fil d\'Ariane');
      crumbEl.innerHTML = crumbHtml;
    }
  }

  /* --------------------------------------------------------------------- */
  /* 4. BLOC « VOIR AUSSI »                                                */
  /* --------------------------------------------------------------------- */
  var footerEl = document.getElementById('site-footer');
  var relatedItems = null;
  if (current === 'fiches' && !isIndex) {
    relatedItems = FICHE_RELATED[slug] || RELATED['fiches'];
  } else if (RELATED[current] && isIndex) {
    relatedItems = RELATED[current];
  }
  if (relatedItems && footerEl && current !== 'accueil') {
    var cards = relatedItems.map(resolveLink).filter(Boolean).map(function (l) {
      return '<a class="az-related__card" href="' + l.href + '">' +
               '<span class="az-related__ico" aria-hidden="true">' + (l.ico || '➜') + '</span>' +
               '<span>' + esc(l.label) + '</span>' +
               '<span class="az-related__arrow" aria-hidden="true">→</span>' +
             '</a>';
    }).join('');
    if (cards) {
      var related = document.createElement('section');
      related.className = 'az-related';
      related.setAttribute('aria-label', 'Voir aussi');
      related.innerHTML =
        '<div class="container">' +
          '<h2 class="az-related__title"><span aria-hidden="true">🔗</span> Voir aussi</h2>' +
          '<div class="az-related__grid">' + cards + '</div>' +
        '</div>';
      footerEl.parentNode.insertBefore(related, footerEl);
    }
  }

  /* --------------------------------------------------------------------- */
  /* 5. PIED DE PAGE                                                       */
  /* --------------------------------------------------------------------- */
  if (footerEl) {
    // Colonne « Le site » : accueil + les rubriques (nav + FAQ)
    var siteOrder = ['accueil', 'se-lancer', 'fiches', 'associations', 'epiceries', 'kit-hygiene', 'faq'];
    var siteLinks = siteOrder.map(function (id) {
      var p = PAGES[id];
      return '<li><a href="' + base + p.href + '">' + esc(p.label) + '</a></li>';
    }).join('');

    // Numéros d'urgence
    var urgences = [
      { num: '119',     lbl: 'Enfance en danger — 24h/24',        tel: '119' },
      { num: '15',      lbl: 'SAMU — urgence médicale',           tel: '15' },
      { num: '3114',    lbl: 'Prévention du suicide — 24h/24',    tel: '3114' },
      { num: '116 006', lbl: 'France Victimes — aide aux victimes', tel: '116006' }
    ];
    var urgHtml = urgences.map(function (u) {
      return '<li><a class="az-urg" href="tel:' + u.tel + '">' +
               '<span class="az-urg__num">' + u.num + '</span>' +
               '<span class="az-urg__lbl">' + esc(u.lbl) + '</span>' +
             '</a></li>';
    }).join('');

    footerEl.className = 'az-footer';
    footerEl.innerHTML =
      '<div class="container">' +
        '<div class="az-footer__grid">' +

          // Colonne 1 : marque + tagline + mission
          '<div class="az-footer__brand">' +
            '<a href="' + base + 'index.html" aria-label="AZELER — accueil">' +
              '<img src="' + base + 'assets/img/logo-azeler.png" alt="AZELER">' +
            '</a>' +
            '<p class="az-footer__tagline">« Votre asso, vos infos&nbsp;! »</p>' +
            '<p class="az-footer__mission">Toutes tes infos et tes contacts utiles au même endroit, ' +
              'quand l\'accompagnement de l\'ASE s\'arrête. Par des jeunes de l\'ASE, pour des jeunes de l\'ASE.</p>' +
          '</div>' +

          // Colonne 2 : Le site
          '<nav aria-label="Plan du site">' +
            '<h3>Le site</h3>' +
            '<ul class="az-footer__links">' + siteLinks + '</ul>' +
          '</nav>' +

          // Colonne 3 : Urgences
          '<div>' +
            '<h3>Besoin d\'aide tout de suite&nbsp;?</h3>' +
            '<ul class="az-footer__urgence">' + urgHtml + '</ul>' +
          '</div>' +

          // Colonne 4 : Partenaire + copyright
          '<div>' +
            '<h3>Notre réseau</h3>' +
            '<p class="az-footer__partner">Partenaire&nbsp;: réseau <strong>ADEPAPE</strong><br>' +
              '<span style="opacity:.85">Associations Départementales d\'Entraide des Personnes ' +
              'Accueillies en Protection de l\'Enfance.</span></p>' +
            '<p class="az-footer__copy">© 2026 AZELER</p>' +
          '</div>' +

        '</div>' +

        // Barre du bas : rappel sécurité + mentions légales
        '<div class="az-footer__bottom">' +
          '<span class="az-footer__security">🔒 <strong>En cas de danger immédiat, appelle le 119 ou le 15.</strong> ' +
            'Pour effacer tes traces, utilise le bouton de sortie rapide et pense à la navigation privée.</span>' +
          '<a href="' + base + 'mentions.html">Mentions légales</a>' +
        '</div>' +
      '</div>';
  }

  /* --------------------------------------------------------------------- */
  /* 6. ICÔNES SVG — remplacent les emoji décoratifs (rendu plus moderne)  */
  /* Les SVG (jeu Lucide) sont dans assets/img/icons/ et colorés en CSS    */
  /* via currentColor. On ne touche qu'aux emoji EN TÊTE de conteneurs     */
  /* connus : aucun texte de contenu n'est modifié.                        */
  /* --------------------------------------------------------------------- */
  var ICONS = {
    '🚀': 'rocket', '📘': 'book-open', '📖': 'book-open', '📄': 'file-text',
    '🤝': 'handshake', '🛒': 'shopping-basket', '🧼': 'droplets', '🏠': 'house',
    '🍎': 'apple', '💚': 'heart', '❤': 'heart', '💼': 'briefcase',
    '❓': 'circle-help', '🔗': 'link', '💡': 'lightbulb', '🆘': 'life-buoy', '🔒': 'lock'
  };
  function makeIco(name) {
    var s = document.createElement('span');
    s.className = 'az-ico';
    // URL ABSOLUE : une url() relative dans une custom property serait résolue
    // par rapport à la feuille CSS (assets/css/…), pas au document → chemin cassé.
    var abs = new URL(base + 'assets/img/icons/' + name + '.svg', document.baseURI).href;
    s.style.setProperty('--ico', 'url("' + abs + '")');
    s.setAttribute('aria-hidden', 'true');
    return s;
  }
  function swapLeadingEmoji(el) {
    // Premier nœud texte non vide de l'élément
    var node = el.firstChild;
    while (node && node.nodeType === 3 && !node.textContent.trim()) { node = node.nextSibling; }
    if (!node || node.nodeType !== 3) { return; }
    var txt = node.textContent;
    var start = txt.replace(/^\s+/, '');
    for (var key in ICONS) {
      if (start.indexOf(key) === 0) {
        // Retire l'emoji (+ éventuel sélecteur de variante / espace) du texte
        var rest = start.slice(key.length).replace(/^[️‍]*\s*/, '');
        node.textContent = rest;
        el.insertBefore(makeIco(ICONS[key]), node);
        return;
      }
    }
  }
  [
    '.card__icon', '.hero-chip', '.az-related__ico',
    '.az-related__title > span[aria-hidden="true"]',
    '.urgence h3', '.conseil-box strong', '.az-footer__security'
  ].forEach(function (sel) {
    Array.prototype.forEach.call(document.querySelectorAll(sel), swapLeadingEmoji);
  });
})();
