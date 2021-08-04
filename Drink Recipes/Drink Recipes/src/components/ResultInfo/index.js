import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Wrapper } from "./ResultInfo.Styles";

const ResultInfo = ({ info }) => {
  return (
    <Wrapper className="result__info">
      <p>{info}</p>
    </Wrapper>
  );
};
export default ResultInfo;
