const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const dataFilePath = path.join(__dirname, '../db/datos.json');

// Función para leer los datos desde el archivo datos.json
const readData = () => {
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Función para escribir los datos al archivo datos.json
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Obtener todos los medicos
router.get('/', (req, res) => {
  const doctors = readData();
  res.json(doctors);
});

// Crear un nuevo medico
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Nombre y email son requeridos');
  }

  const doctors = readData();

  const newdoctor = {
    id: doctors.length > 0 ? doctors[doctors.length - 1].id + 1 : 1,
    name,
    email
  };

  doctors.push(newdoctor);
  writeData(doctors);

  res.status(201).json(newdoctor);
});

// Actualizar un medico
router.put('/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  const { name, email } = req.body;

  const doctors = readData();
  const doctor = doctors.find(u => u.id === doctorId);

  if (!doctor) {
    return res.status(404).send('medico no encontrado');
  }

  // Actualizar los campos si se han enviado
  doctor.name = name || doctor.name;
  doctor.email = email || doctor.email;

  writeData(doctors);

  res.json(doctor);
});

// Eliminar un medico
router.delete('/:id', (req, res) => {
  const doctorId = parseInt(req.params.id);
  let doctors = readData();

  const updateddoctors = doctors.filter(doctor => doctor.id !== doctorId);

  if (doctors.length === updateddoctors.length) {
    return res.status(404).send('medico no encontrado');
  }

  writeData(updateddoctors);
  res.status(204).send();
});

module.exports = router;