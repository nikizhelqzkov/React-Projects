import React from "react";
import { Wrapper } from "./Button.Styles";
const Button = ({ header, callback }) => (
  <Wrapper onClick={callback}>{header}</Wrapper>
);
export default Button;
