import React, { useContext } from "react";
import AuthContext from "../auth-context";

const Auth = props => {
  const auth = useContext(AuthContext); // Call to get access tot he Context

  return (
    <React.Fragment>
      <h4>Demo only - Set login state through Context API</h4>
      <button onClick={auth.login}>Log In!</button>
    </React.Fragment>
  );
};

export default Auth;
