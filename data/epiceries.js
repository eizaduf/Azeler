/* =========================================================================
   AZELER — DONNÉES DES ÉPICERIES SOCIALES, SOLIDAIRES & ANTI-GASPI
   lat/lng = coordonnées GPS (relevées via Nominatim / OpenStreetMap).
   type = "solidaire" | "anti-gaspi" | "destockage"  (sert aux filtres de la carte)

   • solidaire  : accès sur critères sociaux, denrées de 10 % à 30 % de leur valeur.
   • anti-gaspi : ouvert à tous, invendus revalorisés (jusqu'à -30 %), sans conditions.
   • destockage : ouvert à tous, prix cassés / fins de série.

   Coordonnées vérifiées en juillet 2026. Vérifie les horaires par téléphone
   avant de te déplacer, ils changent souvent.
   ========================================================================= */
window.AZELER_EPICERIES = [

  /* ------------------------- ÉPICERIES SOLIDAIRES / SOCIALES ------------ */
  {
    nom: "Épicerie solidaire SAWA",
    type: "solidaire",
    adresse: "18 rue Tchaïkovski",
    ville: "Paris",
    codePostal: "75018",
    horaires: "Lun et Mer-Sam 10h-20h, Dim 9h-14h",
    telephone: "",
    lat: 48.8950321,
    lng: 2.3651843
  },
  {
    nom: "La Joyeuse Chapelle — épicerie solidaire",
    type: "solidaire",
    adresse: "63 rue de la Chapelle",
    ville: "Paris",
    codePostal: "75018",
    horaires: "Denrées à 10-20 % du prix — accès public en difficulté",
    telephone: "",
    lat: 48.8957042,
    lng: 2.3587673
  },
  {
    nom: "La Joyeuse Chapelle — hygiène & vêtements",
    type: "solidaire",
    adresse: "80 rue de la Chapelle",
    ville: "Paris",
    codePostal: "75018",
    horaires: "Hygiène, vêtements, fournitures à 10-20 % du prix",
    telephone: "",
    lat: 48.8961526,
    lng: 2.3597260
  },
  {
    nom: "Libre Service Solidaire (Secours populaire 75)",
    type: "solidaire",
    adresse: "142 boulevard Vincent Auriol",
    ville: "Paris",
    codePostal: "75013",
    horaires: "Sur orientation d'un travailleur social",
    telephone: "",
    lat: 48.8326371,
    lng: 2.3604989
  },
  {
    nom: "Libre Service Solidaire (Secours populaire 75)",
    type: "solidaire",
    adresse: "10 rue Montcalm",
    ville: "Paris",
    codePostal: "75018",
    horaires: "Sur orientation d'un travailleur social",
    telephone: "",
    lat: 48.8920914,
    lng: 2.3359952
  },
  {
    nom: "Épicerie solidaire de Crimée",
    type: "solidaire",
    adresse: "166 rue de Crimée",
    ville: "Paris",
    codePostal: "75019",
    horaires: "Denrées de qualité à 10-30 % de leur valeur",
    telephone: "",
    lat: 48.8896392,
    lng: 2.3780623
  },
  {
    nom: "AGORAé Paris (épicerie solidaire étudiante — AGEP/FAGE)",
    type: "solidaire",
    adresse: "4 place Jussieu",
    ville: "Paris",
    codePostal: "75005",
    horaires: "Sur dossier étudiant — produits à ~10 % du prix",
    telephone: "",
    lat: 48.8479656,
    lng: 2.3552525
  },
  {
    nom: "Épicerie sociale Epicéas — Aubervilliers Solidarité",
    type: "solidaire",
    adresse: "29 rue de la Commune de Paris",
    ville: "Aubervilliers",
    codePostal: "93300",
    horaires: "Sur orientation sociale",
    telephone: "01 48 33 69 18",
    lat: 48.9124490,
    lng: 2.3821370
  },
  {
    nom: "Épicerie solidaire Afana",
    type: "solidaire",
    adresse: "44 boulevard Anatole France",
    ville: "Aubervilliers",
    codePostal: "93300",
    horaires: "Sur orientation sociale",
    telephone: "01 43 52 17 48",
    lat: 48.9183130,
    lng: 2.3832010
  },
  {
    nom: "Épicerie sociale et solidaire Wicasaya",
    type: "solidaire",
    adresse: "1 rue de la Ferme",
    ville: "Bobigny",
    codePostal: "93000",
    horaires: "Aide alimentaire à prix réduit + ateliers — sur orientation",
    telephone: "",
    lat: 48.9106565,
    lng: 2.4360029
  },
  {
    nom: "Épicerie sociale et solidaire — Université Paris 8",
    type: "solidaire",
    adresse: "2 rue de la Liberté",
    ville: "Saint-Denis",
    codePostal: "93200",
    horaires: "Mar et Jeu 12h-19h — sur dossier étudiant",
    telephone: "01 49 40 71 88",
    lat: 48.9441160,
    lng: 2.3650530
  },
  {
    nom: "AGORAé de Créteil (épicerie solidaire étudiante — FAGE/UPEC)",
    type: "solidaire",
    adresse: "61 avenue du Général de Gaulle",
    ville: "Créteil",
    codePostal: "94000",
    horaires: "Sur dossier étudiant — produits à ~10 % du prix",
    telephone: "",
    lat: 48.7882159,
    lng: 2.4439219
  },

  /* ------------------------- ÉPICERIES ANTI-GASPI (réseau NOUS) --------- */
  {
    nom: "NOUS anti-gaspi — Clichy",
    type: "anti-gaspi",
    adresse: "95 avenue de Clichy",
    ville: "Paris",
    codePostal: "75017",
    horaires: "Lun-Sam 10h-20h45 — invendus jusqu'à -30 %",
    telephone: "07 45 23 39 73",
    lat: 48.8888889,
    lng: 2.3228999
  },
  {
    nom: "NOUS anti-gaspi — Jean Jaurès",
    type: "anti-gaspi",
    adresse: "137 avenue Jean Jaurès",
    ville: "Paris",
    codePostal: "75019",
    horaires: "Lun-Sam 10h-20h45, Dim 10h-13h — invendus -30 %",
    telephone: "01 40 35 01 28",
    lat: 48.8864603,
    lng: 2.3836976
  },
  {
    nom: "NOUS anti-gaspi — Ledru Rollin",
    type: "anti-gaspi",
    adresse: "79 avenue Ledru Rollin",
    ville: "Paris",
    codePostal: "75012",
    horaires: "Lun-Sam 10h-20h45 — invendus jusqu'à -30 %",
    telephone: "01 45 84 38 72",
    lat: 48.8505212,
    lng: 2.3751034
  },
  {
    nom: "NOUS anti-gaspi — Montparnasse",
    type: "anti-gaspi",
    adresse: "11 rue de l'Ouest",
    ville: "Paris",
    codePostal: "75014",
    horaires: "Lun-Sam 10h-20h45, Dim 10h-13h — invendus -30 %",
    telephone: "06 49 52 49 99",
    lat: 48.8372241,
    lng: 2.3221648
  },
  {
    nom: "NOUS anti-gaspi — Place des Fêtes",
    type: "anti-gaspi",
    adresse: "64 rue du Pré Saint-Gervais",
    ville: "Paris",
    codePostal: "75019",
    horaires: "Lun-Sam 10h-20h45, Dim 10h-13h — invendus -30 %",
    telephone: "01 40 16 94 54",
    lat: 48.8787180,
    lng: 2.3977908
  },
  {
    nom: "NOUS anti-gaspi — Poissonnière",
    type: "anti-gaspi",
    adresse: "44 rue du Faubourg Poissonnière",
    ville: "Paris",
    codePostal: "75010",
    horaires: "Lun-Sam 10h-20h45, Dim 9h-13h — invendus -30 %",
    telephone: "01 47 70 11 17",
    lat: 48.8740833,
    lng: 2.3480437
  },

  /* ------------------------- DÉSTOCKAGE / PRIX CASSÉS (ouverts à tous) -- */
  {
    nom: "Charlie's Market — supermarché discount",
    type: "destockage",
    adresse: "19 rue de Ménilmontant",
    ville: "Paris",
    codePostal: "75020",
    horaires: "Lun-Sam 8h30-20h, Dim 9h30-12h30 — déstockage, prix cassés",
    telephone: "01 43 61 87 30",
    lat: 48.8674778,
    lng: 2.3845304
  },
  {
    nom: "O'Circus — déstockage alimentaire",
    type: "destockage",
    adresse: "39 route de Noisy",
    ville: "Villemomble",
    codePostal: "93250",
    horaires: "Invendus et fins de série à prix cassés — ouvert à tous",
    telephone: "",
    lat: 48.8830056,
    lng: 2.4960912
  },
  {
    nom: "Espace Saint-Denis Primeur — fruits & légumes discount",
    type: "destockage",
    adresse: "3 rue Claude Debussy",
    ville: "Épinay-sur-Seine",
    codePostal: "93800",
    horaires: "Fruits et légumes à prix cassés — ouvert à tous",
    telephone: "",
    lat: 48.9469771,
    lng: 2.3427207
  }
];
