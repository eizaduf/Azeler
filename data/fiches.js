/* =========================================================================
   AZELER — DONNÉES DES FICHES D'INFORMATION « LOGEMENT & DROITS »
   -------------------------------------------------------------------------
   Chaque fiche alimente le moteur de recherche (fiches/index.html) et sa
   page de détail générée (fiches/fiche.html?f=SLUG).

   Champs d'une fiche :
     slug        : identifiant court unique (sert à l'URL de la page de détail)
     titre       : titre affiché
     theme       : thématique (sert aux filtres et aux puces de recherche)
     emoji       : petite icône de la carte (décoratif)
     resume      : 1 à 2 phrases affichées sur la carte de résultat
     contenuHtml : le contenu reformulé (HTML), lu par la page de détail
     source      : tableau de { nom, url } — sources officielles à citer

   IMPORTANT : les contenus sont REFORMULÉS avec nos propres mots à partir de
   sources publiques (ANIL, service-public.fr, CAF, Action Logement…). Ce ne
   sont pas des copier-coller. Les règles chiffrées (préavis, dépôt de
   garantie…) reprennent le droit commun en vigueur ; vérifie toujours ta
   situation précise auprès d'une ADIL (conseil gratuit et neutre).

   Informations vérifiées le 24 juillet 2026.
   ========================================================================= */
