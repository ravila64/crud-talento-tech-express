const express = require('express');
const path = require('path');
const doctorsRouter = require('./routes/doctors');

const app = express();
const port = 3002;

// Middleware para manejar JSON
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Usar las rutas de medicos
app.use('/doctors', doctorsRouter);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
