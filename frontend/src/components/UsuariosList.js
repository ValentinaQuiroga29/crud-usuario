import React, { useEffect, useState } from 'react';
import { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../services/api';

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editCorreo, setEditCorreo] = useState('');
  const [error, setError] = useState('');

  const fetchUsuarios = async () => {
    try {
      const res = await getUsuarios();
      setUsuarios(res.data || []);
    } catch (error) {
      setError('Error al cargar usuarios');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const validateForm = (nombre, correo) => {
    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    if (!correo.trim()) {
      setError('El correo es obligatorio');
      return false;
    }
    if (!isValidEmail(correo.trim())) {
      setError('El formato del correo no es válido');
      return false;
    }
    setError('');
    return true;
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    if (!validateForm(nombre, correo)) return;
    
    try {
      const res = await crearUsuario(nombre, correo);
      if (res.success) {
        setNombre('');
        setCorreo('');
        setError('');
        fetchUsuarios();
      } else {
        setError(res.error);
      }
    } catch (error) {
      setError('Error al crear usuario');
    }
  };

  const handleEditar = (usuario) => {
    setEditId(usuario.id);
    setEditNombre(usuario.nombre);
    setEditCorreo(usuario.correo);
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!validateForm(editNombre, editCorreo)) return;
    
    try {
      const res = await actualizarUsuario(editId, editNombre, editCorreo);
      if (res.success) {
        setEditId(null);
        setEditNombre('');
        setEditCorreo('');
        setError('');
        fetchUsuarios();
      } else {
        setError(res.error);
      }
    } catch (error) {
      setError('Error al actualizar usuario');
    }
  };

  const handleEliminar = async (id) => {
    try {
      const res = await eliminarUsuario(id);
      if (res.success) {
        fetchUsuarios();
      } else {
        setError(res.error);
      }
    } catch (error) {
      setError('Error al eliminar usuario');
    }
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditNombre('');
    setEditCorreo('');
    setError('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Gestión de Usuarios</h2>
      
      {error && (
        <div style={{ 
          backgroundColor: '#ffebee', 
          color: '#c62828', 
          padding: '10px', 
          marginBottom: '20px', 
          borderRadius: '4px' 
        }}>
          {error}
        </div>
      )}

      <form onSubmit={editId ? handleActualizar : handleCrear} style={{ marginBottom: '30px' }}>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            value={editId ? editNombre : nombre}
            onChange={e => editId ? setEditNombre(e.target.value) : setNombre(e.target.value)}
            placeholder="Nombre"
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <input
            type="email"
            value={editId ? editCorreo : correo}
            onChange={e => editId ? setEditCorreo(e.target.value) : setCorreo(e.target.value)}
            placeholder="Correo electrónico"
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
        </div>
        <div>
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#4caf50', 
              color: 'white', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '4px',
              marginRight: '10px',
              cursor: 'pointer'
            }}
          >
            {editId ? 'Actualizar' : 'Crear'}
          </button>
          {editId && (
            <button 
              type="button" 
              onClick={cancelarEdicion}
              style={{ 
                backgroundColor: '#f44336', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        <h3>Lista de Usuarios</h3>
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados</p>
        ) : (
          <div>
            {usuarios.map(usuario => (
              <div 
                key={usuario.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  padding: '15px', 
                  marginBottom: '10px', 
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong>{usuario.nombre}</strong>
                  <br />
                  <small style={{ color: '#666' }}>{usuario.correo}</small>
                </div>
                <div>
                  <button 
                    onClick={() => handleEditar(usuario)}
                    style={{ 
                      backgroundColor: '#2196f3', 
                      color: 'white', 
                      padding: '5px 10px', 
                      border: 'none', 
                      borderRadius: '4px',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleEliminar(usuario.id)}
                    style={{ 
                      backgroundColor: '#f44336', 
                      color: 'white', 
                      padding: '5px 10px', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 