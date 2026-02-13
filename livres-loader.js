// livres-loader.js - Fetch auto depuis Decap CMS JSON files
// Liste manuelle des slugs/noms de fichiers (ajoute ici quand tu crées un livre dans /admin)
const livreFiles = [
  // Exemples – remplace/ajoute les vrais noms de fichiers JSON (sans .json)
  // "introduction-au-droit-civil-malgache",
  // "droit-des-obligations-simplifie",
  // "institutions-politiques-et-administratives-malgaches"
  // Ajoute les nouveaux ici après création dans Decap CMS
  // Exemple : si Decap crée "les-clauses-abusives-en-droit-malgache.json", ajoute "les-clauses-abusives-en-droit-malgache"
];

// Fonction pour charger tous les livres
async function loadLivres() {
  const baseUrl = 'https://raw.githubusercontent.com/ssstew368-coder/LePetitJuriste/main/data/livres/';
  const allLivres = [];

  for (const slug of livreFiles) {
    try {
      const response = await fetch(`${baseUrl}${slug}.json`);
      if (!response.ok) {
        console.warn(`Fichier non trouvé : ${slug}.json`);
        continue;
      }
      const data = await response.json();
      allLivres.push(data);
    } catch (error) {
      console.error(`Erreur fetch ${slug}.json :`, error);
    }
  }

  // Trie par catégorie ou titre si tu veux (optionnel)
  allLivres.sort((a, b) => a.titre.localeCompare(b.titre));

  return allLivres;
}

// Export pour utilisation dans index.html
// (ou appelle directement dans un <script> inline)