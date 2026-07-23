/* =========================================================================
   AZELER — Logique de la page ÉPICERIES (Terminal 4)
   Carte Leaflet + OpenStreetMap, recherche par ville/code postal, liste.
   Fonctionne même si Leaflet ne charge pas (fallback liste seule).
   ========================================================================= */
(function () {
  "use strict";

  var DATA = window.AZELER_EPICERIES || [];
  var searchEl = document.getElementById("epi-search");
  var countEl = document.getElementById("epi-count");
  var listEl = document.getElementById("epi-list");
  var mapEl = document.getElementById("epi-map");
  var fallbackEl = document.getElementById("epi-fallback");

  var map = null;
  var markers = [];      // { marker, item }
  var hasLeaflet = typeof window.L !== "undefined" && mapEl;

  // --- Échappement HTML minimal (les données viennent d'un fichier local,
  //     mais on reste propre) -------------------------------------------------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // --- Initialisation de la carte -------------------------------------------
  function initMap() {
    if (!hasLeaflet) {
      if (mapEl) mapEl.style.display = "none";
      if (fallbackEl) fallbackEl.style.display = "block";
      return;
    }
    try {
      map = L.map(mapEl, { scrollWheelZoom: false }).setView([48.8566, 2.3522], 11);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      DATA.forEach(function (item) {
        if (typeof item.lat !== "number" || typeof item.lng !== "number") return;
        var m = L.marker([item.lat, item.lng]).addTo(map);
        m.bindPopup(
          '<div class="epi-pop__nom">' + esc(item.nom) + "</div>" +
          '<div class="epi-pop__line">' + esc(item.adresse) + ", " + esc(item.codePostal) + " " + esc(item.ville) + "</div>" +
          (item.horaires ? '<div class="epi-pop__line">🕑 ' + esc(item.horaires) + "</div>" : "") +
          (item.telephone ? '<div class="epi-pop__line">📞 ' + esc(item.telephone) + "</div>" : "")
        );
        markers.push({ marker: m, item: item });
      });

      fitTo(DATA);
      // Recalage après rendu (utile si le conteneur était masqué)
      setTimeout(function () { map.invalidateSize(); }, 200);
    } catch (e) {
      // La carte a planté → on bascule en mode liste seule
      hasLeaflet = false;
      if (mapEl) mapEl.style.display = "none";
      if (fallbackEl) fallbackEl.style.display = "block";
    }
  }

  // --- Ajuste la vue de la carte aux résultats visibles ---------------------
  function fitTo(items) {
    if (!map) return;
    var pts = items
      .filter(function (i) { return typeof i.lat === "number" && typeof i.lng === "number"; })
      .map(function (i) { return [i.lat, i.lng]; });
    if (pts.length === 1) {
      map.setView(pts[0], 14);
    } else if (pts.length > 1) {
      map.fitBounds(pts, { padding: [40, 40] });
    }
  }

  // --- Filtre selon la recherche (ville OU code postal) ---------------------
  function filtrer(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) return DATA.slice();
    return DATA.filter(function (i) {
      return (
        String(i.ville).toLowerCase().indexOf(q) !== -1 ||
        String(i.codePostal).toLowerCase().indexOf(q) !== -1 ||
        String(i.nom).toLowerCase().indexOf(q) !== -1
      );
    });
  }

  // --- Rendu de la liste sous la carte --------------------------------------
  function rendreListe(items) {
    if (!listEl) return;
    if (!items.length) {
      listEl.innerHTML = '<p class="epi-empty">Aucune épicerie ne correspond à ta recherche. Essaie une autre ville ou un autre code postal.</p>';
    } else {
      listEl.innerHTML = items.map(function (i) {
        var tel = i.telephone
          ? '<div class="epi-item__row"><span class="ic">📞</span><a href="tel:' + esc(i.telephone.replace(/\s+/g, "")) + '">' + esc(i.telephone) + "</a></div>"
          : "";
        var hor = i.horaires
          ? '<div class="epi-item__row"><span class="ic">🕑</span><span>' + esc(i.horaires) + "</span></div>"
          : "";
        return (
          '<article class="epi-item" data-lat="' + esc(i.lat) + '" data-lng="' + esc(i.lng) + '">' +
            '<h3 class="epi-item__nom">' + esc(i.nom) + "</h3>" +
            '<div class="epi-item__row"><span class="ic">📍</span><span>' +
              esc(i.adresse) + ", " + esc(i.codePostal) + " " + esc(i.ville) + "</span></div>" +
            hor + tel +
          "</article>"
        );
      }).join("");

      // Clic sur un item → centre la carte sur l'épicerie
      if (hasLeaflet && map) {
        Array.prototype.forEach.call(listEl.querySelectorAll(".epi-item"), function (el) {
          el.style.cursor = "pointer";
          el.addEventListener("click", function () {
            var lat = parseFloat(el.getAttribute("data-lat"));
            var lng = parseFloat(el.getAttribute("data-lng"));
            if (!isNaN(lat) && !isNaN(lng)) {
              map.setView([lat, lng], 15);
              var found = markers.filter(function (m) { return m.item.lat === lat && m.item.lng === lng; })[0];
              if (found) found.marker.openPopup();
              mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          });
        });
      }
    }

    if (countEl) {
      countEl.textContent = items.length + (items.length > 1 ? " épiceries" : " épicerie");
    }
  }

  // --- Applique la recherche à la carte + la liste --------------------------
  function appliquer() {
    var items = filtrer(searchEl ? searchEl.value : "");
    rendreListe(items);
    if (hasLeaflet && map) {
      markers.forEach(function (m) {
        var visible = items.indexOf(m.item) !== -1;
        if (visible) { m.marker.addTo(map); } else { map.removeLayer(m.marker); }
      });
      fitTo(items);
    }
  }

  // --- Démarrage ------------------------------------------------------------
  initMap();
  rendreListe(DATA);
  if (searchEl) {
    searchEl.addEventListener("input", appliquer);
    searchEl.addEventListener("keydown", function (e) { if (e.key === "Enter") e.preventDefault(); });
  }
})();
