"use strict";

const { Client } = require("pg");
const bcrypt = require("bcryptjs");

// ── PostgreSQL Connection ─────────────────────────────────────────
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL not set in environment variables");
}

const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

client.connect((err) => {
  if (err) {
    console.error("[DB ERROR]", err.message);
    process.exit(1);
  }
  console.log("[✓] PostgreSQL connectée");
});

// ── Schema Initialization ─────────────────────────────────────────
async function initializeDatabase() {
  try {
    // Products table
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        old_price DECIMAL(10, 2),
        badge VARCHAR(50),
        short_desc TEXT,
        long_desc TEXT,
        image TEXT,
        images JSONB DEFAULT '[]',
        rating DECIMAL(2, 1) DEFAULT 4.5,
        reviews INTEGER DEFAULT 0,
        stock INTEGER DEFAULT 10,
        specs JSONB DEFAULT '[]',
        active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(36) PRIMARY KEY,
        prenom VARCHAR(100) NOT NULL,
        nom VARCHAR(100) NOT NULL,
        telephone VARCHAR(20) NOT NULL,
        adresse TEXT NOT NULL,
        email VARCHAR(100),
        items JSONB NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        statut VARCHAR(20) DEFAULT 'nouvelle',
        mode_paiement VARCHAR(50),
        reference_paiement VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Users table (for authentication)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        active INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Payments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id VARCHAR(36) PRIMARY KEY,
        order_id VARCHAR(36) NOT NULL REFERENCES orders(id),
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10),
        provider VARCHAR(50),
        status VARCHAR(20),
        reference VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("[✓] Tables créées/vérifiées");

    // Create admin user if not exists
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin";
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const { rows } = await client.query("SELECT id FROM users WHERE username = $1", [adminUsername]);

    if (rows.length === 0) {
      await client.query(
        "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3)",
        [adminUsername, hashedPassword, "admin"],
      );
      console.log(`[✓] Admin créé: ${adminUsername}`);
    }
  } catch (err) {
    console.error("[INIT ERROR]", err.message);
  }
}

// Initialize on startup
initializeDatabase();

// ── Export ────────────────────────────────────────────────────────
module.exports = { client, initializeDatabase };
