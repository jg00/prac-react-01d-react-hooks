import React, { useContext } from "react";
import AuthContext from "../auth-context";

const Auth = props => {
  const auth = useContext(AuthContext); // Call to get access tot he Context

  return (
    <React.Fragment>
      <h4>Context API Demo</h4>
      <p>
        Click 'Log In!' to update the authStatus state set up in App.js to get
        access to the Todo page via Todo List button.
      </p>
      <button onClick={auth.login}>Log In!</button>
    </React.Fragment>
  );
};

export default Auth;
