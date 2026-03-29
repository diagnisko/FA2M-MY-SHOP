# 🚀 FA2M — Guide de Déploiement & Sécurisation Complet

## Sommaire
1. [Checklist sécurité avant mise en ligne](#1-checklist-sécurité)
2. [Changer le mot de passe admin](#2-changer-le-mot-de-passe-admin)
3. [Choisir un hébergeur](#3-choisir-un-hébergeur)
4. [Acheter un nom de domaine](#4-acheter-un-nom-de-domaine)
5. [Déployer le site](#5-déployer-le-site)
6. [Configurer HTTPS (SSL)](#6-configurer-https-ssl)
7. [Renommer la page admin](#7-renommer-la-page-admin)
8. [Après la mise en ligne](#8-après-la-mise-en-ligne)

---

## 1. Checklist sécurité

Coche chaque point avant de mettre le site en ligne :

- [ ] Mot de passe admin changé (voir section 2)
- [ ] Page admin renommée (voir section 7)
- [ ] HTTPS activé sur l'hébergeur
- [ ] Numéro WhatsApp correct dans `script.js` → `phone: "XXXXXXXXX"`
- [ ] Tester le site en local avant upload
- [ ] Supprimer les fichiers inutiles (.hotplate, backend/, frontend/)

---

## 2. Changer le mot de passe admin

Le mot de passe actuel est `fa2m2024`. **Change-le OBLIGATOIREMENT avant de mettre en ligne.**

### Étapes :

**Étape 1** — Va sur ce site pour générer le hash SHA-256 de ton nouveau mot de passe :
```
https://emn178.github.io/online-tools/sha256.html
```

**Étape 2** — Entre ton nouveau mot de passe (ex: `MonMotDePasse2025!`)

**Étape 3** — Copie le hash généré (une longue chaîne de lettres et chiffres)

**Étape 4** — Ouvre `admin.html` et trouve cette ligne :
```
pass: "fa2m2024",
```
Remplace `fa2m2024` par ton nouveau mot de passe en clair.
La vérification se fait via SHA-256 automatiquement au runtime.

> ⚠️ Choisis un mot de passe fort : minimum 12 caractères, majuscules + chiffres + symboles
> Exemple fort : `FA2M@Dakar2025!`

---

## 3. Choisir un hébergeur

### Option A — Gratuit (pour tester) ⭐ Recommandé pour démarrer

#### Netlify (le meilleur gratuit)
- Site : https://netlify.com
- Gratuit jusqu'à 100 Go de bande passante/mois
- HTTPS automatique gratuit
- Déploiement en glisser-déposer
- **Parfait pour FA2M**

#### Vercel
- Site : https://vercel.com
- Gratuit, HTTPS automatique
- Très rapide

### Option B — Hébergement payant (recommandé pour la production)

| Hébergeur | Prix/mois | Avantages |
|-----------|-----------|-----------|
| **OVH** (France) | ~2-5€ | Serveurs en France, support français, domaine .sn possible |
| **Hostinger** | ~1-3€ | Très abordable, panel simple |
| **Infomaniak** | ~3-6€ | Écologique, made in Switzerland |
| **LWS** (France) | ~2-4€ | Bon marché, support FR |

> 💡 Pour le Sénégal : **OVH** ou **Hostinger** sont les meilleurs rapports qualité/prix
> avec possibilité d'acheter le domaine `.sn` séparément via NIC Sénégal.

---

## 4. Acheter un nom de domaine

### Meilleurs choix pour FA2M

| Domaine | Prix/an | Où acheter |
|---------|---------|------------|
| `fa2m.sn` | ~15 000 FCFA | NIC Sénégal (nic.sn) |
| `fa2m.shop` | ~10-15€ | Namecheap, OVH |
| `fa2mstore.com` | ~10-12€ | Namecheap, OVH |
| `fa2m.boutique` | ~15-20€ | Gandi.net |
| `fa2mstyle.com` | ~10-12€ | Namecheap |

### Comment acheter sur Namecheap (le plus simple)

1. Va sur https://namecheap.com
2. Tape le nom souhaité dans la barre de recherche
3. Vérifie la disponibilité
4. Ajoute au panier
5. Crée un compte et paye (carte bancaire ou PayPal)
6. Le domaine est actif en moins de 30 minutes

### Comment acheter le domaine .sn (Sénégal)

1. Va sur http://www.nic.sn
2. Remplis le formulaire de demande d'enregistrement
3. Envoie les documents requis (pièce d'identité)
4. Délai : 2-5 jours ouvrables

---

## 5. Déployer le site

### Méthode A — Netlify (Glisser-Déposer) — Le plus simple

1. Prépare tes fichiers :
   ```
   ✅ index.html
   ✅ produits.html
   ✅ admin.html  (ou renommé)
   ✅ apropos.html
   ✅ contact.html
   ✅ styles.css
   ✅ script.js
   ✅ .htaccess
   ```
   ```
   ❌ Supprimer : backend/  frontend/  .hotplate/
   ```

2. Va sur https://netlify.com → "Sign up" (gratuit)

3. Dans le dashboard, clique sur **"Add new site"** → **"Deploy manually"**

4. **Glisse-dépose** le dossier `FA2M/` directement sur la page

5. Netlify génère une URL comme `https://fa2m-abc123.netlify.app`

6. Pour connecter ton domaine custom :
   - Dashboard → **Domain settings** → **Add custom domain**
   - Entre `fa2m.shop` (ou ton domaine)
   - Netlify te donne des DNS à configurer chez ton registrar

### Méthode B — Hébergement cPanel (OVH, Hostinger, LWS)

1. Connecte-toi au panel d'hébergement (cPanel)
2. Ouvre le **Gestionnaire de fichiers**
3. Va dans le dossier `public_html/`
4. Clique **Upload** → sélectionne tous tes fichiers FA2M
5. Assure-toi que `index.html` est bien à la racine de `public_html/`

### Méthode C — FTP (FileZilla)

1. Télécharge FileZilla : https://filezilla-project.org
2. Connecte-toi avec les infos FTP de ton hébergeur :
   - Hôte : `ftp.tondomaine.com`
   - Utilisateur et mot de passe fournis par l'hébergeur
   - Port : 21
3. Dans le panel droit (serveur), va dans `public_html/` ou `www/`
4. Glisse tes fichiers depuis le panel gauche (local) vers le panel droit

---

## 6. Configurer HTTPS (SSL)

### Sur Netlify
→ HTTPS est **automatique et gratuit**. Rien à faire.

### Sur OVH / Hostinger / cPanel
1. Va dans **cPanel** → **SSL/TLS**
2. Clique sur **"Let's Encrypt"** (SSL gratuit)
3. Sélectionne ton domaine → **Installer**
4. Attends 5-10 minutes
5. Vérifie : ton site doit s'ouvrir avec `https://`

### Vérifier que HTTPS fonctionne
- Ouvre ton site
- Tu dois voir un 🔒 cadenas dans la barre d'adresse
- L'URL doit commencer par `https://` et non `http://`

---

## 7. Renommer la page admin

**Ne laisse JAMAIS la page admin s'appeler `admin.html`** — c'est le premier fichier que les bots cherchent.

### Comment faire :

1. Renomme `admin.html` en quelque chose d'unique, ex :
   ```
   gestion-fa2m-2025.html
   dashboard-prive.html
   fa2m-backoffice.html
   ```

2. Mets à jour le lien dans `index.html` (menu mobile) :
   ```html
   <!-- Avant -->
   <a href="admin.html">⚙️ Administration</a>
   
   <!-- Après -->
   <a href="gestion-fa2m-2025.html">⚙️ Administration</a>
   ```

3. Mets à jour le lien dans `produits.html` si présent

4. **Note ce nouveau nom dans un endroit sûr** — tu en auras besoin pour accéder à l'admin

---

## 8. Après la mise en ligne

### Tests à effectuer

- [ ] Ouvrir `https://tondomaine.com` — la landing page s'affiche
- [ ] Cliquer sur "Voir la boutique" — les produits s'affichent
- [ ] Ajouter un produit au panier — le drawer s'ouvre
- [ ] Remplir le formulaire de commande — WhatsApp s'ouvre avec le bon message
- [ ] Ouvrir `https://tondomaine.com/gestion-fa2m-2025.html` — le login s'affiche
- [ ] Se connecter avec le nouveau mot de passe — le dashboard s'affiche
- [ ] Ajouter/modifier un produit depuis l'admin — visible sur le site
- [ ] Vérifier que la commande apparaît dans l'admin après test WhatsApp
- [ ] Tester sur mobile (Android + iPhone)

### Mettre à jour le numéro WhatsApp

Ouvre `script.js` et change :
```javascript
const FA2M = {
  phone: "221XXXXXXXXX",  // Mettre le numéro avec indicatif pays (221 pour Sénégal)
  ...
};
```

Et dans `admin.html` :
```javascript
var CFG = {
  phone: "221XXXXXXXXX",
  ...
};
```

> ⚠️ Format correct : sans `+`, avec indicatif pays
> Sénégal : `221` + numéro local → ex: `221771234567`

### Maintenance régulière

| Fréquence | Action |
|-----------|--------|
| Chaque semaine | Vérifier les nouvelles commandes dans l'admin |
| Chaque mois | Mettre à jour les stocks des produits |
| Chaque 3 mois | Changer le mot de passe admin |
| Chaque an | Renouveler le nom de domaine |

---

## Résumé des coûts

| Élément | Prix |
|---------|------|
| Hébergement Netlify | **Gratuit** |
| Domaine `fa2m.sn` | ~15 000 FCFA/an |
| Domaine `fa2m.shop` | ~7 000 FCFA/an |
| SSL (HTTPS) | **Gratuit** (Let's Encrypt) |
| **Total minimal** | **~7 000 FCFA/an** |
| **Total recommandé** | **~15 000 FCFA/an** |

---

## Besoin d'aide ?

- Documentation Netlify (FR) : https://docs.netlify.com
- Support OVH : https://help.ovhcloud.com/fr/
- NIC Sénégal : http://www.nic.sn

---

*FA2M — Guide de déploiement v1.0*