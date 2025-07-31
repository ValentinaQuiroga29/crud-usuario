const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const usuariosRouter = require('./routes/usuarios');
const { initializeDatabase } = require('./database');

app.use(cors());
app.use(express.json());
app.use('/usuarios', usuariosRouter);

// Inicializar base de datos y luego arrancar el servidor
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al arrancar el servidor:', error);
  }
}

startServer(); 