
# LimeSurvey DB Tool

Script Bash pour la gestion des bases de données MariaDB utilisées avec LimeSurvey.

## 🎯 Objectif

Ce script permet d’effectuer les opérations suivantes :

- 📤 Exporter (dumpler) la base LimeSurvey
- 📥 Importer un fichier SQL (avec ou sans suppression des données existantes)
- 📄 Lister les dumps disponibles
- 🧪 Simuler un import (dry-run) dans une base temporaire (option à venir)

---

## ⚙️ Prérequis

- MariaDB exposé localement (port 3306)
- [mysqldump](https://mariadb.com/kb/en/mysqldump/) et `mysql` installés sur la machine locale :

### Installer sous Linux :
```bash
sudo apt update && sudo apt install mariadb-client
```

### macOS (Homebrew) :
```bash
brew install mariadb
```

---

## 🧾 Fichier `.env`

Le script utilise un fichier `.env` localisé dans le dossier `scripts/`. Exemple :

```ini
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=limesurvey_user
DB_PASS=mon_mot_de_passe
DB_NAME=limesurvey_db
DUMP_DIR=./db_dumps
```

---

## 🚀 Utilisation

```bash
./scripts/limesurvey_db.sh
```

### Menu interactif :

```
=== LimeSurvey DB Script ===
1. Exporter la base
2. Importer un dump
3. Lister les dumps
```

---

## 📤 Exporter la base

Crée un fichier `.sql` horodaté dans `./db_dumps/`.

---

## 📥 Importer un dump

L’outil propose deux modes :

1. 🔥 **Destructif** : Supprime entièrement la base (`DROP + CREATE`) avant import
2. 🧩 **Non destructif** : Conserve les données existantes et applique le dump

Le script vérifie aussi :
- L’extension du fichier (`.sql`)
- Sa présence

---

## 📂 Lister les dumps

Affiche la liste des fichiers `.sql` présents dans le répertoire `db_dumps/`.

---

## 🧪 À venir : simulation d’import (dry-run)

Un mode dry-run permettrait de :
- Valider la structure d’un fichier SQL
- Tester son injection dans une base temporaire
- Sans modifier la base réelle

---

## 📦 Structure du projet recommandée

```
.
├── docker-compose.yml
├── .env                # Variables Docker (MariaDB, LimeSurvey)
├── db_dumps/           # Dumps SQL générés
├── scripts/
│   ├── .env            # Variables pour le script
│   └── limesurvey_db.sh
```

---

## ✅ Exemple d’export

```bash
./scripts/limesurvey_db.sh
# Choisir option 1
```

Fichier généré :
```
./db_dumps/limesurvey_db_20250604_145301.sql
```

---

## 🛡️ Sécurité

**Ne versionnez pas** :
- Vos dumps (`db_dumps/`) : ajoutez-les dans `.gitignore`
- Les fichiers `.env` contenant des mots de passe

---

## 🧰 Suggestions à venir

- Ajout d’un mode "dry-run" dans base temporaire
- Planification automatique via `cron` ou `Makefile`
- Intégration dans GitLab CI/CD

---

## ✍️ Auteur

Projet développé par [Ton Nom ou Équipe]  
Contact : [adresse@email.com]
