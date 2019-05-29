import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";

const todo = props => {
  const [todoName, setTodoName] = useState("");
  // const [submittedTodo, setSubmittedTodo] = useState(null); // Commented out and replaced with useReducer().
  // const [todoList, setTodoList] = useState([]); // Commented out and replaced with useReducer().

  // A reducer in the end is a function that can handle a few different cases
  // and update state in different ways
  // The argument state is current state.  Whatever is returned will the 'new' state.
  // * Note that React will pass these two arguments automatically for us.
  // * By using dispatch(action) we pass this action to the reducer function below that
  // * always receive the latest snapshot of the state.
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter(todo => todo.id !== action.payload);
      default:
        return state;
    }
  };

  /* 
    useReducer:
    Accepts a reducer of type (state, action) => newState, and returns 
    the current state paired with a dispatch method.
  */

  // const [state (*new state set and returned when dispatch action called.), dispatch] = useReducer(reducer, initialArg, init);  --> init could be an initial action you want to execute ex: {type: 'ADD', { item you want to add }}
  const [todoList, dispatch] = useReducer(todoListReducer, []);

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

        // You dispatch an action to update a state in this case todoList.
        // setTodoList(todos); // replaced with useReducer. Here we dispatch an action.
        dispatch({ type: "SET", payload: todos });
      });

    // Clean up phase after your last useEffect() basically.  Will be executed depending on second argument ie ([], [specific variable(s)], or left empty to run on every render cycle).
    return () => {
      console.log("Cleanup: todo component unmounted on useEffect() one.");
    };
  }, []); // [] will run useEffect() only when component rendered and when unmounted.

  // Example scenario to clean up event listeners so we only have one.
  const mouseMoveHandler = event => {
    // console.log(event.clientX, event.clientY); // Commented temporarily.
  };

  useEffect(() => {
    document.addEventListener("mousemove", mouseMoveHandler);

    // Clean up to ensure we only have one listener at a time because the old one gets cleaned up when the effect is applied again.
    return () => {
      console.log("Cleanup: todo component unmounted on useEffect() two.");
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []); // Note having [] argument has the effect of .addEventListener executed only on onComponentDidMount and clean up executes only on onComponentDidUnmount.

  /* Below had to be implemented to avoid display bug issues.
  // Commented out and replaced with useReducer().  
  useEffect(() => {
    if (submittedTodo) {
      // setTodoList(todoList.concat(submittedTodo));  // Replaced with useReducer. Here we dispatch an action.
      dispatch({ type: "ADD", payload: submittedTodo });
    }
  }, [submittedTodo]); // Only run when there is a change in submittedTodo state.
  */

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

          // Commented out and replaced with useReducer().
          // setSubmittedTodo(todoItem); // Set state and watch for changes using useEffect(()=> {..}, submittedTodo)
          dispatch({ type: "ADD", payload: todoItem });
        }, 3000);
      })
      .catch(err => console.log(err));
  };

  const todoRemoveHandler = todoId => {
    axios
      .delete(
        `https://react-hooks-fundamentals.firebaseio.com/todos/${todoId}.json`
      )
      .then(res => {
        dispatch({ type: "REMOVE", payload: todoId });
      })
      .catch(err => console.log(err));
  };

  const displayTodo = () =>
    todoList.map(todo => (
      <li key={todo.id} onClick={todoRemoveHandler.bind(this, todo.id)}>
        {todo.name}
      </li>
    ));

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
