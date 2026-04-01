// Connexion PostgreSQL pour FA2M (Vercel Ready)
const { Pool } = require('pg');

const PG_URL = process.env.PG_URL || process.env.DATABASE_URL;
if (!PG_URL) {
  throw new Error('PG_URL (ou DATABASE_URL) manquant dans .env');
}

const pool = new Pool({
  connectionString: PG_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Utilitaire pour requêtes simples
async function query(text, params) {
  const res = await pool.query(text, params);
  return res;
}

module.exports = { pool, query };
