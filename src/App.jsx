import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:5002/api/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("タスクの取得に失敗しました");
      }
    }
    fetchTodos();
  }, []);

  async function addTodo(text) {
    const newTodo = { text, completed: false };
    try {
      const response = await fetch("http://localhost:5002/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const createdTodo = await response.json();
      setTodos([...todos, createdTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
      setError("タスクの追加に失敗しました");
    }
  }

  async function toggleComplete(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    try {
      const response = await fetch(`http://localhost:5002/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: updatedTodos.find((todo) => todo.id === id).completed,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("タスクの更新に失敗しました");
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`http://localhost:5002/api/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError("タスクの削除に失敗しました");
    }
  }

  return (
    <div className="app-container">
      <h1>TODOリスト</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
