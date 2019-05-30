import React, { useState } from "react";
import classes from "./App.module.css";
import Header from "./components/Header";
import Todo from "./components/Todo";
import Auth from "./components/Auth";
import AuthContext from "./auth-context";

const app = props => {
  const [page, setPage] = useState("auth");
  const [authStatus, setAuthStatus] = useState(false);

  const switchPage = pageName => {
    setPage(pageName);
  };

  const login = authState => {
    setAuthStatus(authState);
  };

  return (
    <div>
      <h2 className={classes.AppHeader}>Explore React Hooks</h2>
      <div className={classes.AppContainer}>
        <AuthContext.Provider value={{ status: authStatus, login: login }}>
          <Header
            onLoadToDos={switchPage.bind(this, "todos")}
            onLoadAuth={switchPage.bind(this, "auth")}
          />
          <hr />
          {page === "auth" ? <Auth /> : <Todo />}
        </AuthContext.Provider>
      </div>
    </div>
  );
};
export default app;
