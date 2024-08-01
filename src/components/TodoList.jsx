import PropTypes from "prop-types";

function TodoList({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.text}
          <button onClick={() => toggleComplete(todo.id)}>
            {todo.completed ? "未完了にする" : "完了にする"}
          </button>
          <button onClick={() => deleteTodo(todo.id)}>削除</button>
        </li>
      ))}
    </ul>
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
};

export default TodoList;
