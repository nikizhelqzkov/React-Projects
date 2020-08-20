import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    const text = "Here is your varaible!";
    const paragraph = <p>{"Hello , today is the day!!".toUpperCase()}</p>;
    return (
      <div className="App">
        <h1>Hello</h1>
        <h3>Zdr</h3>
        <p>{text}</p>
        {paragraph}
      </div>
    );
  }
}

export default App;
