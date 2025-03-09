import { useEffect, useState } from "react";
import Task from "./components/Task";
import { axiosInstance } from "./utils/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

type TaskProps = {
  id: number;
  title: string;
  description: string;
  status: "to-do" | "in-progress" | "done";
};
function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskProps["status"]>("to-do");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await axiosInstance.get("/tasks");
        setTasks(data);
      } catch (err) {
        toast.error("Error al obtener las tareas: " + err);
      }
    };
    getTasks();
  }, []);

  const addTask = async () => {
    try {
      const { data } = await axiosInstance.post("/tasks", {
        title,
        description,
        status,
      });
      toast.success("Tarea agregada exitosamente!");

      const newTask = data.task;
      setTasks([...tasks, newTask]);
      resetForm();
    } catch (err) {
      toast.error("Error al agregar la tarea: " + err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      toast.error("Error al eliminar la tarea: " + err);
    }
  };

  const editTask = async () => {
    if (editingTaskId === null) return;
    try {
      const { data } = await axiosInstance.put(`/tasks/${editingTaskId}`, {
        title,
        description,
        status,
      });
      const newTask = data.task;
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, ...newTask } : task
        )
      );
      resetForm();
      setEditingTaskId(null);
      toast.success("Tarea actualizada!");
    } catch (err) {
      toast.error("Error al actualizar la tarea: " + err);
    }
  };

  const toggleStatus = async (
    id: number,
    currentStatus: TaskProps["status"]
  ) => {
    const newStatus = currentStatus === "done" ? "to-do" : "done";

    try {
      await axiosInstance.put(`/tasks/${id}`, { status: newStatus });

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
      toast.success("Estado de la tarea actualizado!");
    } catch (error) {
      toast.error("Error al actualizar el estado de la tarea: " + error);
    }
  };
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("to-do");
  };

  const startEditing = (task: TaskProps) => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setEditingTaskId(task.id);
  };
  return (
    <div className="h-min-screen w-[600px] mx-auto py-9">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-4xl mb-4 font-bold text-center text-blue-200">
        Tareas
      </h1>
      <div className="mx-4">
        <div>
          <legend className="fieldset-legend">Título</legend>
          <input
            type="text"
            className="input w-full "
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <legend className="fieldset-legend">Descripción</legend>
          <textarea
            className="textarea w-full"
            placeholder="Type here"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div>
          <legend className="fieldset-legend">Estado</legend>
          <select
            name="status"
            id=""
            className="select w-full"
            onChange={(e) => setStatus(e.target.value as TaskProps["status"])}
            value={status}
          >
            <option value="to-do">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button
          onClick={editingTaskId ? editTask : addTask}
          className="btn btn-primary w-full my-4"
        >
          {editingTaskId ? "Actualizar" : "Agregar tarea"}
        </button>
      </div>

      <hr className="text-gray-500" />

      <div className="mt-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onEdit={startEditing}
            onToggleStatus={toggleStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
