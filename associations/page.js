/* =========================================================================
   AZELER — Page Associations (Terminal 3)
   Génère la grille de cartes à partir de window.AZELER_ASSOCIATIONS
   et gère les filtres par thème. JavaScript simple, sans librairie.
   ========================================================================= */
(function () {
  "use strict";

  var data = window.AZELER_ASSOCIATIONS || [];

  // Libellés + emoji d'icône par thème
  var THEMES = {
    logement:   { label: "Logement",   icon: "🏠" },
    alimentaire:{ label: "Alimentaire",icon: "🍽️" },
    sante:      { label: "Santé",      icon: "❤️" },
    juridique:  { label: "Juridique",  icon: "⚖️" },
    emploi:     { label: "Emploi",     icon: "💼" },
    ADEPAPE:    { label: "ADEPAPE",    icon: "🤝" },
    autre:      { label: "Autre",      icon: "✨" }
  };

  var grid = document.getElementById("assos-grid");
  var filters = document.getElementById("assos-filters");
  if (!grid || !filters) return;

  // ---- Échappe le texte pour éviter toute injection ----
  function esc(str) {
    var d = document.createElement("div");
    d.textContent = str == null ? "" : String(str);
    return d.innerHTML;
  }

  // ---- Construit une carte ----
  function carte(a) {
    var t = THEMES[a.theme] || THEMES.autre;

    var actions = "";
    if (a.lien) {
      actions += '<a class="btn btn--primary" href="' + esc(a.lien) +
        '" target="_blank" rel="noopener">Visiter le site ↗</a>';
    }
    if (a.telephone) {
      var tel = a.telephone.replace(/\s+/g, "");
      actions += '<a class="btn btn--ghost" href="tel:' + esc(tel) + '">📞 ' +
        esc(a.telephone) + "</a>";
    }

    var ville = a.ville ? '<p class="asso-card__ville">📍 ' + esc(a.ville) + "</p>" : "";

    return '' +
      '<article class="card asso-card" data-theme="' + esc(a.theme) + '">' +
        '<div class="card__icon">' + t.icon + "</div>" +
        '<span class="badge">' + esc(t.label) + "</span>" +
        '<h3 class="card__title mt-2">' + esc(a.nom) + "</h3>" +
        ville +
        '<p class="card__text">' + esc(a.description) + "</p>" +
        '<div class="asso-card__actions">' + actions + "</div>" +
      "</article>";
  }

  // ---- Affiche les assos selon le filtre courant ----
  function render(theme) {
    var liste = theme === "all"
      ? data
      : data.filter(function (a) { return a.theme === theme; });

    if (!liste.length) {
      grid.innerHTML = '<p class="asso-empty">Aucune association dans cette catégorie pour le moment.</p>';
      return;
    }
    grid.innerHTML = liste.map(carte).join("");
  }

  // ---- Construit les boutons de filtre ----
  function buildFilters() {
    // Thèmes réellement présents dans les données, dans l'ordre de THEMES
    var presents = Object.keys(THEMES).filter(function (key) {
      return data.some(function (a) { return a.theme === key; });
    });

    var boutons = [{ theme: "all", label: "Tous", icon: "🔎" }];
    presents.forEach(function (key) {
      boutons.push({ theme: key, label: THEMES[key].label, icon: THEMES[key].icon });
    });

    filters.innerHTML = boutons.map(function (b, i) {
      var cls = "btn btn--ghost assos-filter" + (i === 0 ? " is-active" : "");
      return '<button type="button" class="' + cls + '" data-filter="' +
        b.theme + '">' + b.icon + " " + esc(b.label) + "</button>";
    }).join("");

    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".assos-filter");
      if (!btn) return;
      filters.querySelectorAll(".assos-filter").forEach(function (el) {
        el.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      render(btn.getAttribute("data-filter"));
    });
  }

  buildFilters();
  render("all");
})();
