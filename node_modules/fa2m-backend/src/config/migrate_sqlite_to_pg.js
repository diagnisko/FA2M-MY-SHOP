// Script de migration SQLite → PostgreSQL (manuel)
const sqlite3 = require('sqlite3').verbose();
const { Pool } = require('pg');

const sqlitePath = process.env.DB_PATH || './data/fa2m.db';
const pgUrl = process.env.PG_URL || process.env.DATABASE_URL;
if (!pgUrl) throw new Error('PG_URL manquant');

const db = new sqlite3.Database(sqlitePath);
const pool = new Pool({ connectionString: pgUrl, ssl: { rejectUnauthorized: false } });

async function migrateTable(table, columns) {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM ${table}`, async (err, rows) => {
      if (err) return reject(err);
      for (const row of rows) {
        const keys = Object.keys(row);
        const vals = keys.map(k => row[k]);
        const placeholders = keys.map((_, i) => `$${i+1}`).join(',');
        const sql = `INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`;
        await pool.query(sql, vals);
      }
      resolve();
    });
  });
}

(async () => {
  await migrateTable('admin_users');
  await migrateTable('products');
  await migrateTable('orders');
  console.log('Migration terminée !');
  process.exit(0);
})();
