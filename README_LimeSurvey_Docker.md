# 📊 LimeSurvey en Local avec Docker

Ce projet permet de faire tourner **LimeSurvey** en local en quelques minutes grâce à **Docker** et **Docker Compose**.

> 📍 Dossier racine du dépôt GitLab : `xxx_tttt/limesurvey-docker`

---

## 🚀 Objectif

Permettre à n’importe qui (même sans connaissances techniques avancées) de :
- Lancer LimeSurvey en local
- Créer et gérer des enquêtes depuis une interface web
- Accéder facilement à l'administration via un navigateur

---

## 🧰 Prérequis

Avant de commencer, il te faut :

- [Docker](https://www.docker.com/products/docker-desktop) installé ✅  
- [Docker Compose](https://docs.docker.com/compose/) (inclus dans Docker Desktop)

---

## 📁 Structure du projet

```
limesurvey-docker/
├── docker-compose.yml   # Configuration des services Docker
├── .env                 # Variables d’environnement (mot de passe, utilisateur, etc.)
└── README.md            # (ce fichier)
```

---

## ⚙️ Configuration (.env)

Tu peux modifier ce fichier pour personnaliser ton mot de passe ou ton nom d’utilisateur.

```env
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=limesurvey
MYSQL_USER=limesurveyuser
MYSQL_PASSWORD=limesurveypass

LIMESURVEY_ADMIN_USER=admin
LIMESURVEY_ADMIN_PASSWORD=adminpass
LIMESURVEY_ADMIN_NAME=Admin
LIMESURVEY_ADMIN_EMAIL=admin@example.com
```

---

## ▶️ Lancer LimeSurvey en local

Dans un terminal, place-toi dans le dossier `limesurvey-docker/` puis exécute :

```bash
docker-compose up -d
```

---

## 🌐 Accès à l’interface LimeSurvey

Une fois les conteneurs démarrés, ouvre ton navigateur et va sur :

👉 [http://localhost:8080/admin](http://localhost:8080/admin)

Utilise les identifiants suivants :

- **Nom d’utilisateur :** `admin`
- **Mot de passe :** `adminpass`

> ℹ️ L’URL `http://localhost:8080/` (sans `/admin`) peut apparaître vide, c’est normal !

---

## 🧹 Arrêter le projet

```bash
docker-compose down
```

🧨 Pour tout supprimer (base comprise) :

```bash
docker-compose down -v
```

---

## 🛠 Dépannage

- **Page blanche sur `localhost:8080`**  
  👉 Va directement sur [http://localhost:8080/admin](http://localhost:8080/admin)

- **Problèmes de cache ou lenteur**  
  Tu peux vider le cache manuellement :
  ```bash
  docker exec -it limesurvey-app bash
  rm -rf /var/www/html/application/runtime/cache/*
  exit
  ```

- **Modifier la page d'accueil (facultatif)**  
  Tu peux forcer une redirection automatique vers `/admin` :
  ```bash
  docker exec -it limesurvey-app bash
  echo '<meta http-equiv="refresh" content="0;URL=/admin">' > /var/www/html/index.html
  exit
  ```

---

## 📂 Volumes Docker

Les données de la base de données sont conservées dans un volume nommé `db_data`. Tu peux les retrouver avec :

```bash
docker volume ls
```

---

## 🙋‍♀️ Besoin d'aide ?

Contacte le référent du projet ou ouvre une issue sur le dépôt GitLab.

---

## 📌 À venir

- 🎨 Thèmes personnalisés
- 🔌 Intégration avec d'autres outils (API, webhook)
- 📥 Export automatique des réponses

---

## 🔐 Sécurité

Ce projet est pour un usage **local / de développement uniquement**.  
**Ne pas l'utiliser tel quel en production !**
