import React from "react";
import { Wrapper } from "./Header.Styles";
const Header = () => {
  return (
    <Wrapper className="header">
      <div className="header__inner">
        <h1>{"Мария Желязкова".toUpperCase()}</h1>
        <h2>
          Воинът не се отказва от това, което обича. Той открива любовта в това,
          което прави!
        </h2>
      </div>
    </Wrapper>
  );
};
export default Header;
