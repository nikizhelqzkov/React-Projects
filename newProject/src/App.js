import React, { Component } from "react";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winningNumber: 0,
      tickets: [],
      remainingTickets: 5,
      finished: false
    };
  }

  render() {
    return <div className="App"></div>;
  }
}

export default App;
