import React from "react";

const Todo = ({ todo, onClickDelete, onClickComplete }) => {
  const clickDelete = (todo) => () => {
    onClickDelete(todo);
  };

  const clickComplete = (todo) => () => {
    onClickComplete(todo);
  };

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={() => onClickDelete(todo)}> Delete </button>
      </span>
    </>
  );
  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
      <span>
        <button onClick={clickDelete(todo)}> Delete </button>
        <button onClick={clickComplete(todo)}> Set as done </button>
      </span>
    </>
  );
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
    >
      <span className="text">{todo.text}</span>
      {todo.done ? doneInfo : notDoneInfo}
    </div>
  );
};

export default Todo;
