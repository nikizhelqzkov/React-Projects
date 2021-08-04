import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Button, Row } from "react-bootstrap";
import Grid from "./components/Grid";
const App = () => {
  const getData = async (name) => {
    try {
      // const response = await fetch(`https://api.agify.io/?name=${name}`);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`
      );
      const data = await response.json();
      console.log(data.drinks);
      setInfo(data.drinks);
    } catch (error) {
      console.error(error);
    }
  };
  const [input, setInput] = useState("");
  const [value, setValue] = useState("");
  const [info, setInfo] = useState([]);
  useEffect(() => {
    if (value) {
      console.log(value);
      getData(value);
      // console.log(info);
    }
  }, [value]);
  const changeInput = (e) => {
    setInput(e.target.value);
  };
  const getInputVal = (e) => {
    e.preventDefault();
    setInput("");
    setValue(input);
  };
  return (
    <div className="mt-3">
      <Row>
        <h1 className="text-center">Drink recipes</h1>
      </Row>
      <Row className="mt-3">
        <form className="d-flex justify-content-center" onSubmit={getInputVal}>
          <input
            type="text"
            placeholder="Search drink"
            value={input}
            onChange={changeInput}
          />
          <Button className="mx-1" onClick={getInputVal}>
            Search
          </Button>
        </form>
      </Row>
      <Row className="justify-content-center mx-auto">
        {info.length !== 0 ? <Grid results={info} /> : null}
      </Row>
    </div>
  );
};

export default App;
