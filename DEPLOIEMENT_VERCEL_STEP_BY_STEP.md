# 🚀 Déploiement FA2M sur Vercel (Pas à pas + Commandes)

## 1. Préparer le projet

```bash
# Initialiser git si besoin
cd c:/Users/hp/Desktop/FA2M-MY-SHOP
# (optionnel) git init
# (optionnel) git add .
# (optionnel) git commit -m "Ready for Vercel"
```

---

## 2. Créer un compte Vercel

- Va sur https://vercel.com et crée un compte (GitHub recommandé)

---

## 3. Lier le projet à un repo Git

```bash
git remote add origin https://github.com/ton-utilisateur/ton-repo.git
git push -u origin main
```

---

## 4. Créer une base PostgreSQL sur Vercel

- Va sur https://vercel.com/integrations/postgres
- Clique sur “Add Integration”
- Sélectionne ton projet
- Vercel ajoute la variable `POSTGRES_URL` ou `PG_URL` automatiquement

---

## 5. (Optionnel) Migrer les données SQLite → PostgreSQL

```bash
cd backend/src/config
npm install pg sqlite3
node migrate_sqlite_to_pg.js
```

---

## 6. Configurer les variables d’environnement sur Vercel

- Va sur Vercel → ton projet → Settings → Environment Variables
- Ajoute :
  - `PG_URL` (ou `POSTGRES_URL`)
  - `JWT_SECRET` (32+ caractères)
  - `ADMIN_USERNAME`
  - `ADMIN_PASSWORD`
  - `FRONTEND_ORIGINS` (ex: https://ton-projet.vercel.app)
  - `APP_URL` (ex: https://ton-projet.vercel.app)
  - `API_URL` (ex: https://ton-projet.vercel.app)
  - ... (voir .env.example)

---

## 7. Déployer sur Vercel

### a) Interface web
- Va sur https://vercel.com/new
- Sélectionne ton repo
- Clique sur “Deploy”

### b) Ou en ligne de commande
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 8. Vérifier le déploiement

- Va sur https://ton-projet.vercel.app
- Teste :
  - `/` (frontend)
  - `/admin` (admin)
  - `/api/products` (API)
  - `/api/auth/login` (login admin)

---

## 9. (Optionnel) Ajouter un domaine personnalisé

- Vercel → Settings → Domains → Add
- Suis les instructions DNS

---

## 10. Logs et monitoring

```bash
vercel logs ton-projet.vercel.app
```

---

## 11. Mise à jour du projet

```bash
git add .
git commit -m "update"
git push
# Vercel redéploie automatiquement
```

---

## 12. Sécurité

- Change le mot de passe admin dès la première connexion
- Ne partage jamais ton JWT_SECRET
- Garde `.env` hors du repo (il est dans `.gitignore`)

---

**Fichier généré automatiquement le 31/03/2026**
