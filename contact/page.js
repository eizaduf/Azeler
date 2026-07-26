/* =========================================================================
   AZELER — Formulaire « Nous contacter » (envoi SIMULÉ)
   -------------------------------------------------------------------------
   Aucun back-end : à la soumission, on valide, on affiche une confirmation
   et on N'ENVOIE rien. Pour un envoi réel plus tard, brancher un service
   sans serveur type Formspree : renseigner FORMSPREE_ENDPOINT ci-dessous et
   décommenter le bloc fetch(). Le site reste 100% statique.
   ========================================================================= */
(function () {
  "use strict";

  var FORMSPREE_ENDPOINT = ""; // ex. "https://formspree.io/f/xxxxxxx" (vide = mode simulé)

  var form = document.getElementById("contact-form");
  var confirm = document.getElementById("contact-confirm");
  var errorEl = document.getElementById("ct-error");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var message = form.message.value.trim();
    var prenom = form.prenom.value.trim();
    var contact = form.contact.value.trim();
    var rgpd = form.rgpd.checked;

    // Validation minimale des champs obligatoires
    if (!message || !prenom || !contact || !rgpd) {
      if (errorEl) errorEl.hidden = false;
      var firstInvalid = !message ? form.message : (!prenom ? form.prenom : (!contact ? form.contact : form.rgpd));
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      return;
    }
    if (errorEl) errorEl.hidden = true;

    // Thématiques cochées
    var sujets = Array.prototype.slice
      .call(form.querySelectorAll('input[name="sujets"]:checked'))
      .map(function (c) { return c.value; });

    /* --- Envoi réel (optionnel) : à activer avec un endpoint Formspree ---
    if (FORMSPREE_ENDPOINT) {
      fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
    }
    -------------------------------------------------------------------- */

    // Confirmation à l'écran (mode simulé)
    var recap = sujets.length
      ? "On a bien noté que ça concerne : " + sujets.join(", ") + "."
      : "On a bien reçu ton message.";
    var textEl = confirm.querySelector(".ct-confirm__text");
    if (textEl) {
      textEl.textContent = "Merci " + prenom + ". " + recap +
        " On te recontacte au plus vite sur ce que tu nous as laissé. Prends soin de toi.";
    }

    form.hidden = true;
    confirm.hidden = false;
    confirm.scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
