import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    setTasks(await getTasks());
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async () => {
    if (!title) return;
    await addTask(title);
    setTitle("");
    loadTasks();
  };

  return (
    <div className="container">
      <h2>To-Do App</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button onClick={() => updateTask(task.id).then(loadTasks)}>
              ✔
            </button>
            <button onClick={() => deleteTask(task.id).then(loadTasks)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
