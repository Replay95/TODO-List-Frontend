import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoTask from "./TodoTask";
const BASE_URL = "http://localhost:5002";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const cookieItems = document.cookie.split(";");
  const user_id = cookieItems[cookieItems.length - 1].split("=")[1];

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${BASE_URL}/api/todos/${user_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const todoList = await response.json();
        setTodos(todoList);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("タスクの取得に失敗しました。");
      }
    }
    fetchTodos();
  }, []);

  async function addTodo(text) {
    const newTodo = { text, completed: false, user_id };
    try {
      const response = await fetch(`${BASE_URL}/api/todos/${user_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo, user_id),
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
      const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
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

  async function updateTodoText(id, newText) {
    try {
      const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newText }),
      });
      if (!response.ok) {
        throw new Error("Failed to update todo text");
      }
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error("Error updating todo text:", error);
      setError("タスクの内容更新に失敗しました");
    }
  }

  async function deleteTodo(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/todos/${id}`, {
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
    <div className="app">
      <h1>TODOリスト</h1>
      {error && <p className="error">{error}</p>}
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        <TodoTask
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodoText={updateTodoText}
        />
      </div>
    </div>
  );
}

export default TodoList;
