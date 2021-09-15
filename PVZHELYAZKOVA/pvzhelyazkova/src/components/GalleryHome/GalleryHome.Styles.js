import styled from "styled-components";
export const Wrapper = styled.div`
  img {
    height: 700px;
    @media (max-width: 997px) {
      height: 500px;
    }
    @media (max-width: 768px) {
      height: 400px;
    }
    @media (max-width: 500px) {
      height: 300px;
    }
    @media (max-width: 300px) {
      height: 200px;
    }
  }
`;
