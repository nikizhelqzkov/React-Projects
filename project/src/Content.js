import React, { Component } from "react";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }
  incrementCounter = () => {
    this.setState((prevState) => {
      return { counter: prevState.counter++ };
    });
  };
  decrementCounter = () => {
    this.setState((prevState) => {
      if (prevState.counter <= 0) {
        this.resetCounter()
      }
      return { counter: prevState.counter-- };
    });
  };
  resetCounter = () => {
    this.setState(() => {
      return { counter: 0 };
    });
  };

  render() {
    var d = new Date();
    return (
      <div
        style={{
          color: this.props.color,
          backgroundColor: this.props.bg,
          margin: "0",
        }}
      >
        <p>
          Today is {d.getDate()}-{d.getMonth() + 1}-{d.getFullYear()}
        </p>
        <br />
        <h2>Today's game: Increment Decrement</h2>

        <p>The number is {this.state.counter}</p>
        <button onClick={this.incrementCounter}>Increment</button>
        <button onClick={this.decrementCounter}>Decrement</button>
        <button onClick={this.resetCounter}>Reset</button>
        <p>{this.props.children}</p>
        <small>
          Публикувано на
          {` ${new Date().toDateString()} ${new Date().toLocaleTimeString()}`}
        </small>
      </div>
    );
  }
}

export default Content;
