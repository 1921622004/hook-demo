import React from 'react';
// import Todo from "./state.js";
// import Width from "./width";
import Todo from "./todo";
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div className="todo-box">
        <Todo/>  
      </div>
    );
  }
}

export default App;
