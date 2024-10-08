import { useState } from "react";
import PropTypes from "prop-types";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="タスク入力欄"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">追加</button>
    </form>
  );
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
