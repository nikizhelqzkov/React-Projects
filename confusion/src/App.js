import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "../src/redux/configureStore";

const store = ConfigureStore();
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
