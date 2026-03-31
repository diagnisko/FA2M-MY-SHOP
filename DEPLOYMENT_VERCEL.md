# 🚀 Guide de Déploiement Vercel - FA2M E-Commerce

## ✅ Checklist Pré-Déploiement

### 1. **Variables d'Environnement**
Créez un fichier `.env` en production avec :

```bash
NODE_ENV=production
JWT_SECRET=<générez_une_clé_aléatoire_longue_32_chars>
ADMIN_USERNAME=<nom_d'utilisateur_sécurisé>
ADMIN_PASSWORD=<mot_de_passe_très_sécurisé>
FRONTEND_ORIGINS=https://votredomaine.vercel.app
APP_URL=https://votredomaine.vercel.app
API_URL=https://votredomaine.vercel.app
```

### 2. **Configuration Vercel**

Vercel utilise une **structure de projet monorepo**. Les fichiers créés :
- `vercel.json` — Configuration de déploiement
- `api/index.js` — Point d'entrée serverless pour l'API

### 3. **Déploiement avec Vercel CLI**

#### Installation
```bash
npm install -g vercel
```

#### Déploiement
```bash
# À la racine du projet
vercel --prod
```

#### Ou avec Git (GitHub/GitLab)
1. Poussez votre projet sur GitHub
2. Connectez votre repository à Vercel dashboard
3. Configurez les variables d'environnement dans Vercel dashboard
4. Vercel déploiera automatiquement à chaque push

## ⚠️ PROBLÈMES IMPORTANTS

### 📦 **Problème SQLite sur Vercel**
**Issue**: SQLite stocke les données dans le système de fichiers local. Sur Vercel, ce système est réinitialisé à chaque déploiement.

**Solutions**:
1. **Temporaire** (développement only):
   - La BD sera réinitialisée à chaque déploiement
   - Utilisez un compte admin pour re-configurer les produits

2. **Recommandé** (production):
   - Migrez vers **PostgreSQL** (gratuit sur Vercel avec Postgres add-on)
   - Ou utilisez **MongoDB** (gratuit avec MongoDB Atlas)

**Migration recommandée** :
```javascript
// Installer un driver PostgreSQL
npm install pg dotenv

// Mettre à jour src/config/database.js pour utiliser PostgreSQL
```

### 🌐 **CORS en Production**
Mettez à jour `FRONTEND_ORIGINS` avec votre domaine réel :
```
FRONTEND_ORIGINS=https://votredomaine.com,https://www.votredomaine.com
```

### 📁 **Structure de Fichiers**
```
project/
├── api/
│   └── index.js              ← Point d'entrée Vercel
├── backend/
│   ├── server.js             ← App Express exportée
│   ├── package.json
│   ├── src/
│   └── data/
├── frontend/                 ← Servi statiquement
│   ├── admin/
│   └── user/
├── vercel.json               ← Configuration Vercel
└── .env                       ← Variables d'environnement (⚠️ .gitignore)
```

## 📋 **Étapes de Déploiement**

### Étape 1: Préparer le Repository
```bash
cd c:\Users\hp\Desktop\FA2M-MY-SHOP

# Initialiser Git si pas encore fait
git init
git add .
git commit -m "Initial commit - Ready for Vercel"
git branch -M main
git remote add origin https://github.com/votre-compte/FA2M-MY-SHOP.git
git push -u origin main
```

### Étape 2: Configurer Vercel
```bash
# Installer Vercel CLI
npm install -g vercel

# Authentifier
vercel login

# Tester le déploiement en preview
vercel

# Déployer en production
vercel --prod
```

### Étape 3: Configurer les Variables dans Vercel Dashboard
1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet
3. Settings → Environment Variables
4. Ajoutez toutes les variables du `.env`:
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `FRONTEND_ORIGINS`
   - `APP_URL`
   - `API_URL`

### Étape 4: Configurer le Domaine Personnalisé (optionnel)
1. Dans Vercel dashboard → Domaines
2. Ajoutez votre domaine
3. Suivez les instructions DNS

## 🔒 **Sécurité Production**

### Essentiels:
- [ ] `JWT_SECRET` — Clé aléatoire forte (32+ caractères)
- [ ] `ADMIN_PASSWORD` — Mot de passe complexe (16+ caractères, chiffres + symboles)
- [ ] `NODE_ENV=production`
- [ ] `FRONTEND_ORIGINS` — Restreint aux domaines autorisés
- [ ] Variables stockées dans Vercel (pas en .env publique)

### Après Déploiement:
1. Connectez-vous → `/admin/login.html`
2. Changez le mot de passe admin immédiatement
3. Vérifiez les logs: Vercel Dashboard → Logs

## 📊 **Monitoring**

### Vérifier que ça marche:
```bash
# Vérifier la santé de l'API
curl https://votredomaine.vercel.app/health

# Réponse attendue:
# {"ok":true,"version":"2.0.0","timestamp":"..."}
```

### Logs en temps réel:
```bash
vercel logs <deployment-url>
```

## 🆘 **Troubleshooting**

### ❌ Erreur "404 - API not found"
- Vérifiez que `vercel.json` existe à la racine
- Vérifiez que `api/index.js` existe
- Redéployez: `vercel --prod`

### ❌ Erreur CORS
- Vérifiez `FRONTEND_ORIGINS` dans les variables Vercel
- Doit correspondre exactement à votre domaine

### ❌ Base de données vide après déploiement
- C'est normal avec SQLite sur Vercel
- Solution: Migrez vers PostgreSQL ou créez un script de seed

### ❌ Admin login ne fonctionne pas
- Vérifiez les variables: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`
- Vérifiez les logs: `vercel logs <url>`

## 📚 **Ressources Utiles**

- [Vercel Docs](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Node.js on Vercel](https://vercel.com/docs/cli/deployments)

## 🎯 **Prochaines Étapes Recommandées**

1. **Migrer vers PostgreSQL** pour la persistance des données
2. **Ajouter un système de cache** (Redis)
3. **Configurer un domaine personnalisé**
4. **Mettre en place des sauvegardes BD**
5. **Ajouter du monitoring/alerting** (Sentry, etc.)

---

**Fait à jour le**: 31 Mars 2026
**Version du projet**: 2.0.0
**Platform**: Vercel Serverless
