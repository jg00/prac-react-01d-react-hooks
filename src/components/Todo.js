import React, { useState, useEffect } from "react";
import axios from "axios";

const todo = props => {
  const [todoName, setTodoName] = useState("");
  const [submittedTodo, setSubmittedTodo] = useState(null);
  const [todoList, setTodoList] = useState([]);

  // Get data once only
  useEffect(() => {
    // No second argument - executes after every render cycle completes.
    // Second argument passed as an array of item(s) to watch out for changes (like an 'if' check). Behaves like componentDidUpdate().
    // Second argument set to [] to run once - like componentDidMount().
    axios
      .get("https://react-hooks-fundamentals.firebaseio.com/todos.json")
      .then(res => {
        // console.log(res.data);
        const todoData = res.data; // { key : { name: 'Learn Hooks' } }
        const todos = [];
        for (let key in todoData) {
          todos.push({ id: key, name: todoData[key].name });
        }
        setTodoList(todos);
      });

    // Clean up phase after your last useEffect() basically.  Will be executed depending on second argument ie ([], [specific variable(s)], or left empty to run on every render cycle).
    return () => {
      console.log("Cleanup: todo component unmounted on useEffect() one.");
    };
  }, []); // [] will run useEffect() only when component rendered and when unmounted.

  // Example scenario to clean up event listeners so we only have one.
  const mouseMoveHandler = event => {
    // console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);

    // Clean up to ensure we only have one listener at a time because the old one gets cleaned up when the effect is applied again.
    return () => {
      console.log("Cleanup: todo component unmounted on useEffect() two.");
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []); // Note having [] argument has the effect of .addEventListener executed only on onComponentDidMount and clean up executes only on onComponentDidUnmount.

  useEffect(() => {
    if (submittedTodo) {
      setTodoList(todoList.concat(submittedTodo));
    }
  }, [submittedTodo]); // Only run when there is a change in submittedTodo state.

  const inputChangeHandler = event => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    axios
      .post(
        "https://react-hooks-fundamentals.firebaseio.com/todos.json",
        { name: todoName } // Firebase requires object
      )
      .then(res => {
        /* 
          Note that at the time of entry into a function our variable values 
          which we get from outside are locked in. This leads to problem where we
          do not update our UI correctly. So entering this function withing the 5 seconds below
          means we are using and updating the same variable values for the todoList during that time frame.
        */

        setTimeout(() => {
          // console.log(res.data); // returns {name: "-LfeR6IXsQ2YfMAi6X7N"}
          const todoItem = { id: res.data.name, name: todoName };

          // setTodoList(todoList.concat(todoItem)); // Update in useEffect()
          setSubmittedTodo(todoItem); // Set state and watch for changes using useEffect(()=> {..}, submittedTodo)
        }, 5000);
      })
      .catch(err => console.log(err));
  };

  const displayTodo = () =>
    todoList.map(todo => <li key={todo.id}>{todo.name}</li>);

  return (
    <React.Fragment>
      <h4>To Do Component</h4>
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
