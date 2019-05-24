import React from "react";

/*
    React.createContext() returns a Context object:
    const { Provider, Consumer } = React.createContext()
*/
const authContext = React.createContext({ status: false, login: () => {} }); // this default value will be overridden

export default authContext;
