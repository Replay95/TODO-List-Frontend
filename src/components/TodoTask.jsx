import { useState } from "react";
import PropTypes from "prop-types";

function TodoTask({ todos, toggleComplete, deleteTodo, updateTodoText }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={`${todo.id}_${index}`}
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

  function handleEditToggle() {
    setIsEditing(!isEditing);
    setNewText(todo.text);
  }

  async function handleUpdate() {
    await updateTodoText(todo.id, newText);
    setIsEditing(false);
  }

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
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="checkbox"
        />
        <button onClick={() => deleteTodo(todo.id)}>削除</button>
      </div>
    </li>
  );
}

TodoTask.propTypes = {
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

export default TodoTask;
