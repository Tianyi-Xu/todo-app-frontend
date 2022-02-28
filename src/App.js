import React, { Component } from "react";
import logo from "./logo.svg";
import TodoApp from "./components/todo/TodoApp";
import './bootstrap.css';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter />*/}
        <TodoApp />
      </div>
    );
  }
}

export default App;
