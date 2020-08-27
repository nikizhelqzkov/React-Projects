import React, { Component } from "react";
class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      gender: "",
    };
  }

  handlerInput = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    var name = this.state.name;
    var email = this.state.email;
    var gender = this.state.gender;
    let d = document.getElementById("new");
    let newName = document.createElement("P");
    let textName = document.createTextNode("Name: " + name);
    newName.appendChild(textName);
    let newEmail = document.createElement("P");
    let textEmail = document.createTextNode("Email: " + email);
    newEmail.appendChild(textEmail);
    let newGender = document.createElement("P");
    let textGender = document.createTextNode("Gender: " + gender);
    newGender.appendChild(textGender);

    d.appendChild(newName);
    d.appendChild(newEmail);
    d.appendChild(newGender);
  };
  render() {
    return (
      <div style={{ backgroundColor: "cyan", marginTop: "5px", padding: 20 }}>
        <h2>User Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Name: </label>{" "}
          <input
            id="name"
            value={this.state.name}
            placeholder="Your Name"
            type="text"
            autoComplete="off"
            onChange={this.handlerInput}
          ></input>
          <br />
          <label>Email: </label>{" "}
          <input
            id="email"
            value={this.state.email}
            placeholder="Your Email"
            type="text"
            autoComplete="off"
            onChange={this.handlerInput}
          ></input>
          <br />
          <label>Gender: </label>{" "}
          <select
            id="gender"
            value={this.state.gender}
            onChange={this.handlerInput}
          >
            <option value="none">None</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <br />
          <input type="submit" value="Confirm"></input>
        </form>
        <hr />
        <div style={{ textAlign: "left" }}>
          <p>
            Name: <b>{this.state.name}</b>
          </p>
          <p>
            Email: <b>{this.state.email}</b>
          </p>
          <p>
            Gender: <b>{this.state.gender}</b>
          </p>
        </div>
        <div id="new" style={{ border: "2px red dashed" }}>
          Result:{" "}
        </div>
      </div>
    );
  }
}

export default User;
