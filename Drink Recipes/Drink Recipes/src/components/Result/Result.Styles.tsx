import styled from "styled-components";

export const Wrapper = styled.div`
  &.result {
    background: skyblue;
    margin-top: 1rem;
    border: 5px dotted #000;
    border-radius: 20px;
    padding: 20px;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .result__header {
    h2,
    h3 {
      text-align: center;
    }
    h2 {
      color: red;
      font-size: 2rem;
    }
    h3 {
      font-size: 1.5rem;
      color: coral;
    }
  }
  .result__main {
    margin-top: 1rem;
    max-height: 250px;
    margin-left: 0;
    justify-content: center;
    img {
      height: 100%;
      width: 40%;
    }
  }
  .result__footer {
    margin-top: 1rem;
    justify-content: center;
    margin-left: 0;
    button {
      width: 25%;
      border-radius: 20px;
      background-color: red;
      border: none;
      color: #fff;
      padding: 10px 20px;
      @media (max-width: 1400px) {
        width: 50%;
      }

      &:hover {
        background-color: coral;
      }
    }
  }

  &.result__info {
    padding: 1rem;
    width: 80%;
    margin: 0 auto;
    border: 1px solid black;
    background-color: coral;
    border-radius: 10px;
    p {
      font-size: 1.6rem;
      font-weight: 500;
      color: #faff70;
    }
  }
`;
