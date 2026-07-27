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
   ARBORESCENCE DU SITE (refonte « par domaine de vie » — 7 pôles)
   -------------------------------------------------------------------------
   Accueil (index.html, data-page="accueil")
   ⚡ Aide maintenant ....... aide-maintenant/index.html   data-page="aide-maintenant"
   🏠 Se loger .............. se-loger/index.html          data-page="se-loger"
   🔑 Droits de locataire ... droits-locataire/index.html  data-page="droits-locataire"
   💶 Argent & démarches .... argent/index.html            data-page="argent"
   🍎 Se nourrir ............ se-nourrir/index.html         data-page="se-nourrir"
   💚 Santé & bien-être ..... sante/index.html             data-page="sante"
   💼 Emploi & avenir ....... emploi/index.html            data-page="emploi"
   ⚖️ Tes droits ............ droits/index.html            data-page="droits"
   🧼 Kit d'hygiène (CTA) ... kit-hygiene/index.html        data-page="kit-hygiene"

   Fiches thématiques (déplacées dans leur pôle, redirections aux anciennes URL) :
     se-loger/*.html, droits-locataire/*.html, argent/*.html, se-nourrir/*.html,
     sante/*.html, droits/*.html
   Fiches « logement & droits » data-driven : fiches/fiche.html?f=SLUG (data/fiches.js)

   Pied de page (transversal, hors nav principale) :
     🤝 Associations · ❓ FAQ · ℹ️ À propos · ⚖️ Mentions légales

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
  // Rubriques affichées dans la navigation principale (dans l'ordre) :
  //   ⚡ Aide maintenant (accès permanent, en tête) · 7 pôles · CTA Kit d'hygiène.
  var NAV = [
    { id: 'aide-maintenant',   href: 'aide-maintenant/index.html',   label: '⚡ Aide maintenant', urgent: true },
    { id: 'se-loger',          href: 'se-loger/index.html',          label: 'Se loger' },
    { id: 'droits-locataire',  href: 'droits-locataire/index.html',  label: 'Droits locataire' },
    { id: 'argent',            href: 'argent/index.html',            label: 'Argent' },
    { id: 'se-nourrir',        href: 'se-nourrir/index.html',        label: 'Se nourrir' },
    { id: 'sante',             href: 'sante/index.html',             label: 'Santé' },
    { id: 'emploi',            href: 'emploi/index.html',            label: 'Emploi' },
    { id: 'droits',            href: 'droits/index.html',            label: 'Droits & recours' },
    { id: 'kit-hygiene',       href: 'kit-hygiene/index.html',       label: 'Kit d\'hygiène', cta: true }
  ];

  // Libellés + liens de TOUTES les entrées (nav + secondaires), pour le fil
  // d'Ariane, le bloc « Voir aussi » et le pied de page.
  var PAGES = {
    'accueil':          { label: 'Accueil',                 href: 'index.html',                 ico: '🏠' },
    'aide-maintenant':  { label: 'Aide maintenant',         href: 'aide-maintenant/index.html', ico: '🆘' },
    'se-loger':         { label: 'Se loger',                href: 'se-loger/index.html',        ico: '🏠' },
    'droits-locataire': { label: 'Mes droits de locataire', href: 'droits-locataire/index.html', ico: '🔑' },
    'argent':           { label: 'Argent & démarches',      href: 'argent/index.html',          ico: '💶' },
    'se-nourrir':       { label: 'Se nourrir',              href: 'se-nourrir/index.html',      ico: '🍎' },
    'sante':            { label: 'Santé & bien-être',       href: 'sante/index.html',           ico: '💚' },
    'emploi':           { label: 'Emploi & avenir',         href: 'emploi/index.html',          ico: '💼' },
    'droits':           { label: 'Droits & recours',              href: 'droits/index.html',          ico: '⚖️' },
    'kit-hygiene':      { label: 'Kit d\'hygiène',          href: 'kit-hygiene/index.html',     ico: '🧼' },
    'associations':     { label: 'Associations',            href: 'associations/index.html',    ico: '🤝' },
    'epiceries':        { label: 'Épiceries solidaires',    href: 'epiceries/index.html',       ico: '🛒' },
    'faq':              { label: 'Questions fréquentes',    href: 'faq/index.html',             ico: '❓' },
    'a-propos':         { label: 'À propos d\'AZELER',      href: 'a-propos/index.html',        ico: 'ℹ️' },
    'contact':          { label: 'Nous contacter',          href: 'contact/index.html',         ico: '✉️' },
    // Le moteur de fiches « logement & droits » vit désormais dans le pôle Se loger.
    'fiches':           { label: 'Se loger',                href: 'se-loger/index.html',        ico: '🏠' }
  };

  /* --------------------------------------------------------------------- */
  /* Blocs « Voir aussi » — liens croisés entre pages liées                */
  /* Un élément est soit un id de rubrique (string), soit {label, href}.   */
  /* --------------------------------------------------------------------- */
  // Liens croisés « Voir aussi », affichés sur la page d'accueil de chaque pôle.
  // On câble par proximité de besoin (financer un logement ↔ argent, se nourrir ↔ argent…).
  var RELATED = {
    'aide-maintenant':  ['se-loger', 'sante', 'droits', 'se-nourrir'],
    'se-loger':         ['droits-locataire', 'argent', 'aide-maintenant', 'associations'],
    'droits-locataire': ['se-loger', 'droits', 'argent', 'associations'],
    'argent':           ['se-loger', 'se-nourrir', 'emploi', 'droits'],
    'se-nourrir':       ['epiceries', 'argent', 'associations', 'aide-maintenant'],
    'sante':            ['aide-maintenant', 'droits', 'associations', 'emploi'],
    'emploi':           ['argent', 'se-loger', 'droits', 'associations'],
    'droits':           ['droits-locataire', 'sante', 'aide-maintenant', 'associations'],
    'associations':     ['se-loger', 'se-nourrir', 'droits', 'aide-maintenant'],
    'epiceries':        ['se-nourrir', 'argent', 'associations', 'aide-maintenant'],
    'kit-hygiene':      ['se-nourrir', 'associations', 'aide-maintenant'],
    'faq':              ['a-propos', 'associations', 'aide-maintenant'],
    'a-propos':         ['associations', 'droits', 'faq']
  };

  // Par fiche data-driven (clé = slug de fiche.html?f=SLUG). Ne cible que des
  // pôles ou des fiches dont l'existence est confirmée.
  var F = function (label, href) { return { label: label, href: href }; };
  var FICHE_RELATED = {
    'premiere-location':   ['se-loger', 'droits-locataire', 'argent'],
    'bail-location':       ['droits-locataire', 'se-loger', 'argent'],
    'depot-garantie':      ['droits-locataire', 'argent', 'se-loger'],
    'etat-des-lieux':      ['droits-locataire', 'se-loger', 'argent'],
    'visale-garant':       ['se-loger', 'argent', 'droits-locataire'],
    'loca-pass':           ['se-loger', 'argent', 'droits-locataire'],
    'apl-caf':             ['argent', 'se-loger', 'droits-locataire'],
    'fsl':                 ['argent', 'se-loger', 'droits-locataire'],
    'logement-social':     ['se-loger', 'argent', 'droits'],
    'fjt-habitat-jeunes':  ['se-loger', 'emploi', 'argent'],
    'colocation':          ['se-loger', 'droits-locataire', 'argent'],
    'logement-jeunes-ase': ['se-loger', 'droits', 'argent']
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
  // « Quitter vite » — sécurité du public : bouton + touche Échap, présents
  // sur TOUTES les pages (feuille + script injectés ici, dégradation gracieuse).
  if (head && !head.querySelector('link[data-quick-exit]')) {
    var qcss = document.createElement('link');
    qcss.rel = 'stylesheet';
    qcss.href = base + 'assets/css/quick-exit.css';
    qcss.setAttribute('data-quick-exit', '');
    head.appendChild(qcss);
  }
  if (!document.querySelector('script[data-quick-exit]')) {
    var qjs = document.createElement('script');
    qjs.src = base + 'assets/js/quick-exit.js';
    qjs.setAttribute('data-quick-exit', '');
    body.appendChild(qjs);
  }

  /* --------------------------------------------------------------------- */
  /* 2. EN-TÊTE                                                            */
  /* --------------------------------------------------------------------- */
  var header = document.getElementById('site-header');
  if (header) {
    var navLinks = NAV.map(function (l) {
      var cur = (l.id === current) ? ' aria-current="page"' : '';
      var cls = l.cta ? ' class="az-nav__cta"' : (l.urgent ? ' class="az-nav__urgent"' : '');
      return '<a href="' + base + l.href + '"' + cls + cur + '>' + esc(l.label) + '</a>';
    }).join('');

    header.className = 'az-header';
    header.innerHTML =
      '<div class="container az-header__inner">' +
        '<a class="az-brand" href="' + base + 'index.html" aria-label="AZELER — retour à l\'accueil">' +
          '<img src="' + base + 'assets/img/logo-azeler.png?v=5" alt="AZELER — Votre asso, vos infos !">' +
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
    // Page de détail d'une fiche data-driven (fiche.html?f=SLUG).
    var qSlug = new URLSearchParams(location.search).get('f');
    relatedItems = FICHE_RELATED[qSlug] || FICHE_RELATED[slug] || RELATED['se-loger'];
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
    // Colonne « Le site » : accueil + aide + les 7 pôles + CTA
    var siteOrder = ['accueil', 'aide-maintenant', 'se-loger', 'droits-locataire',
      'argent', 'se-nourrir', 'sante', 'emploi', 'droits', 'kit-hygiene'];
    var siteLinks = siteOrder.map(function (id) {
      var p = PAGES[id];
      return '<li><a href="' + base + p.href + '">' + esc(p.label) + '</a></li>';
    }).join('');

    // Colonne secondaire : rubriques transversales reléguées au pied de page.
    var secondaryOrder = ['associations', 'epiceries', 'faq', 'a-propos', 'contact'];
    var secondaryLinks = secondaryOrder.map(function (id) {
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
              '<img src="' + base + 'assets/img/logo-azeler.png?v=5" alt="AZELER">' +
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

          // Colonne 4 : Plus + partenaire + copyright
          '<div>' +
            '<h3>Plus d\'AZELER</h3>' +
            '<ul class="az-footer__links">' + secondaryLinks + '</ul>' +
            '<p class="az-footer__partner" style="margin-top:16px">Partenaire&nbsp;: réseau <strong>ADEPAPE</strong><br>' +
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
    '❓': 'circle-help', '🔗': 'link', '💡': 'lightbulb', '🆘': 'life-buoy', '🔒': 'lock',
    '✨': 'sparkles', '🧭': 'compass'
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
  // Remplacement emoji→SVG DÉSACTIVÉ : on garde un style d'icônes cohérent
  // (emojis partout), plutôt qu'un mélange emojis + pictos vectoriels.
  void swapLeadingEmoji; // (fonction conservée si on veut réactiver un jour)
})();
