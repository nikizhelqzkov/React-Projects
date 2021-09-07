import styled from "styled-components";

export const Wrapper = styled.nav`
  background-color: #367690;
  width: 100%;
  padding: 2rem;
  .nav--full{
      list-style-type: none;
      padding-left: 0;
      justify-content: center;
      &__items{
          padding: 1rem;
          a{
              color: #fff;
              font-size: 1.5rem;
              text-decoration: none;
              font-family: "Karla","Helvetica Neue",helvetica,arial,sans-serif;
              line-height: 1.5;
              padding: 1.3rem 1.5rem ;
              transition: all .2s ease-in-out;
              @media(max-width:1200px){
                  font-size: 1rem;
              }

              &:hover{
                background-color: #4498BA;
              }
              &.current{
                  background-color: #4498BA;
              }
          }
      }
  }
`;
