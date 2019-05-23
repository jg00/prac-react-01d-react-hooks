import React, { useState } from "react";

const todo = props => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const inputChangeHandler = event => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
  };

  const displayTodo = () => todoList.map(todo => <li key={todo}>{todo}</li>);

  return (
    <React.Fragment>
      <input
        className="i"
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>{displayTodo()}</ul>
    </React.Fragment>
  );
};

export default todo;
