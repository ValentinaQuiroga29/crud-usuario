const Usuario = require('../models/usuario');

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json({ success: true, data: usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ success: false, error: 'Error al obtener usuarios' });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo } = req.body;
    
    // Validaciones
    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({ success: false, error: 'El nombre es obligatorio y debe ser un string no vacío' });
    }
    
    if (!correo || typeof correo !== 'string' || !correo.trim()) {
      return res.status(400).json({ success: false, error: 'El correo es obligatorio y debe ser un string no vacío' });
    }
    
    if (!isValidEmail(correo.trim())) {
      return res.status(400).json({ success: false, error: 'El formato del correo no es válido' });
    }
    
    const nuevoUsuario = await Usuario.create(nombre.trim(), correo.trim());
    res.status(201).json({ success: true, data: nuevoUsuario });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, error: 'El correo ya está registrado' });
    } else {
      res.status(400).json({ success: false, error: 'Error al crear usuario' });
    }
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo } = req.body;
    
    // Validaciones
    if (!nombre || typeof nombre !== 'string' || !nombre.trim()) {
      return res.status(400).json({ success: false, error: 'El nombre es obligatorio y debe ser un string no vacío' });
    }
    
    if (!correo || typeof correo !== 'string' || !correo.trim()) {
      return res.status(400).json({ success: false, error: 'El correo es obligatorio y debe ser un string no vacío' });
    }
    
    if (!isValidEmail(correo.trim())) {
      return res.status(400).json({ success: false, error: 'El formato del correo no es válido' });
    }
    
    const actualizado = await Usuario.update(id, nombre.trim(), correo.trim());
    if (!actualizado) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }
    res.json({ success: true, data: { id, nombre: nombre.trim(), correo: correo.trim() } });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, error: 'El correo ya está registrado por otro usuario' });
    } else {
      res.status(400).json({ success: false, error: 'Error al actualizar usuario' });
    }
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Usuario.remove(id);
    if (!eliminado) {
      return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
    }
    res.json({ success: true, mensaje: 'Usuario eliminado' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(400).json({ success: false, error: 'Error al eliminar usuario' });
  }
}; 