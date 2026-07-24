/* ============================================================
   Kit d'hygiène — validation + simulation d'envoi (Terminal 5)
   Pas de back-end : on valide en JS, on simule l'envoi, puis
   on affiche un message de confirmation.

   ➜ POUR BRANCHER UN VRAI ENVOI PLUS TARD (Formspree, gratuit) :
   1. Crée un formulaire sur https://formspree.io → tu obtiens un
      identifiant, ex. « xxxxabcd ».
   2. Sur la balise <form> de index.html, ajoute :
        action="https://formspree.io/f/xxxxabcd"  method="POST"
   3. Remplace, dans la fonction submit ci-dessous, le bloc
      « SIMULATION » par un vrai appel réseau :

        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (!res.ok) throw new Error('Envoi refusé');

      (garder ensuite l'affichage de #form-success).
   Autres services équivalents : Getform, Basin, Web3Forms.
   ============================================================ */

(function () {
  'use strict';

  const form = document.getElementById('kit-form');
  if (!form) return;

  const successBox = document.getElementById('form-success');
  const submitBtn  = document.getElementById('form-submit');
  const resetBtn   = document.getElementById('form-reset');

  /* --- Affichage / effacement des erreurs --- */
  function setError(name, message) {
    const errEl = form.querySelector('[data-error-for="' + name + '"]');
    if (errEl) errEl.textContent = message || '';
    // On remonte au conteneur .field pour la bordure rouge
    const field = errEl ? errEl.closest('.field') : null;
    if (field) field.classList.toggle('has-error', Boolean(message));
  }

  function clearAllErrors() {
    form.querySelectorAll('.field__error').forEach(function (el) { el.textContent = ''; });
    form.querySelectorAll('.has-error').forEach(function (el) { el.classList.remove('has-error'); });
  }

  /* --- Bascule adresse / point de retrait --- */
  const livraisonRadios = form.querySelectorAll('input[name="livraison"]');
  const blocs = form.querySelectorAll('.livraison-bloc');

  function updateLivraison() {
    const choix = form.querySelector('input[name="livraison"]:checked');
    const val = choix ? choix.value : 'adresse';
    blocs.forEach(function (b) { b.hidden = (b.dataset.livraison !== val); });
  }
  livraisonRadios.forEach(function (r) { r.addEventListener('change', updateLivraison); });
  updateLivraison();

  /* --- Validation complète --- */
  function validate() {
    clearAllErrors();
    let firstInvalid = null;
    const fail = function (name, msg, el) {
      setError(name, msg);
      if (!firstInvalid) firstInvalid = el || form.querySelector('#' + name);
    };

    // Prénom
    const prenom = form.prenom.value.trim();
    if (!prenom) fail('prenom', 'Dis-nous au moins ton prénom.');

    // Ville
    if (form.ville && !form.ville.value.trim()) {
      fail('ville', 'Indique ta ville pour qu\'on organise la remise du kit.');
    }

    // Contact : e-mail OU téléphone (au moins un, et valide)
    const email = form.email.value.trim();
    const tel   = form.telephone.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // Au moins 6 chiffres pour un téléphone plausible
    const telOk = (tel.replace(/\D/g, '').length >= 6);

    if (!email && !tel) {
      fail('contact', 'Laisse-nous un e-mail OU un téléphone pour te répondre.', form.email);
    } else if (email && !emailOk) {
      fail('contact', "Cette adresse e-mail ne semble pas valide.", form.email);
    } else if (!email && tel && !telOk) {
      fail('contact', 'Ce numéro de téléphone semble trop court.', form.telephone);
    }

    // Livraison : adresse OU point de retrait rempli
    const mode = form.querySelector('input[name="livraison"]:checked').value;
    if (mode === 'adresse' && !form.adresse.value.trim()) {
      fail('livraison', 'Indique ton adresse d’envoi.', form.adresse);
    } else if (mode === 'retrait' && !form.retrait.value.trim()) {
      fail('livraison', 'Indique une ville ou un quartier de retrait.', form.retrait);
    }

    // Contenu : au moins une case
    const contenu = form.querySelectorAll('input[name="contenu"]:checked');
    if (contenu.length === 0) {
      fail('contenu', 'Coche au moins un élément pour ton kit.');
    }

    // Consentement RGPD obligatoire
    if (!form.consentement.checked) {
      fail('consentement', 'On a besoin de ton accord pour t’envoyer le kit.', form.consentement);
    }

    return firstInvalid;
  }

  /* --- Soumission --- */
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const firstInvalid = validate();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // ---------- SIMULATION D'ENVOI (à remplacer par un vrai fetch, cf. en-tête) ----------
    submitBtn.disabled = true;
    const label = submitBtn.textContent;
    submitBtn.textContent = 'Envoi en cours…';

    // Pour vérifier ce qui « partirait » réellement :
    console.log('[kit-hygiene] Données simulées :', Object.fromEntries(new FormData(form).entries()));

    await new Promise(function (r) { setTimeout(r, 700); }); // faux délai réseau
    // -------------------------------------------------------------------------------------

    submitBtn.textContent = label;
    submitBtn.disabled = false;

    // Confirmation
    form.hidden = true;
    successBox.hidden = false;
    successBox.focus && successBox.focus();
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  /* --- Nouvelle demande --- */
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      clearAllErrors();
      updateLivraison();
      successBox.hidden = true;
      form.hidden = false;
      form.prenom.focus();
    });
  }
})();
