import styled from "styled-components";

export const Wrapper = styled.button`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: aqua;
  border: 5px solid red;
  color: red;
  cursor: pointer;
  
  width: 33%;
  height: 100px;
  flex-wrap: wrap;

  :hover {
    opacity: 0.7;
    background-color: blueviolet;
  }
`;
