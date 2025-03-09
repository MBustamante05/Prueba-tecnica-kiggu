import express from "express";
import cors from "cors";
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const tasks = [];
let idTask = 0;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ error: "El títiulo y la descripción son obligatorios!" });
  }

  const newTask = { id: ++idTask, title, description, status: status };
  tasks.push(newTask);
  res.status(201).json({ message: "Tarea creada", task: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  const allowedFields = ["title", "description", "status"];

  for (const field of allowedFields) {
    if (req.body[field]) {
      task[field] = req.body[field];
    }
  }

  res.json({ message: "Tarea actualizada", task });
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tasks.splice(taskIndex, 1);
  res.sendStatus(204).json({ message: "Tarea eliminada" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
