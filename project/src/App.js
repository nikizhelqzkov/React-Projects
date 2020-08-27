import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Main from "./Main";
import NewContent from "./newContent";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header bc="blue" title="ReactJs" />
        <Main bC="red" />
        
        <Content color="red" bg="green">
          История на България
        </Content>
        <NewContent>Auto Counter: </NewContent>
        <Footer>Nikolay Zhelyazkov</Footer>
      </div>
    );
  }
}

export default App;
