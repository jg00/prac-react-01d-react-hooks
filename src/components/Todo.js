import React, { useState } from "react";

const todo = () => {
  const inputState = useState("");
  const a = event => {
    inputState[1](event.target.value);
  };
  return (
    <React.Fragment>
      <input
        type="text"
        placeholder="Todo"
        value={inputState[0]}
        onChange={a}
      />
      <button type="button">Add</button>
      <ul />
    </React.Fragment>
  );
};

export default todo;
