# 📊 LimeSurvey en Local avec Docker + PHPMyAdmin

Ce projet permet de faire tourner **LimeSurvey**, **MariaDB** et **PHPMyAdmin** en local facilement grâce à **Docker** et **Docker Compose**.

> 📍 Dossier racine du dépôt GitLab : `xxx_tttt/limesurvey-docker`

---

## 🚀 Objectif

- Lancer LimeSurvey en local
- Gérer la base de données via PHPMyAdmin
- Tester des questionnaires complets et récupérer les réponses

---

## 🧰 Prérequis

- [Docker](https://www.docker.com/products/docker-desktop) installé ✅  
- [Docker Compose](https://docs.docker.com/compose/) (inclus dans Docker Desktop)

---

## 📁 Structure du projet

```
limesurvey-docker/
├── docker-compose.yml   # Configuration des services Docker
├── .env                 # Variables d’environnement (base de données, comptes, etc.)
└── README.md            # Ce fichier
```

---

## ⚙️ Contenu du fichier `.env`

```env
# Configuration MariaDB
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=limesurvey
MYSQL_USER=limesurveyuser
MYSQL_PASSWORD=limesurveypass

# Configuration LimeSurvey
LIMESURVEY_ADMIN_USER=admin
LIMESURVEY_ADMIN_PASSWORD=adminpass
LIMESURVEY_ADMIN_NAME=Admin
LIMESURVEY_ADMIN_EMAIL=admin@example.com
```

---

## ▶️ Lancer l'application

Dans un terminal, place-toi dans le dossier `limesurvey-docker/` puis exécute :

```bash
docker-compose up -d
```

---

## 🌐 Accès aux applications

- **LimeSurvey Admin** : [http://localhost:8080/admin](http://localhost:8080/admin)
- **PHPMyAdmin** : [http://localhost:8081](http://localhost:8081)

### Identifiants PHPMyAdmin :
- Serveur : `db`
- Utilisateur : `limesurveyuser`
- Mot de passe : `limesurveypass`

> ℹ️ Note : L'URL `http://localhost:8080/` (sans `/admin`) peut apparaître vide, c’est normal.

---

## 🧹 Arrêter l'application

```bash
docker-compose down
```

Pour tout supprimer y compris les données (attention) :

```bash
docker-compose down -v
```

---

## 🛠 Dépannage rapide

- **Page blanche sur LimeSurvey** : accéder directement via `/admin`
- **Problèmes de cache** :
  ```bash
  docker exec -it limesurvey-app bash
  rm -rf /var/www/html/application/runtime/cache/*
  exit
  ```

- **Redirection automatique de l'accueil vers /admin (optionnel)** :
  ```bash
  docker exec -it limesurvey-app bash
  echo '<meta http-equiv="refresh" content="0;URL=/admin">' > /var/www/html/index.html
  exit
  ```

---

## 📂 Volumes Docker utilisés

- `db_data` : Stocke les données MariaDB de manière persistante

---

## 📌 Fonctionnalités à venir

- Thèmes LimeSurvey personnalisés 🎨
- Export automatique des réponses 📥
- Intégration API webhook 🔌

---

## 🔐 Sécurité

Ce projet est prévu pour un usage **local** et **de développement uniquement**.  
**Ne pas utiliser en production sans sécuriser la base de données et LimeSurvey.**
