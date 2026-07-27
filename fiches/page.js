/* =========================================================================
   AZELER — Logique de la rubrique FICHES
   -------------------------------------------------------------------------
   Un seul fichier pour deux usages, détectés par la présence d'un conteneur :
     • #fx-app    (fiches/index.html) → moteur de recherche + filtres + liste
     • #fx-detail (fiches/fiche.html) → page de détail d'une fiche

   Les données viennent de ../data/fiches.js (window.AZELER_FICHES).
   Tout est statique, sans framework.
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.AZELER_FICHES || [];

  /* -- Échappement HTML pour les valeurs qu'on injecte -------------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* -- Texte brut d'un HTML (pour la recherche plein-texte) --------------- */
  function toText(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html || "";
    return (tmp.textContent || tmp.innerText || "");
  }

  /* -- Sans accents + minuscules (recherche tolérante) ------------------- */
  function norm(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  /* -- Rendu des sources (tableau ou objet unique) ----------------------- */
  function sourcesHtml(src) {
    var arr = Array.isArray(src) ? src : (src ? [src] : []);
    if (!arr.length) return "";
    return arr.map(function (s) {
      return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' +
             esc(s.nom) + "</a></li>";
    }).join("");
  }

  /* ======================================================================
     1) MOTEUR DE RECHERCHE (page index)
     ====================================================================== */
  function initMoteur(app) {
    var searchEl = document.getElementById("fx-search");
    var countEl = document.getElementById("fx-count");
    var filtersEl = document.getElementById("fx-filters");
    var listEl = document.getElementById("fx-list");
    var currentTheme = "all";

    // On pré-calcule le texte cherchable de chaque fiche
    var index = DATA.map(function (f) {
      return {
        fiche: f,
        hay: norm([f.titre, f.theme, f.resume, toText(f.contenuHtml)].join(" "))
      };
    });

    // Puces de thème : « Toutes » + un bouton par thématique présente
    var themes = [];
    DATA.forEach(function (f) { if (themes.indexOf(f.theme) === -1) themes.push(f.theme); });
    filtersEl.innerHTML =
      '<button type="button" class="fx-filter is-active" data-theme="all">Toutes</button>' +
      themes.map(function (t) {
        return '<button type="button" class="fx-filter" data-theme="' + esc(t) + '">' + esc(t) + "</button>";
      }).join("");

    function filtrer() {
      var q = norm(searchEl ? searchEl.value : "").trim();
      return index.filter(function (row) {
        if (currentTheme !== "all" && row.fiche.theme !== currentTheme) return false;
        if (!q) return true;
        // chaque mot tapé doit être présent (recherche « ET »)
        return q.split(/\s+/).every(function (mot) { return row.hay.indexOf(mot) !== -1; });
      }).map(function (row) { return row.fiche; });
    }

    function carte(f) {
      return (
        '<a class="fx-card" href="fiche.html?f=' + encodeURIComponent(f.slug) + '">' +
          '<div class="fx-card__top">' +
            '<span class="fx-card__emoji" aria-hidden="true">' + esc(f.emoji || "📄") + "</span>" +
            '<span class="fx-card__theme">' + esc(f.theme) + "</span>" +
          "</div>" +
          '<h3 class="fx-card__title">' + esc(f.titre) + "</h3>" +
          '<p class="fx-card__resume">' + esc(f.resume) + "</p>" +
          '<span class="fx-card__cta">Lire la fiche →</span>' +
        "</a>"
      );
    }

    function rendre() {
      var items = filtrer();
      if (!items.length) {
        listEl.innerHTML = '<p class="fx-empty">Aucune fiche ne correspond. Essaie un autre mot-clé ' +
          '(par exemple «&nbsp;caution&nbsp;», «&nbsp;APL&nbsp;» ou «&nbsp;colocation&nbsp;») ' +
          'ou choisis «&nbsp;Toutes&nbsp;».</p>';
      } else {
        listEl.innerHTML = items.map(carte).join("");
      }
      if (countEl) {
        countEl.textContent = items.length + (items.length > 1 ? " fiches" : " fiche");
      }
    }

    if (searchEl) {
      searchEl.addEventListener("input", rendre);
      searchEl.addEventListener("keydown", function (e) { if (e.key === "Enter") e.preventDefault(); });
    }
    filtersEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".fx-filter");
      if (!btn) return;
      currentTheme = btn.getAttribute("data-theme") || "all";
      Array.prototype.forEach.call(filtersEl.querySelectorAll(".fx-filter"), function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      rendre();
    });

    rendre();
  }

  /* ======================================================================
     2) PAGE DE DÉTAIL (fiche.html)
     ====================================================================== */
  // Fiches fusionnées : anciens slugs data-driven → nouvelle fiche statique.
  // Préserve les liens partagés fiche.html?f=SLUG après la refonte.
  var FICHE_MOVED = {
    "droits-locataire":  "../droits-locataire/droits-locataire.html",
    "logement-indecent": "../droits-locataire/logement-indigne.html"
  };

  function initDetail(detail) {
    var params = new URLSearchParams(window.location.search);
    var slug = params.get("f");
    if (FICHE_MOVED[slug]) { window.location.replace(FICHE_MOVED[slug]); return; }
    var fiche = DATA.filter(function (f) { return f.slug === slug; })[0];

    var titleEl = document.getElementById("fx-title");
    var themeEl = document.getElementById("fx-theme");
    var crumbEl = document.getElementById("fx-crumb");
    var resumeEl = document.getElementById("fx-resume");
    var contentEl = document.getElementById("fx-content");
    var sourcesEl = document.getElementById("fx-sources");

    if (!fiche) {
      if (titleEl) titleEl.textContent = "Fiche introuvable";
      if (resumeEl) resumeEl.textContent = "Cette fiche n'existe pas ou le lien est incomplet.";
      if (contentEl) {
        contentEl.innerHTML =
          '<div class="conseil-box">Retourne à la liste des fiches pour retrouver ' +
          'ce que tu cherches.</div>' +
          '<a class="btn btn--primary fx-detail__back" href="index.html#recherche-logement">' +
          "← Toutes les fiches</a>";
      }
      return;
    }

    document.title = fiche.titre + " — Fiches pratiques — AZELER";
    if (titleEl) titleEl.innerHTML = esc(fiche.titre) + " " + esc(fiche.emoji || "");
    if (themeEl) themeEl.textContent = fiche.theme;
    if (crumbEl) crumbEl.textContent = fiche.titre;
    if (resumeEl) resumeEl.textContent = fiche.resume;
    if (contentEl) contentEl.innerHTML = fiche.contenuHtml || "";

    if (sourcesEl) {
      var src = sourcesHtml(fiche.source);
      sourcesEl.innerHTML =
        "<h2>Sources</h2>" +
        "<p>Information reformulée à partir de&nbsp;:</p>" +
        "<ul>" + src + "</ul>" +
        '<a class="btn btn--ghost fx-detail__back" href="index.html#recherche-logement">' +
        "← Toutes les fiches</a>";
    }
  }

  /* ======================================================================
     Aiguillage
     ====================================================================== */
  var app = document.getElementById("fx-app");
  var detail = document.getElementById("fx-detail");
  if (app) initMoteur(app);
  if (detail) initDetail(detail);
})();
