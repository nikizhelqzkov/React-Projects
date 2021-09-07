import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/";
import Contacts from "./components/Contacts";
import Qualification from "./components/Qualification";
import Autobiography from "./components/Autobio";
import Activity from "./components/Activity";
import Error from "./components/Error";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/autobiography">
          <Autobiography />
        </Route>
        <Route path="/qualification">
          <Qualification />
        </Route>
        <Route path="/activity">
          <Activity />
        </Route>
        <Route path="/contacts">
          <Contacts />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </>
  );
};

export default App;
