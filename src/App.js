import React, { Component } from "react";
import Header from "./components/Header";
import Todo from "./components/Todo";
import Auth from "./components/Auth";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <hr />
        <Todo />
        <Auth />
      </div>
    );
  }
}

export default App;
