import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <h1 style={{ backgroundColor: this.props.bc ,margin:'0'}}>
        This is header of {this.props.title}
      </h1>
    );
  }
}

export default Header;
