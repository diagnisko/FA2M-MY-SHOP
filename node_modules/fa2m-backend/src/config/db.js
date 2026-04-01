// db.js — Abstraction auto SQLite <-> PostgreSQL
const bcrypt = require('bcryptjs');
const isPg = !!process.env.PG_URL || !!process.env.DATABASE_URL;

let db, query, seedAdminAndProducts;

if (isPg) {
  // PostgreSQL
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.PG_URL || process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });
  query = (text, params=[]) => pool.query(text, params);

  // Seed admin & products (à appeler manuellement)
  seedAdminAndProducts = async () => {
    // Admin
    const admin = await query('SELECT COUNT(*) FROM admin_users');
    if (parseInt(admin.rows[0].count, 10) === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'fa2m2024';
      const hash = bcrypt.hashSync(password, 10);
      await query('INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)', [username, hash]);
      console.log(`✓ Compte admin créé : ${username}`);
    }
    // Produits (exemple, à adapter selon ton besoin)
    // ...
  };

  db = { query };
} else {
  // SQLite
  const { db: sqliteDb, seedDefaultProducts } = require('./database');
  db = sqliteDb;
  query = (sql, params=[]) => {
    // Simple SELECT/INSERT abstraction
    if (/^select/i.test(sql)) return { rows: db.prepare(sql).all(...params) };
    if (/^insert|update|delete/i.test(sql)) return db.prepare(sql).run(...params);
    return db.exec(sql);
  };
  seedAdminAndProducts = seedDefaultProducts;
}

module.exports = { db, query, seedAdminAndProducts, isPg };
