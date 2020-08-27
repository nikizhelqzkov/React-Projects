import React, { Component } from "react";

class NewContent extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0, count: 0 };
  }

  componentDidMount() {
    this.timer = setInterval(this.incrementCounter, 100);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.counter === 50) {
      this.incrementCount();
      this.setState({ counter: 0 });
    }
    if (prevState.count === 20) {
    
      this.componentWillUnmount();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  incrementCounter = () => {
    this.setState((prevState) => {
      return { counter: prevState.counter++ };
    });
  };
  incrementCount = () => {
    this.setState((prevState) => {
      return { count: prevState.count++ };
    });
  };

  render() {
    return (
      <div
        style={{ backgroundColor: "white", padding: "10px", margin: "10px" }}
      >
        <p>{this.props.children} {this.state.counter + " " + this.state.count}</p>
        
      </div>
    );
  }
}

export default NewContent;
