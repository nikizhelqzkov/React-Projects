import styled from "styled-components";

export const Wrapper = styled.nav`
  background-color: #367690;
  width: 100%;
  padding: 2rem;
  .nav--full {
    list-style-type: none;
    padding-left: 0;
    justify-content: center;
    &__items {
      padding: 1rem;
      a {
        color: #fff;
        font-size: 1.5rem;
        text-decoration: none;
        font-family: "Karla", "Helvetica Neue", helvetica, arial, sans-serif;
        line-height: 1.5;
        padding: 1.3rem 1.5rem;
        transition: all 0.2s ease-in-out;
        @media (max-width: 1200px) {
          font-size: 1rem;
          &:hover{
              font-size: 1.5rem;
          }
        }

        &:hover {
          background-color: #4498da;
          font-size: 2rem;
        }
        &.current {
          background-color: #4498ba;
        }
      }
    }
  }
  .nav--mobile {
    &__header {
      width: 30%;
      justify-content: center;
      background-color: #fff;
      color: #000;
      margin: 0 auto;
      cursor: pointer;
      padding: 1rem;
      text-align: center;
      @media (max-width: 700px) {
        width: 40%;
      }
      @media (max-width: 600px) {
        width: 50%;
      }
      @media (max-width: 400px) {
        width: 90%;
      }
      span {
        display: inline-block;
        position: relative;
        width: 30px;
        border-top: 2px solid #848484;
        top: -3px;
        left: 0;
        @media (max-width: 300px) {
          width: 20px;
          top: -3px;
        }
        &::after {
          content: "";
          position: absolute;
          left: 0px;
          width: 30px;
          border-bottom: 2px solid #848484;
          top: 8px;
          transition: top 0.3s;
          transform: rotate(0deg);
          @media (max-width: 300px) {
            width: 20px;
            top: 7px;
          }
        }
        &::before {
          content: "";
          position: absolute;
          left: 0px;
          width: 30px;
          border-bottom: 2px solid #848484;
          top: -13px;
          transition: top 0.3s;
          transform: rotate(0deg);
          @media (max-width: 300px) {
            width: 20px;
            top: -10px;
          }
        }
      }
      span.open {
        border: none;
        &::after {
          position: absolute;
          content: "";
          top: 0;
          transform: rotate(-45deg);
        }
        &::before {
          content: "";
          position: absolute;
          top: 0;
          transform: rotate(45deg);
        }
      }
    }
    &__list{
        list-style: none;
        padding-left: 0;
        font-size: 1rem;
        text-align: center;
        padding: 1rem 0;
        &__items{
            padding: 1rem;
            a{
                text-decoration: none;
                font-size: 2rem;
                color: #fff;
                transition: .3s ease-in-out;
                &:hover{
                    font-size: 2.5rem;
                    color: #fff1ad;
                }
                @media(max-width:350px){
                    font-size: 1.5rem;
                    &:hover{
                        font-size: 2rem;
                    }
                }
            }
        }
    }
  }
`;
