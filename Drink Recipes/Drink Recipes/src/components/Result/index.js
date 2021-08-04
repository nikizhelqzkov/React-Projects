import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Wrapper } from "./Result.Styles";
import ResultInfo from "../ResultInfo";
const Result = ({ name, category, image, information }) => {
  const [isOpen, setOpen] = useState(false);
  const moreInfo = (e) => {
    e.preventDefault();
    setOpen(!isOpen);
  };
  return (
    <Wrapper className="container result">
      {isOpen ? (
        <ResultInfo info={information} />
      ) : (
        <div className="result__header row">
          <h2>{name}</h2>
          <h3>Category: {category}</h3>
        </div>
      )}

      <div className="result__main row">
        <img src={image} alt={name} />
      </div>
      <div className="result__footer row">
        {isOpen ? (
          <button onClick={moreInfo}>Less Info</button>
        ) : (
          <button onClick={moreInfo}>More Info</button>
        )}
      </div>
    </Wrapper>
  );
};

export default Result;
