const mysql = require('mysql2/promise');
const { db } = require('./config');

async function initializeDatabase() {
  // Primero conectamos sin especificar la base de datos
  const connection = await mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port
  });

  try {
    // Crear la base de datos si no existe
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${db.database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`Base de datos '${db.database}' creada o ya existente`);
    
    // Usar la base de datos
    await connection.execute(`USE ${db.database}`);
    
    // Crear la tabla usuarios si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        correo VARCHAR(255) NOT NULL UNIQUE
      )
    `);
    console.log('Tabla usuarios creada o ya existente');
    
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    await connection.end();
  }
}

module.exports = { initializeDatabase }; 