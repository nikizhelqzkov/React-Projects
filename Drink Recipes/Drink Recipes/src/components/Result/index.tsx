import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Wrapper } from "./Result.Styles";

type ResultProps = {
  name: string;
  category: string;
  image: string;
  information: string;
};
const Result = ({ name, category, image, information }: ResultProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const moreInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
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

const ResultInfo = ({ info }: { info: string }) => {
  return (
    <Wrapper className="result__info">
      <p>{info}</p>
    </Wrapper>
  );
};
