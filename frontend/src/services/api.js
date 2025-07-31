const API_URL = 'http://localhost:3000/usuarios';

export async function getUsuarios() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function crearUsuario(nombre, correo) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo })
  });
  return res.json();
}

export async function actualizarUsuario(id, nombre, correo) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, correo })
  });
  return res.json();
}

export async function eliminarUsuario(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE' });
  return res.json();
} 