import React, { Component } from "react";

class ChatZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
         { author: "IT_SERVICE", content: "WELCOME TO THE CHAT" },
         { author: "IT_SERVICE", content: "START CHATING" },
        // { author: "Ivan", content: "What's up" },
        // { author: "Nikol", content: "Nothing" },
        // { author: "Ivan", content: "Ok,bye" },
      ],
      name: "",
      text: "",
    };
  }

  renderChat() {
    const arr = this.state.messages.map((value, index) => {
      return (
        <p key={index}>
          <b>{value.author}: </b>
          {value.content}
        </p>
      );
    });
    return arr;
  }

  handlerInput = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  newM = (event) => {
    event.preventDefault();
    let name = this.state.name;
    let text = this.state.text;
    this.state.messages.push({ author: name, content: text }); 
    this.setState({ name: "", text: "" });
    console.log(this.state.messages)
  };

  render() {
    return (
      <div style={{ backgroundColor: "coral", marginTop: "15px", padding: 20 }}>
        <h2>CHAT ZONE</h2>
        {this.renderChat()}
        <div id="chat"></div>
        <form onSubmit={this.newM}>
          <label>Name: </label>
          <input
            type="text"
            id="name"
            value={this.state.name}
            onChange={this.handlerInput}
          ></input>
          <label>Text: </label>
          <input
            type="text"
            id="text"
            value={this.state.text}
            onChange={this.handlerInput}
          ></input>
          <input type="submit" value="Send"></input>
        </form>
      </div>
    );
  }
}

export default ChatZone;
