import React, { Component } from "react";

class Main extends Component {
  render() {
    const text = "Here is your varaible!";
    const paragraph = <p>{"Hello , today is the day!!".toUpperCase()}</p>;
    return (
      <div style={{ color: this.props.color, backgroundColor: this.props.bC, margin: '0' }}>
        <h1>Hello</h1>
        <h3>Zdr</h3>
        <p>{text}</p>
        {paragraph}
      </div>
    );
  }
}

export default Main;
