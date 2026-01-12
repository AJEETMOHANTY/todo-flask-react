const API_URL = "http://127.0.0.1:5000/tasks";

export const getTasks = async () =>
  (await fetch(API_URL)).json();

export const addTask = async (title) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

export const updateTask = async (id) =>
  fetch(`${API_URL}/${id}`, { method: "PUT" });

export const deleteTask = async (id) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" });
