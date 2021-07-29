import styled from "styled-components";

export const Wrapper = styled.button`
  width: 100px;
  height: 100px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: aqua;
  border: 0;
  color: red;
  cursor: pointer;
  :hover {
    opacity: 0.7;
    background-color: blueviolet;
  }
`;
