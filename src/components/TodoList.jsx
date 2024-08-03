import { useState } from "react";
import PropTypes from "prop-types";

function TodoList({ todos, toggleComplete, deleteTodo, updateTodoText }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodoText={updateTodoText}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, toggleComplete, deleteTodo, updateTodoText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setNewText(todo.text);
  };

  const handleUpdate = async () => {
    await updateTodoText(todo.id, newText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleUpdate();
            }
          }}
        />
      ) : (
        <span
          style={{
            textDecoration: todo.completed ? "line-through" : "none",
          }}
          onClick={handleEditToggle}
        >
          {todo.text}
        </span>
      )}
      <div className="task-buttons">
        <button onClick={() => toggleComplete(todo.id)}>
          {todo.completed ? "タスク完了" : "タスク継続"}
        </button>
        <button onClick={() => deleteTodo(todo.id)}>削除</button>
      </div>
    </li>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodoText: PropTypes.func.isRequired,
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  updateTodoText: PropTypes.func.isRequired,
};

export default TodoList;
