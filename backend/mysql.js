const mysql = require('mysql2/promise');
const { db } = require('./config');

const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  port: db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Chequeo de conexión inicial
(async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Conexión a la base de datos exitosa');
  } catch (err) {
    console.error('Error de conexión a la base de datos:', err);
  }
})();

module.exports = pool; 