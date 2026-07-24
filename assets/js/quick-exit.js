/* « Quitter vite » : ouvre une page neutre dans un nouvel onglet et remplace
   la page courante sans la laisser dans l'historique. Touche Échap = même effet.
   Le bouton et la note sont injectés automatiquement si absents. */
(function () {
  function quitterVite() {
    try { window.open('https://www.google.fr/', '_blank'); } catch (e) {}
    window.location.replace('https://www.meteofrance.com/');
  }

  // Injecte le bouton s'il n'est pas déjà dans la page
  var btn = document.getElementById('quick-exit');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quick-exit';
    btn.id = 'quick-exit';
    btn.setAttribute('aria-label', 'Quitter vite ce site et ouvrir une page neutre');
    btn.innerHTML = '<span class="quick-exit__x" aria-hidden="true">✕</span> Quitter vite';
    document.body.insertBefore(btn, document.body.firstChild);
  }
  btn.addEventListener('click', quitterVite);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') quitterVite();
  });
})();
