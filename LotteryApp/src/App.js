import React, { Component } from "react";
import "./App.css";
import Lottery from "./Components/Lottery";
import LotteryTicket from "./Components/LotteryTicket";
import Final from "./Components/Final";
import { registerTicket } from "./Helper/actions";
import { getRandomNumber } from "./Helper/utils";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winningNumber: getRandomNumber(),
      tickets: [],
      remainingTickets: 5,
      finished: false,
    };

    this.registerTicket = registerTicket.bind(this);
  }

  renderApp() {
    const actions = {};
    actions.registerTicket = this.registerTicket;
    return (
      <Lottery
        actions={actions}
        remainingTickets={this.state.remainingTickets}
      />
    );
  }

  render() {
    console.log(this.state.tickets);
    return <div className="App">{this.renderApp()}</div>;
  }
}

export default App;
