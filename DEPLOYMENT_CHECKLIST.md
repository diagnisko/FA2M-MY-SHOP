# 📋 Checklist Pré-Déploiement Vercel - FA2M

## ✅ Configuration des Fichiers

- [x] `vercel.json` — Configuration Vercel créée
- [x] `api/index.js` — Point d'entrée serverless créé
- [x] `package.json` — Root package.json créé
- [x] `backend/server.js` — Modifié pour exporter le module
- [x] `backend/package.json` — Dépendances vérifiées
- [x] `DEPLOYMENT_VERCEL.md` — Guide complet créé

## 🔒 Sécurité - À vérifier avant déploiement

### Variables d'Environnement (dans Vercel Dashboard):
```
NODE_ENV = production
JWT_SECRET = <générez-une-clé-aléatoire-32+ caractères>
ADMIN_USERNAME = <nom-utilisateur-sécurisé>
ADMIN_PASSWORD = <mot-de-passe-très-sécurisé>
FRONTEND_ORIGINS = https://votredomaine.vercel.app
APP_URL = https://votredomaine.vercel.app
API_URL = https://votredomaine.vercel.app
```

### Sécurité du code:
- [x] Pas de secrets en dur dans le code
- [x] `.env` est dans `.gitignore`
- [x] `data/` est dans `.gitignore` (BD SQLite)
- [x] `node_modules/` est dans `.gitignore`

## 📦 Dépendances

Backend `package.json`:
- ✅ express (HTTP server)
- ✅ cors (Cross-origin)
- ✅ helmet (Security)
- ✅ express-rate-limit (Rate limiting)
- ✅ jsonwebtoken (JWT auth)
- ✅ bcryptjs (Password hashing)
- ✅ dotenv (Environment vars)
- ✅ uuid (ID generation)
- ✅ node-fetch (HTTP requests)

## 🌐 Routes Testées

- [ ] `GET /health` — Santé de l'API
- [ ] `POST /api/auth/login` — Authentification
- [ ] `GET /api/products` — Liste produits
- [ ] `GET /` — Frontend principal
- [ ] `GET /admin` — Interface admin

## 🗄️ Base de Données

⚠️ **Important**: SQLite sur Vercel est réinitialisé à chaque déploiement

Options:
1. **Court terme**: Données perdues → Recréez via admin
2. **Recommandé**: Migrez vers PostgreSQL (gratuit + add-on Vercel)
3. **Alternative**: MongoDB Atlas (gratuit 512MB)

## 🚀 Étapes de Déploiement

### 1. Préparer Git
```bash
cd c:\Users\hp\Desktop\FA2M-MY-SHOP
git init
git add .
git commit -m "Ready for Vercel deployment"
git branch -M main
git remote add origin https://github.com/votrecompte/FA2M-MY-SHOP.git
git push -u origin main
```

### 2. Déployer avec Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

### 3. Configurer Variables Vercel Dashboard
- Allez sur vercel.com → votre projet → Settings → Environment Variables
- Remplissez toutes les variables listées plus haut

### 4. Tester après Déploiement
```bash
# Remplacez par votre URL Vercel
curl https://votreprojet.vercel.app/health

# Réponse attendue:
# {"ok":true,"version":"2.0.0","timestamp":"..."}
```

## 🔍 Vérification Post-Déploiement

- [ ] `/health` retourne `{"ok":true}`
- [ ] `/api/products` retourne liste produits
- [ ] `/admin` redirige vers login
- [ ] Login admin fonctionne
- [ ] Aucune erreur CORS
- [ ] Aucune erreur de base de données

## 🆘 Troubleshooting Rapide

### Erreur "Cannot find module"
```bash
# Vérifiez les chemins dans server.js et api/index.js
# Utilisez require.resolve() pour debug
```

### Erreur 404 sur /api
```bash
# Vérifiez que vercel.json a les bonnes routes
# Redéployez: vercel --prod
```

### Erreur CORS
```bash
# Vérifiez FRONTEND_ORIGINS dans Vercel Dashboard
# Doit inclure votre domaine exact: https://votredomaine.vercel.app
```

### BD vide après déploiement
```bash
# Créez un script de seed data
# Ou acceptez que SQLite soit réinitialisé
# Solution définitive: Migrez vers PostgreSQL
```

## 📚 Documentation

- 📖 Guide complet: `DEPLOYMENT_VERCEL.md`
- 🔧 Config Vercel: `vercel.json`
- 🚀 API Serverless: `api/index.js`
- 💾 Backend: `backend/server.js`

## 📞 Support

Après déploiement, pour déboguer:
```bash
# Voir les logs en temps réel
vercel logs <deployment-url>

# Voir les récents déploiements
vercel list

# Rollback si besoin
vercel rollback
```

---

**Status**: ✅ Prêt pour déploiement
**Dernière mise à jour**: 31 Mars 2026
**Version**: 2.0.0
