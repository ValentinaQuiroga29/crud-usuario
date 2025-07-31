const pool = require('../mysql');

// Obtener todos los usuarios
exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  return rows;
};

// Crear un usuario
exports.create = async (nombre, correo) => {
  const [result] = await pool.query('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, correo]);
  return { id: result.insertId, nombre, correo };
};

// Actualizar un usuario
exports.update = async (id, nombre, correo) => {
  const [result] = await pool.query('UPDATE usuarios SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id]);
  return result.affectedRows > 0;
};

// Eliminar un usuario
exports.remove = async (id) => {
  const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result.affectedRows > 0;
}; 