window.AZELER_FICHES = [

  /* ------------------------------------------------------------------ */
  {
    slug: "premiere-location",
    titre: "Ta première location : par où commencer",
    theme: "Accès au logement",
    emoji: "🔑",
    resume: "Le budget à prévoir, les pièces à réunir et les pièges à éviter avant de signer ton premier bail.",
    contenuHtml: `
      <p class="lead">Louer ton premier logement, ça se prépare. Avant de visiter, mets au clair ton budget et ton dossier : tu iras plus vite et tu éviteras les mauvaises surprises.</p>

      <h2 class="mt-3">1. Calcule ton budget réel</h2>
      <p>Le loyer n'est jamais la seule dépense. Prévois aussi :</p>
      <ul>
        <li>les <strong>charges</strong> (eau, entretien des parties communes…) ;</li>
        <li>le <strong>dépôt de garantie</strong> versé à l'entrée (souvent 1 mois de loyer hors charges) ;</li>
        <li>l'<strong>assurance habitation</strong>, obligatoire ;</li>
        <li>l'abonnement <strong>énergie</strong> (électricité, parfois gaz) et internet ;</li>
        <li>d'éventuels <strong>frais d'agence</strong>, encadrés par la loi.</li>
      </ul>
      <div class="conseil-box">
        <strong>Règle utile :</strong> vise un loyer + charges qui ne dépasse pas environ un tiers de tes ressources. En dessous, tu respires ; au-dessus, le moindre imprévu fait mal.
      </div>

      <h2 class="mt-3">2. Prépare ton dossier</h2>
      <p>Un dossier complet et clair te fait gagner la place. Réunis en général :</p>
      <ul>
        <li>une <strong>pièce d'identité</strong> ;</li>
        <li>un <strong>justificatif de ressources</strong> (contrat, bulletins de salaire, attestation de bourse, notification de prestations…) ;</li>
        <li>un <strong>justificatif de domicile</strong> ou une attestation d'hébergement ;</li>
        <li>ta <strong>garantie</strong> : un garant, ou mieux, la garantie <strong>Visale</strong> (gratuite).</li>
      </ul>
      <div class="danger-box">
        <strong>Un propriétaire ne peut pas tout te demander.</strong> Certaines pièces sont interdites (photo d'identité imposée, relevé de compte, dossier médical, attestation de l'employeur signée…). Si on te les réclame, tu peux refuser.
      </div>

      <h2 class="mt-3">3. Avant de signer</h2>
      <ul>
        <li>Visite en journée, vérifie l'état, les fenêtres, l'humidité, le chauffage.</li>
        <li>Lis le <strong>bail</strong> en entier et garde-en une copie signée.</li>
        <li>Fais un <strong>état des lieux</strong> précis (voir la fiche dédiée).</li>
        <li>Ne verse jamais d'argent « pour réserver » avant d'avoir un bail signé.</li>
      </ul>
    `,
    source: [
      { nom: "ANIL — Agence nationale pour l'information sur le logement", url: "https://www.anil.org/" },
      { nom: "Service-public.fr — Location d'un logement", url: "https://www.service-public.fr/particuliers/vosdroits/N19806" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "bail-location",
    titre: "Comprendre ton bail de location",
    theme: "Bail & contrat",
    emoji: "📝",
    resume: "Durée, préavis, loyer, meublé ou vide : les points clés du contrat que tu signes.",
    contenuHtml: `
      <p class="lead">Le bail (ou « contrat de location ») fixe les règles entre toi et le propriétaire. Une fois signé, il t'engage : autant bien le comprendre.</p>

      <h2 class="mt-3">Vide ou meublé, quelle différence ?</h2>
      <table class="fiche-table">
        <thead><tr><th></th><th>Logement vide</th><th>Logement meublé</th></tr></thead>
        <tbody>
          <tr><td>Durée du bail</td><td>3 ans (bailleur particulier)</td><td>1 an (ou 9 mois pour un·e étudiant·e)</td></tr>
          <tr><td>Ton préavis pour partir</td><td>3 mois, ou 1 mois en zone tendue</td><td>1 mois</td></tr>
          <tr><td>Dépôt de garantie</td><td>1 mois de loyer max (hors charges)</td><td>2 mois de loyer max (hors charges)</td></tr>
        </tbody>
      </table>

      <h2 class="mt-3">Ce que le bail doit contenir</h2>
      <ul>
        <li>l'identité du propriétaire et la tienne ;</li>
        <li>l'adresse et la description du logement ;</li>
        <li>le <strong>montant du loyer</strong>, les modalités de révision et les charges ;</li>
        <li>le montant du <strong>dépôt de garantie</strong> ;</li>
        <li>la date de début et la durée.</li>
      </ul>

      <h2 class="mt-3">Donner ton congé</h2>
      <p>Pour partir, tu envoies une <strong>lettre recommandée avec accusé de réception</strong> (ou remise en main propre contre signature, ou par huissier). Le préavis démarre à la réception de la lettre. En <strong>zone tendue</strong>, ou dans certains cas (mutation, perte d'emploi, problème de santé, premier emploi…), le préavis d'un logement vide tombe à 1 mois.</p>

      <div class="conseil-box">
        Un doute sur une clause ? L'<strong>ADIL</strong> de ton département répond gratuitement, sans te vendre quoi que ce soit.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — Contrat de location (bail)", url: "https://www.service-public.fr/particuliers/vosdroits/F1305" },
      { nom: "ANIL — Le contrat de location", url: "https://www.anil.org/" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "depot-garantie",
    titre: "Le dépôt de garantie (la « caution »)",
    theme: "Bail & contrat",
    emoji: "💳",
    resume: "Combien tu verses à l'entrée, et comment tu récupères ton argent quand tu pars.",
    contenuHtml: `
      <p class="lead">Le dépôt de garantie est la somme que tu verses au propriétaire à l'entrée. Il sert à couvrir d'éventuels impayés ou dégradations. Ce n'est pas un cadeau : tu dois le récupérer en partant.</p>

      <h2 class="mt-3">Combien ?</h2>
      <ul>
        <li><strong>Logement vide :</strong> 1 mois de loyer maximum (hors charges).</li>
        <li><strong>Logement meublé :</strong> 2 mois de loyer maximum (hors charges).</li>
      </ul>
      <p>Le montant est inscrit dans le bail et ne peut pas augmenter en cours de route.</p>

      <h2 class="mt-3">Quand te le rend-on ?</h2>
      <ul>
        <li><strong>1 mois</strong> après ton départ si l'état des lieux de sortie est identique à celui d'entrée ;</li>
        <li><strong>2 mois</strong> si le propriétaire retient des sommes (réparations, loyers dus). Il doit alors te fournir des justificatifs (devis, factures).</li>
      </ul>

      <div class="danger-box">
        <strong>Retard de restitution ?</strong> Passé le délai, le propriétaire te doit une majoration (l'équivalent de 10 % du loyer mensuel hors charges par mois de retard commencé). Envoie-lui d'abord une lettre recommandée de relance.
      </div>

      <div class="conseil-box">
        Pas assez d'argent pour avancer le dépôt ? Regarde l'<strong>avance Loca-Pass</strong> et le <strong>FSL</strong> (fiches dédiées) : ils peuvent le financer.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — Dépôt de garantie d'un logement", url: "https://www.service-public.fr/particuliers/vosdroits/F31269" },
      { nom: "ANIL — Le dépôt de garantie", url: "https://www.anil.org/" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "etat-des-lieux",
    titre: "L'état des lieux d'entrée et de sortie",
    theme: "Bail & contrat",
    emoji: "🔍",
    resume: "Le document qui protège ta caution : comment bien le remplir pour éviter les litiges au départ.",
    contenuHtml: `
      <p class="lead">L'état des lieux décrit le logement, pièce par pièce, à ton arrivée puis à ton départ. C'est ce qui protège ton dépôt de garantie : sans lui, tout se joue à la parole.</p>

      <h2 class="mt-3">À l'entrée : sois précis·e</h2>
      <ul>
        <li>Note <strong>tout</strong> ce qui est abîmé : trace, tache, rayure, fissure, robinet qui fuit, prise cassée.</li>
        <li>Prends des <strong>photos datées</strong> et garde-les.</li>
        <li>Relève les <strong>compteurs</strong> (électricité, gaz, eau).</li>
        <li>Vérifie que tout fonctionne (chauffage, volets, serrures).</li>
      </ul>
      <p>Tu as oublié quelque chose ? Tu peux compléter l'état des lieux dans les <strong>10 jours</strong> suivant ton entrée (et pendant le premier mois de chauffe pour le chauffage).</p>

      <h2 class="mt-3">À la sortie</h2>
      <p>On compare avec l'état des lieux d'entrée. Le propriétaire ne peut te facturer que les dégradations que <em>tu</em> as causées — pas l'usure normale (peinture qui vieillit, moquette usée par le temps…).</p>

      <div class="conseil-box">
        <strong>Astuce :</strong> ne signe jamais un état des lieux à la va-vite. Prends ton temps, relis, et n'accepte pas la mention « bon état » si ce n'est pas vrai.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — État des lieux d'un logement", url: "https://www.service-public.fr/particuliers/vosdroits/F1306" },
      { nom: "ANIL — L'état des lieux", url: "https://www.anil.org/" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "visale-garant",
    titre: "Visale : un garant gratuit quand tu n'en as pas",
    theme: "Garanties & caution",
    emoji: "🛡️",
    resume: "Action Logement se porte garant à ta place, gratuitement. Idéal quand tu n'as personne pour se porter caution.",
    contenuHtml: `
      <p class="lead">Beaucoup de propriétaires demandent un garant (une personne qui paie si tu ne peux plus). Pas de proche pour ça ? <strong>Visale</strong> le fait à ta place, <strong>gratuitement</strong>.</p>

      <h2 class="mt-3">C'est quoi, concrètement ?</h2>
      <p>Visale est une garantie proposée par <strong>Action Logement</strong>. Si tu ne peux plus payer ton loyer, Visale avance l'argent au propriétaire, puis tu rembourses ensuite selon un échéancier adapté. Pour le propriétaire, c'est une sécurité ; pour toi, c'est un garant solide sans avoir à demander à un proche.</p>

      <h2 class="mt-3">Qui peut en bénéficier ?</h2>
      <ul>
        <li>les <strong>jeunes de 18 à 30 ans</strong> (quel que soit leur statut : étudiant·e, salarié·e, en recherche d'emploi, en alternance…) ;</li>
        <li>les salarié·es de plus de 30 ans dans certaines situations (embauche récente, revenus modestes) ;</li>
        <li>les personnes accompagnées par une structure d'intermédiation locative.</li>
      </ul>

      <h2 class="mt-3">Comment l'obtenir ?</h2>
      <ol>
        <li>Crée ton dossier sur le site <strong>visale.fr</strong> avant de signer le bail.</li>
        <li>Tu reçois un <strong>visa</strong> (une attestation) à présenter au propriétaire.</li>
        <li>Une fois le logement trouvé, tu finalises le contrat de cautionnement en ligne.</li>
      </ol>

      <div class="conseil-box">
        Fais ta demande <strong>tôt</strong> : le visa te rend crédible dès la visite. C'est un vrai atout face à d'autres candidat·es.
      </div>
    `,
    source: [
      { nom: "Visale — Action Logement", url: "https://www.visale.fr/" },
      { nom: "Service-public.fr — Garantie Visale", url: "https://www.service-public.fr/particuliers/vosdroits/F33453" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "loca-pass",
    titre: "L'avance Loca-Pass pour payer le dépôt de garantie",
    theme: "Garanties & caution",
    emoji: "🏦",
    resume: "Un prêt à 0 % d'Action Logement pour avancer ta caution d'entrée, remboursable en douceur.",
    contenuHtml: `
      <p class="lead">Le dépôt de garantie te bloque parce que tu ne l'as pas d'avance ? L'<strong>avance Loca-Pass</strong> te le prête à <strong>taux zéro</strong>.</p>

      <h2 class="mt-3">Le principe</h2>
      <ul>
        <li>C'est un <strong>prêt sans intérêt</strong> d'Action Logement qui finance le dépôt de garantie de ton nouveau logement.</li>
        <li>Tu le rembourses ensuite par petites mensualités, sur plusieurs mois.</li>
        <li>Il n'y a <strong>pas de frais</strong> de dossier.</li>
      </ul>

      <h2 class="mt-3">Pour qui ?</h2>
      <ul>
        <li>les <strong>jeunes de moins de 30 ans</strong> (en formation, en recherche d'emploi, en poste…) ;</li>
        <li>les <strong>salarié·es</strong> du secteur privé, sous conditions.</li>
      </ul>

      <h2 class="mt-3">Comment faire ?</h2>
      <p>La demande se fait en ligne sur le site d'Action Logement, en général <strong>avant ou juste après</strong> ton entrée dans le logement (respecte le délai indiqué). Prépare ton bail et un justificatif de ressources.</p>

      <div class="conseil-box">
        Loca-Pass et <strong>Visale</strong> sont deux dispositifs différents mais complémentaires : l'un t'avance la caution, l'autre te sert de garant. Tu peux viser les deux.
      </div>
    `,
    source: [
      { nom: "Action Logement — Avance Loca-Pass", url: "https://www.actionlogement.fr/l-avance-loca-pass" },
      { nom: "Service-public.fr — Aides Loca-Pass", url: "https://www.service-public.fr/particuliers/vosdroits/F18490" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "apl-caf",
    titre: "Les aides au logement de la CAF (APL, ALS, ALF)",
    theme: "Aides financières",
    emoji: "💶",
    resume: "Une aide mensuelle qui réduit ton loyer, calculée selon tes ressources. À demander dès l'entrée.",
    contenuHtml: `
      <p class="lead">La CAF (ou la MSA) peut te verser chaque mois une aide qui allège ton loyer. Beaucoup de jeunes y ont droit sans le savoir : fais la simulation.</p>

      <h2 class="mt-3">Trois aides, une seule à la fois</h2>
      <ul>
        <li><strong>APL</strong> (aide personnalisée au logement) : pour les logements « conventionnés ».</li>
        <li><strong>ALS</strong> (allocation de logement sociale) : souvent celle des jeunes et étudiant·es.</li>
        <li><strong>ALF</strong> (allocation de logement familiale) : selon la situation familiale.</li>
      </ul>
      <p>Tu n'as pas à choisir : la CAF détermine automatiquement celle qui te correspond. On n'en touche qu'<strong>une seule</strong>.</p>

      <h2 class="mt-3">Comment ça marche ?</h2>
      <ul>
        <li>Le montant dépend surtout de tes <strong>ressources</strong>, de ton <strong>loyer</strong> et du lieu du logement.</li>
        <li>L'aide peut t'être versée directement, ou versée au propriétaire qui déduit d'autant ton loyer.</li>
        <li>Fais la demande <strong>dès ton entrée</strong> : l'aide n'est pas rétroactive, chaque mois de retard est perdu.</li>
      </ul>

      <div class="conseil-box">
        Fais d'abord une <strong>simulation gratuite</strong> sur caf.fr, puis dépose ta demande en ligne. Garde ton bail et ton RIB sous la main.
      </div>

      <div class="danger-box">
        Ta situation change (déménagement, revenus, colocation) ? <strong>Signale-le vite</strong> à la CAF. Un oubli peut entraîner un trop-perçu à rembourser.
      </div>
    `,
    source: [
      { nom: "CAF — Les aides au logement", url: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement" },
      { nom: "Service-public.fr — Aides personnelles au logement", url: "https://www.service-public.fr/particuliers/vosdroits/N20360" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fsl",
    titre: "Le Fonds de solidarité pour le logement (FSL)",
    theme: "Aides financières",
    emoji: "🤝",
    resume: "Une aide de ton département pour entrer dans un logement ou éviter de le perdre : caution, premier loyer, dettes, énergie.",
    contenuHtml: `
      <p class="lead">Le <strong>FSL</strong> est une aide gérée par ton <strong>département</strong>. Il aide à la fois à <em>entrer</em> dans un logement et à <em>s'y maintenir</em> quand ça devient dur.</p>

      <h2 class="mt-3">Ce que le FSL peut financer</h2>
      <ul>
        <li>le <strong>dépôt de garantie</strong> et le premier loyer ;</li>
        <li>les <strong>frais d'installation</strong> (déménagement, ouverture des compteurs, assurance) ;</li>
        <li>des <strong>dettes de loyer</strong> pour éviter une expulsion ;</li>
        <li>des <strong>factures d'énergie ou d'eau</strong> impayées.</li>
      </ul>
      <p>Selon les cas, l'aide prend la forme d'une <strong>subvention</strong> (tu ne rembourses pas) ou d'un <strong>prêt</strong> sans intérêt.</p>

      <h2 class="mt-3">Comment le demander ?</h2>
      <p>Les règles varient d'un département à l'autre. Le plus simple : passe par un <strong>travailleur social</strong> (service social du département, CCAS, Mission Locale, association). Il monte le dossier avec toi et sait où l'envoyer.</p>

      <div class="conseil-box">
        Sortie de l'ASE ? Ton ancien référent ou le service jeunes majeurs du département peut t'aider à activer le FSL. N'hésite pas à le solliciter.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — Fonds de solidarité pour le logement (FSL)", url: "https://www.service-public.fr/particuliers/vosdroits/F1334" },
      { nom: "ANIL — Le FSL", url: "https://www.anil.org/" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "logement-social",
    titre: "Demander un logement social (HLM)",
    theme: "Accès au logement",
    emoji: "🏢",
    resume: "Un loyer plus bas et durable. La demande est gratuite et se renouvelle chaque année.",
    contenuHtml: `
      <p class="lead">Le logement social propose des loyers plus bas que le privé. Les délais peuvent être longs, mais la démarche est <strong>gratuite</strong> : plus tôt tu la lances, mieux c'est.</p>

      <h2 class="mt-3">Faire ta demande</h2>
      <ul>
        <li>Enregistre ta demande en ligne sur le portail national de la demande de logement social.</li>
        <li>Tu reçois un <strong>numéro unique d'enregistrement</strong> : garde-le précieusement, il prouve la date de ta demande.</li>
        <li><strong>Renouvelle</strong> ta demande chaque année, sinon elle est annulée.</li>
      </ul>

      <h2 class="mt-3">Bon à savoir</h2>
      <ul>
        <li>L'accès dépend de tes <strong>ressources</strong> (elles ne doivent pas dépasser un plafond) et de ta situation.</li>
        <li>Les <strong>jeunes en insertion</strong> et les personnes en difficulté peuvent être prioritaires selon les territoires.</li>
        <li>Tu peux préciser les communes et types de logement souhaités.</li>
      </ul>

      <div class="conseil-box">
        Blocage total malgré une situation difficile et des démarches sérieuses ? Renseigne-toi sur le recours <strong>DALO</strong> (droit au logement opposable) auprès d'un travailleur social ou de l'ADIL.
      </div>
    `,
    source: [
      { nom: "Demande de logement social — Service public", url: "https://www.demande-logement-social.gouv.fr/" },
      { nom: "Service-public.fr — Demande de logement social (HLM)", url: "https://www.service-public.fr/particuliers/vosdroits/F869" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "fjt-habitat-jeunes",
    titre: "Les FJT / Habitat Jeunes",
    theme: "Jeunes & logement",
    emoji: "🏘️",
    resume: "Un logement meublé temporaire, à prix modéré, avec un accompagnement, pour les 16-30 ans.",
    contenuHtml: `
      <p class="lead">Les <strong>Foyers de Jeunes Travailleurs</strong> (FJT), aujourd'hui souvent appelés <strong>Habitat Jeunes</strong>, proposent un logement meublé, abordable et temporaire, pensé pour les jeunes en mouvement.</p>

      <h2 class="mt-3">Pour qui et pourquoi ?</h2>
      <ul>
        <li>En général pour les <strong>16-30 ans</strong> : en emploi, alternance, formation, stage, service civique ou premier logement.</li>
        <li>Idéal quand tu commences un travail ou une formation loin de chez toi, ou pour une <strong>première autonomie</strong> en douceur.</li>
      </ul>

      <h2 class="mt-3">Ce que ça t'apporte</h2>
      <ul>
        <li>un <strong>logement meublé</strong> (studio ou chambre), prêt à vivre ;</li>
        <li>une <strong>redevance</strong> tout compris (loyer + charges + services), souvent éligible aux aides de la CAF ;</li>
        <li>un <strong>accompagnement</strong> : aide aux démarches, vie collective, parfois restauration.</li>
      </ul>

      <div class="conseil-box">
        Les places sont recherchées : contacte les structures de ta ville <strong>en avance</strong>. L'union nationale (UNHAJ) et ta Mission Locale peuvent t'orienter vers le foyer le plus proche.
      </div>
    `,
    source: [
      { nom: "UNHAJ — Union nationale pour l'habitat des jeunes", url: "https://www.unhaj.org/" },
      { nom: "Service-public.fr — Logement des jeunes (FJT)", url: "https://www.service-public.fr/particuliers/vosdroits/F13539" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "colocation",
    titre: "La colocation : bail, loyer et clause de solidarité",
    theme: "Colocation & partage",
    emoji: "🧑‍🤝‍🧑",
    resume: "Partager un logement coûte moins cher, mais attention à la clause de solidarité. Ce qu'il faut vérifier avant de signer.",
    contenuHtml: `
      <p class="lead">La colocation permet de vivre dans un plus grand logement pour moins cher. Mais le type de bail change beaucoup tes responsabilités : lis bien avant de signer.</p>

      <h2 class="mt-3">Un bail unique ou un bail par personne ?</h2>
      <ul>
        <li><strong>Bail unique</strong> (un seul contrat pour tous) : c'est le plus courant. Attention à la <strong>clause de solidarité</strong> ci-dessous.</li>
        <li><strong>Baux individuels</strong> (un contrat par colocataire) : chacun ne répond que de sa part et de sa chambre. Plus protecteur, mais plus rare.</li>
      </ul>

      <div class="danger-box">
        <strong>La clause de solidarité</strong> signifie que si un·e colocataire ne paie pas, le propriétaire peut réclamer la totalité aux autres. Vérifie si elle est présente, et pour combien de temps elle continue après le départ d'un·e coloc.
      </div>

      <h2 class="mt-3">Quitter une colocation</h2>
      <ul>
        <li>Tu donnes ton congé avec le <strong>même préavis</strong> qu'une location classique (souvent 1 mois en meublé ou zone tendue).</li>
        <li>Après ton départ, la clause de solidarité peut te lier encore un temps, sauf si un·e remplaçant·e te succède. Note bien cette date.</li>
      </ul>

      <div class="conseil-box">
        Chacun·e peut faire sa <strong>propre demande d'aide au logement</strong> à la CAF pour sa part de loyer. Pense-y : ça allège la facture de tout le monde.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — La colocation", url: "https://www.service-public.fr/particuliers/vosdroits/F1338" },
      { nom: "ANIL — La colocation", url: "https://www.anil.org/" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "droits-locataire",
    titre: "Tes droits de locataire au quotidien",
    theme: "Droits & litiges",
    emoji: "⚖️",
    resume: "Réparations, quittance, préavis, visite du propriétaire : ce que la loi t'autorise et ce qu'elle interdit.",
    contenuHtml: `
      <p class="lead">Une fois installé·e, tu as des droits que le propriétaire doit respecter. En connaître les grandes lignes t'évite de te laisser marcher dessus.</p>

      <h2 class="mt-3">Ce à quoi tu as droit</h2>
      <ul>
        <li>Un logement <strong>décent</strong> et en bon état d'usage.</li>
        <li>Une <strong>quittance de loyer gratuite</strong> sur simple demande (preuve que tu paies).</li>
        <li>La <strong>tranquillité</strong> : le propriétaire ne peut pas entrer sans ton accord ni garder un double des clés pour venir quand il veut.</li>
        <li>Un <strong>préavis</strong> respecté et un loyer qui n'augmente que dans les règles prévues au bail.</li>
      </ul>

      <h2 class="mt-3">Qui répare quoi ?</h2>
      <table class="fiche-table">
        <thead><tr><th>À ta charge (locataire)</th><th>À la charge du propriétaire</th></tr></thead>
        <tbody>
          <tr><td>Petit entretien courant, joints, ampoules, petites réparations d'usage</td><td>Grosses réparations, vétusté, toiture, chaudière, mise aux normes</td></tr>
        </tbody>
      </table>

      <div class="conseil-box">
        Un désaccord ? Écris d'abord au propriétaire en <strong>recommandé</strong>. Sans réponse, tu peux saisir gratuitement la <strong>commission départementale de conciliation</strong> ou demander conseil à l'ADIL.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — Droits et obligations du locataire", url: "https://www.service-public.fr/particuliers/vosdroits/N341" },
      { nom: "ANIL — Réparations et entretien", url: "https://www.anil.org/" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "logement-indecent",
    titre: "Logement non décent, humide ou insalubre : que faire",
    theme: "Droits & litiges",
    emoji: "🚨",
    resume: "Moisissures, chauffage HS, danger : tu n'as pas à subir. Les étapes pour faire réagir le propriétaire.",
    contenuHtml: `
      <p class="lead">Un logement doit être <strong>décent</strong> : sûr, sain, avec chauffage, eau, électricité et une surface minimale. Si ce n'est pas le cas, tu peux agir — sans arrêter de payer ton loyer pour autant.</p>

      <h2 class="mt-3">Les étapes</h2>
      <ol>
        <li><strong>Signale par écrit</strong> au propriétaire (lettre recommandée) les problèmes et demande les travaux, avec une date.</li>
        <li>Sans réaction, contacte la <strong>CAF</strong> si tu perçois une aide au logement (elle peut intervenir), et l'<strong>ADIL</strong> pour être conseillé·e.</li>
        <li>En cas de risque pour la santé ou la sécurité (installation dangereuse, plomb, effondrement), alerte le <strong>service d'hygiène de la mairie</strong> ou l'<strong>ARS</strong>.</li>
      </ol>

      <div class="danger-box">
        <strong>Ne cesse pas de payer ton loyer</strong> de ta propre initiative : tu te mettrais en tort. Passe par les voies officielles ou par un juge, qui peut décider d'une baisse ou d'une consignation.
      </div>

      <div class="conseil-box">
        Danger immédiat (fuite de gaz, effondrement, absence de chauffage en plein hiver) ? Mets-toi en sécurité et appelle les secours ou la mairie sans attendre.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — Logement décent", url: "https://www.service-public.fr/particuliers/vosdroits/F2042" },
      { nom: "ANIL — Logement indigne et non décent", url: "https://www.anil.org/" }
    ]
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "logement-jeunes-ase",
    titre: "Se loger quand on sort de l'ASE",
    theme: "Jeunes & logement",
    emoji: "🌱",
    resume: "Contrat jeune majeur, dispositifs prioritaires, garant gratuit : les leviers spécifiques quand on quitte la protection de l'enfance.",
    contenuHtml: `
      <p class="lead">Sortir de l'Aide sociale à l'enfance, c'est souvent devoir se loger vite et seul·e. Tu n'es pas sans ressources : plusieurs dispositifs existent, et certains te donnent la priorité.</p>

      <h2 class="mt-3">Avant la sortie</h2>
      <ul>
        <li>Demande un <strong>contrat jeune majeur</strong> ou un accompagnement « jeune majeur » à ton département : il peut prolonger le soutien après 18 ans, y compris pour le logement.</li>
        <li>Un <strong>entretien de préparation à l'autonomie</strong> doit être proposé avant tes 18 ans : c'est le moment de poser la question du logement.</li>
        <li>Fais dès maintenant ta <strong>demande de logement social</strong> et ta <strong>demande d'aide de la CAF</strong> : les délais sont longs.</li>
      </ul>

      <h2 class="mt-3">Les leviers utiles</h2>
      <ul>
        <li><strong>Visale</strong> comme garant gratuit, et <strong>Loca-Pass</strong> ou <strong>FSL</strong> pour financer la caution.</li>
        <li>Les <strong>FJT / Habitat Jeunes</strong>, souvent adaptés à une première autonomie accompagnée.</li>
        <li>Les jeunes sortant de l'ASE peuvent être <strong>prioritaires</strong> pour certaines aides et logements : fais-le valoir.</li>
        <li>Ta <strong>Mission Locale</strong> et l'<strong>ADEPAPE</strong> de ton département (entraide des anciens de la protection de l'enfance) peuvent t'accompagner.</li>
      </ul>

      <div class="conseil-box">
        Ne reste pas seul·e face aux démarches. Un·e travailleur·se social·e, ta Mission Locale ou une association comme AZELER peuvent monter les dossiers avec toi.
      </div>
    `,
    source: [
      { nom: "Service-public.fr — Sortie de l'aide sociale à l'enfance (jeune majeur)", url: "https://www.service-public.fr/particuliers/vosdroits/F3121" },
      { nom: "ANIL — Le logement des jeunes", url: "https://www.anil.org/" }
    ]
  }

];
