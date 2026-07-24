/* =========================================================================
   AZELER — DONNÉES DES ÉPICERIES SOCIALES, SOLIDAIRES & ANTI-GASPI
   Propriété du TERMINAL 4.
   lat/lng = coordonnées GPS (pour la carte), relevées via Nominatim /
   OpenStreetMap au niveau de l'adresse.

   Deux familles de structures :
   • Épiceries SOLIDAIRES / SOCIALES : accès sur critères sociaux (bon des
     services sociaux, dossier), denrées de 10 % à 30 % de leur valeur.
   • Épiceries ANTI-GASPI (réseau NOUS) : ouvertes à tous, invendus revalorisés
     à prix réduits (jusqu'à -30 %), sans conditions de ressources.

   Coordonnées vérifiées en juillet 2026. Vérifie les horaires par téléphone
   avant de te déplacer, ils changent souvent.
   ========================================================================= */
window.AZELER_EPICERIES = [

  /* ------------------------- ÉPICERIES SOLIDAIRES / SOCIALES ------------ */
  {
    nom: "Épicerie solidaire SAWA",
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
    adresse: "44 boulevard Anatole France",
    ville: "Aubervilliers",
    codePostal: "93300",
    horaires: "Sur orientation sociale",
    telephone: "01 43 52 17 48",
    lat: 48.9183130,
    lng: 2.3832010
  },

  /* ------------------------- ÉPICERIES ANTI-GASPI (réseau NOUS) --------- */
  {
    nom: "NOUS anti-gaspi — Clichy",
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
    adresse: "44 rue du Faubourg Poissonnière",
    ville: "Paris",
    codePostal: "75010",
    horaires: "Lun-Sam 10h-20h45, Dim 9h-13h — invendus -30 %",
    telephone: "01 47 70 11 17",
    lat: 48.8740833,
    lng: 2.3480437
  }
];
