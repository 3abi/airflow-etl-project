# 🐳 Installation de Docker + Docker Compose sur Ubuntu (Méthode Officielle)

> Compatible Ubuntu 20.04 / 22.04 / 24.04 — propre, stable, à jour.

---

## ✅ Étapes rapides

### 1. Mises à jour du système

```bash
sudo apt update && sudo apt upgrade -y
```

---

### 2. Installer les dépendances

```bash
sudo apt install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release \
    apt-transport-https \
    software-properties-common
```

---

### 3. Ajouter la clé GPG officielle de Docker

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

---

### 4. Ajouter le dépôt Docker stable

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

---

### 5. Installer Docker + Docker Compose

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

---

### 6. Vérifier que Docker fonctionne

```bash
sudo docker run hello-world
```

---

### 7. Utiliser Docker sans sudo (optionnel mais recommandé)

```bash
sudo usermod -aG docker $USER
```

➡️ **Sans redémarrer**, applique le changement immédiatement avec :

```bash
newgrp docker
```

Puis teste :

```bash
docker ps
```

---

### 8. Vérifier Docker Compose v2

```bash
docker compose version
```

Doit afficher quelque chose comme : `Docker Compose version v2.x.x`

---

## 🧪 Test final (nginx)

```bash
docker run -d -p 8080:80 nginx
```

➡️ Ouvre [http://localhost:8080](http://localhost:8080)  
Tu dois voir la page par défaut nginx.

---

## 🛠 En cas de problème

| Problème | Solution |
|----------|----------|
| `permission denied while trying to connect to the Docker daemon socket` | Tu n’as pas relancé le groupe avec `newgrp docker` ou oublié `sudo` |
| `docker: command not found` | Relancer installation depuis l’étape 5 |
| `docker compose` ne marche pas | Vérifie que tu utilises Compose V2 : `docker compose version` (pas `docker-compose`) |

---

## 🔐 Sécurité

⚠️ Docker donne à ton utilisateur des droits d’accès root sur le système. Ne l’active que sur une machine de confiance.

---

## 📚 Liens utiles

- [Documentation officielle Docker](https://docs.docker.com/engine/install/ubuntu/)
- [Docker Compose](https://docs.docker.com/compose/)
