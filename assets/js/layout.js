/* =========================================================================
   AZELER — EN-TÊTE + PIED DE PAGE COMMUNS (FICHIER GELÉ)
   -------------------------------------------------------------------------
   NE PAS MODIFIER. Ce script injecte le menu et le pied de page identiques
   sur toutes les pages, pour qu'aucun terminal n'ait à les réécrire.

   Chaque page doit avoir :
     <body data-base="../" data-page="se-lancer">   (base = chemin vers la racine)
     <header id="site-header"></header>
     <footer id="site-footer"></footer>
   Pour la page d'accueil (racine) : data-base=""  data-page="accueil"
   ========================================================================= */
(function () {
  var base = document.body.getAttribute('data-base') || '';
  var current = document.body.getAttribute('data-page') || '';

  var links = [
    { id: 'se-lancer',   href: 'se-lancer/index.html',    label: 'Se lancer' },
    { id: 'infos-ase',   href: 'infos-ase/index.html',    label: 'Infos ASE' },
    { id: 'fiches',      href: 'fiches/index.html',       label: 'Fiches pratiques' },
    { id: 'associations',href: 'associations/index.html', label: 'Associations' },
    { id: 'epiceries',   href: 'epiceries/index.html',    label: 'Épiceries' },
    { id: 'kit-hygiene', href: 'kit-hygiene/index.html',  label: 'Kit hygiène', cta: true }
  ];

  function navHtml() {
    return links.map(function (l) {
      var cur = l.id === current ? ' aria-current="page"' : '';
      var cta = l.cta ? ' nav__cta' : '';
      return '<a class="' + cta.trim() + '" href="' + base + l.href + '"' + cur + '>' + l.label + '</a>';
    }).join('');
  }

  var header = document.getElementById('site-header');
  if (header) {
    header.className = 'site-header';
    header.innerHTML =
      '<div class="container">' +
        '<a class="logo" href="' + base + 'index.html">AZELER</a>' +
        '<button class="burger" aria-label="Menu">&#9776;</button>' +
        '<nav class="nav" id="mainnav">' + navHtml() + '</nav>' +
      '</div>';
    var burger = header.querySelector('.burger');
    var nav = header.querySelector('#mainnav');
    burger.addEventListener('click', function () { nav.classList.toggle('nav--open'); });
  }

  var footer = document.getElementById('site-footer');
  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div>' +
            '<a class="logo" href="' + base + 'index.html">AZELER</a>' +
            '<p class="tagline" style="color:#cfd4e6">« Votre asso, vos infos&nbsp;! »</p>' +
            '<p>Par des jeunes de l\'ASE, pour des jeunes de l\'ASE.<br>Association créée en 2026.</p>' +
          '</div>' +
          '<div>' +
            '<h3 style="color:#fff">Le site</h3>' +
            links.map(function (l){ return '<div><a href="'+base+l.href+'">'+l.label+'</a></div>'; }).join('') +
          '</div>' +
          '<div>' +
            '<h3 style="color:#fff">Nous joindre</h3>' +
            '<p>Partenaire&nbsp;: réseau ADEPAPE<br>(Associations Départementales d\'Entraide des Personnes Accueillies en Protection de l\'Enfance)</p>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">© 2026 AZELER — En cas de danger immédiat, appelez le 119 (Enfance en danger) ou le 15.</div>' +
      '</div>';
  }
})();
