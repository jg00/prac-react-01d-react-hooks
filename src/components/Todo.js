import React, { useState } from "react";
import axios from "axios";

const todo = props => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const inputChangeHandler = event => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    axios
      .post(
        "https://react-hooks-fundamentals.firebaseio.com/todos.json",
        { name: todoName } // Firebase requires object
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
