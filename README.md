# Urban Odyssey

<p align="center">
  <!-- Remplacez l'URL par votre logo si nécessaire -->
  <img src="https://via.placeholder.com/400x150?text=Urban+Odyssey+Logo" width="400" alt="Urban Odyssey Logo">
</p>

Urban Odyssey est une application web innovante qui va au-delà des attractions touristiques classiques en proposant des recommandations personnalisées pour découvrir les trésors cachés d'une ville. Que vous soyez touriste, résident local ou voyageur, Urban Odyssey enrichit votre expérience urbaine grâce à des informations en temps réel sur les transports, des suggestions de lieux atypiques, et bien plus encore.

---

## Table des Matières
- [À propos du projet](#à-propos-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Tech Stack](#tech-stack)
- [Installation et configuration](#installation-et-configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## À propos du projet

Urban Odyssey est conçu pour encourager l'exploration urbaine en fournissant des recommandations de lieux moins connus mais tout aussi intéressants, avec des informations pratiques sur les options de transport et les services à proximité (cafés, mosquées, magasins, etc.). Le but est de rendre la découverte d'une ville plus accessible et enrichissante pour chaque utilisateur.

---

## Fonctionnalités

- **Recommandations Personnalisées** : Suggestions de lieux à visiter en fonction des intérêts et préférences de l’utilisateur.
- **Informations de Transport en Temps Réel** : Détails sur les itinéraires, coûts et temps de trajet pour diverses options de transport.
- **Intégration de Services Locaux** : Présentation des établissements à proximité (cafés, mosquées, magasins, etc.).
- **Avis et Notes des Utilisateurs** : Possibilité de consulter et de soumettre des avis sur les lieux visités.
- **Cartes Interactives** : Intégration d'une API de cartographie pour la localisation et le routage.
- **Accessibilité Hors Ligne (Bientôt Disponible)** : Téléchargement de cartes pour naviguer sans connexion Internet.

---

## Tech Stack

- **Backend** : Laravel (PHP) avec PostgreSQL pour la base de données.
- **Frontend** : React (via CDN) intégré aux vues Blade.
- **APIs** : Intégration avec des services tiers pour obtenir des données en temps réel sur les transports et les cartes.

---

## Installation et configuration

### Prérequis

- PHP 7.4 ou supérieur
- Composer ([getcomposer.org](https://getcomposer.org))
- PostgreSQL installé et configuré
- Un éditeur de code (ex. VSCode)

### Étape 1 : Cloner le dépôt

```bash
git clone https://github.com/votreutilisateur/urban-odyssey.git
cd urban-odyssey
```
###  Étape 2 : Installer les dépendances PHP

```bash
composer install
```

###  Étape 3 : Configurer l'environnement

Copier le fichier d’exemple et le renommer en .env :
```bash
cp .env.example .env
```
Modifier le fichier .env pour configurer la connexion à PostgreSQL :
```bash
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nom_de_votre_base
DB_USERNAME=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
```

###  Étape 4 : Générer la clé de l’application
```bash
php artisan key:generate
```

###  Étape 5 : Exécuter les migrations
```bash
php artisan migrate --seed
```

###  Étape 6 : Démarrer le serveur de développement
```bash
php artisan serve
npm run dev
```

## Documentation

🔍 **Ressources complémentaires** :  
- **[Cahier des charges complet]([docs/cahier-des-charges.pdf](https://docs.google.com/document/d/1pDD_dAX0NW8Ipb_lTiWq43P0G5wSof6lR3UGJA577UA/edit?tab=t.0))**  
- **[Maquettes Figma]([https://www.figma.com/file/XXXXXX](https://www.figma.com/design/9zs02S9SRT88MzvS4TvERW/URBAN-ODYSSEY?node-id=0-1&t=FZ8pL7NUNG8keWL0-1))** (Design responsive)  
- **[Planification Jira]([https://urban-odyssey.atlassian.net](https://wassimelmorabit.atlassian.net/jira/software/projects/UD/boards/18))** (Suivi des tâches)  

---

## Contribution

Contributions bienvenues ! Suivez ces étapes :  
1. Forker le projet  
2. Créer une branche : `git checkout -b feature/YourFeature`  
3. Commiter : `git commit -m 'Ajout : [fonctionnalité]'`  
4. Pusher : `git push origin feature/YourFeature`  
5. Ouvrir une Pull Request  

---

## 🗂 Structure du Projet

```plaintext
urban-odyssey/
├── docs/               # Documentation complète (cahier des charges, UML)
├── public/             # Assets publics (CSS, JS, images)
├── resources/          # Vues Blade et fichiers de langue
├── routes/             # Définition des routes API et web
├── app/                # Logique métier (Controllers, Models, Services)
│   ├── Http/Controllers    # Contrôleurs Laravel
│   ├── Models              # Modèles Eloquent
│   └── Providers           # Service providers
├── database/           # Migrations et seeders
│   ├── migrations/         # Schémas de base de données
│   └── seeders/            # Données de test
├── storage/            # Fichiers uploads et cache
├── tests/              # Tests automatisés (PHPUnit)
├── config/             # Configuration de l'application
├── design/             # Ressources de design (Figma exports)
└── presentation/       # Matériaux de présentation (Canva)
```

---

## Sécurité

⚠️ **Vulnérabilités** :  
Signalez toute faille de sécurité à [contact@urbanodyssey.com](mailto:contact@urbanodyssey.com) (ne pas créer de ticket public).

---

## Licence

MIT License - Voir [LICENSE.md](LICENSE.md) pour les détails.  
Créé avec ❤️ par Wassim El Mourabit - [Site Officiel](https://urbanodyssey.com)
