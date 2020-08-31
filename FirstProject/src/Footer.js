import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div style={{ color: this.props.color, backgroundColor: "gray", margin: '0' }}>
        <ul>
          <h3>Footer</h3>
          <li>FB</li>
          <li>Instagram</li>
          <li style={{ color: "Red",paddingTop:'10px'}}>
            <strong>Author: {this.props.children}</strong>
          </li>
        </ul>
        <hr/>
        <h6 style={{ paddingLeft: "30px",marginTop:'-5px' }}>
          Всички права запазени {new Date().getFullYear()} година
        </h6>
      </div>
    );
  }
}

export default Footer;
