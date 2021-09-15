import styled from "styled-components";
export const Wrapper = styled.main`
  &.home__main {
    padding: 3rem;
    background: #97d0ef;
    color: #3e4649;
    text-align: center;
    @media (max-width: 997px) {
      padding: 2rem;
    }
    @media (max-width: 768px) {
      padding: 1rem;
    }
    @media (max-width: 500px) {
      padding: 0;
    }
    h2 {
      font-size: 2.5rem;
      margin-top: 3rem;
      margin-bottom: 4rem;
      &:not(:first-of-type) {
          margin-top: 5rem;
          margin-bottom: 2rem;
      }
      @media (max-width: 997px) {
        font-size: 2rem;
      }
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
      @media (max-width: 500px) {
        font-size: 1rem;
      }
    }
    .home__main__header-img {
      display: block;
      margin: 0 auto;
      @media (max-width: 997px) {
        width: 100%;
      }
    }
  }
`;
