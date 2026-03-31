"use strict";
// ── Suppress experimental / deprecation warnings ─────────────────
const _emitWarning = process.emitWarning.bind(process);
process.emitWarning = (warning, ...args) => {
  const msg = String(warning);
  if (msg.includes("SQLite") || msg.includes("punycode")) return;
  _emitWarning(warning, ...args);
};

require("dotenv").config();

// ── Init DB before anything else ────────────────────────────────
const { db } = require("./src/config/database");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const authRoutes = require("./src/routes/auth");
const productRoutes = require("./src/routes/products");
const orderRoutes = require("./src/routes/orders");
const paymentRoutes = require("./src/routes/payments");

const app = express();

// ── Vérification des variables d'environnement critiques ─────────────
function checkCriticalEnvVars() {
  const missing = [];
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    missing.push('JWT_SECRET (32+ caractères recommandés)');
  }
  if (!process.env.ADMIN_USERNAME) {
    missing.push('ADMIN_USERNAME');
  }
  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
    missing.push('ADMIN_PASSWORD (12+ caractères recommandés)');
  }
  if (missing.length > 0) {
    console.warn('\n⚠️  ATTENTION: Variables d\'environnement critiques manquantes ou faibles :');
    for (const v of missing) {
      console.warn('   - ' + v);
    }
    console.warn("   → Ajoutez-les dans Vercel Dashboard (Settings > Environment Variables)\n");
  }
}
checkCriticalEnvVars();

// ── Security ─────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));

// ── CORS ─────────────────────────────────────────────────────────
const rawOrigins = process.env.FRONTEND_ORIGINS || "*";
const origins =
  rawOrigins === "*" ? "*" : rawOrigins.split(",").map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, same-origin)
      if (!origin) return callback(null, true);
      // Wildcard: allow everything
      if (origins === "*") return callback(null, true);
      // Check whitelist
      if (origins.includes(origin)) return callback(null, true);
      // In development, also allow null origin (file://)
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  }),
);

// ── Rate Limiting ─────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de requêtes, réessayez dans 15 minutes.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de tentatives de connexion. Réessayez dans 15 minutes.",
  },
});

app.use("/api", globalLimiter);
app.use("/api/auth/login", loginLimiter);

// ── Body Parsing ──────────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Health Check ──────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ ok: true, version: "2.0.0", timestamp: new Date().toISOString() });
});

// ── API Routes ────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// ── 404 pour les routes /api non trouvées ─────────────────────────
app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route API non trouvée : ${req.method} ${req.originalUrl}`,
  });
});

// ── Serve Frontend (toujours actif) ──────────────────────────────
// En servant le frontend depuis le même serveur, le CORS est éliminé.
// Boutique  → http://localhost:3000/
// Admin     → http://localhost:3000/admin/
const adminDir = path.join(__dirname, "../frontend/admin");
const userDir = path.join(__dirname, "../frontend/user");

app.use("/admin", express.static(adminDir));
app.get("/admin", (req, res) =>
  res.sendFile(path.join(adminDir, "login.html")),
);
app.get("/admin/*", (req, res) => {
  const file = req.path.replace("/admin/", "");
  const full = path.join(adminDir, file);
  const fs = require("fs");
  if (fs.existsSync(full) && fs.statSync(full).isFile()) {
    res.sendFile(full);
  } else {
    res.sendFile(path.join(adminDir, "login.html"));
  }
});

app.use("/", express.static(userDir));
app.get("*", (req, res) => {
  const file = req.path.replace("/", "");
  const full = path.join(userDir, file);
  const fs = require("fs");
  if (file && fs.existsSync(full) && fs.statSync(full).isFile()) {
    res.sendFile(full);
  } else {
    res.sendFile(path.join(userDir, "index.html"));
  }
});

// ── Global Error Handler ──────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Erreur serveur interne",
  });
});

// ── Start ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

// Log startup info only in development
function startServer() {
  console.log(`\n🚀  FA2M API v2.0 — http://localhost:${PORT}`);
  console.log(`📦  Environnement  : ${process.env.NODE_ENV || "development"}`);
  console.log(`🔑  Admin          : ${process.env.ADMIN_USERNAME || "admin"}`);
  console.log(
    `💾  Base de données: ${process.env.DB_PATH || "./data/fa2m.db"}`,
  );
  console.log(
    `🌊  Wave           : ${process.env.WAVE_API_KEY ? "✓ configuré" : "✗ non configuré (mode démo)"}`,
  );
  console.log(
    `🟠  Orange Money   : ${process.env.OM_CLIENT_ID ? "✓ configuré" : "✗ non configuré (mode démo)"}\n`,
  );
}

// Start server only if this file is run directly (not imported)
if (require.main === module) {
  app.listen(PORT, startServer);
}

// Export for Vercel/serverless environments
module.exports = app;
