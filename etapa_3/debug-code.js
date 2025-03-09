import express from 'express';

const app = express();
const tasks = [];

// Error 1: Mal uso del req.body: Cuando se trabaja con una ruta con parámetros los valores son recibidos por en req.params, no en req.body;

// Error 2: Código de error incorrecto: Se debe usar el código de error 404 (Not found) para indicar que no se encontró la tarea.

// Error 3: Mal uso de res.send(): Se debe usar res.json() para enviar un objeto JSON como respuesta.


app.get('/tasks/:id', (req, res) => {
  const { id } = req.params; // Se cambia a req.params en lugar de req.body

  const task = tasks.find(t => t.id == id);

  if (!task) {
    res.status(404).json({ error: 'Task not found' }); // Se cambia a 404 Not Found

  } else {
    res.json(task); // Se usa res.json() en lugar de res.send()
  }
});
