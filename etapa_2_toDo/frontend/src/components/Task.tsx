
type TaskProps = {
  task: {
    id: number;
    title: string;
    description: string;
    status: "to-do" | "in-progress" | "done";
  }
  onEdit: (task: TaskProps["task"]) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, newStatus: "to-do" | "in-progress" | "done") => void;
};

function Task({task, onDelete, onEdit, onToggleStatus }: TaskProps) {

  const { id, title, description, status } = task;

  return (
    <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md mb-4 mx-4">
      <div className="flex items-center gap-4">
        <input type="checkbox" className="checkbox" onChange={() => onToggleStatus(id, status)} checked={status === "done" } />
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
      <p
        className={`border px-4 py-0.5 rounded-full ${status === "to-do" && "text-red-400"} ${
          status === "done" && "text-green-400"
        } ${status === "in-progress" && "text-blue-400"}`}
      >
        {status}
      </p>
      <div className="flex gap-4">
        <button className="text-blue-400 cursor-pointer hover:underline" onClick={() => onEdit(task)}>
          Editar
        </button>
        <button className="btn bg-red-500 text-white" onClick={() => onDelete(id)}>Eliminar</button>
      </div>
    </div>
  );
}

export default Task;
