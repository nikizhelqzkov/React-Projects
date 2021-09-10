import styled from "styled-components";
import backgroundImage from "../../assets/images/header.jpg";
export const Wrapper = styled.header`
    min-height: 1000px;
    background-color: #000;
    width:100%;
    position: relative;
    @media(max-width:997px){
      min-height: 500px;
    }
    @media(max-width:507px){
      min-height: 300px;
    }
  ::after {
    content:"";
    position: absolute;
    background: url(${backgroundImage});
    background-position: center;
    background-size: cover;
    min-height: 1000px;
    width:100%;
    opacity: .5;
    top:0;
    @media(max-width:997px){
      min-height: 500px;
    }
    @media(max-width:507px){
      min-height: 300px;
    }
  }
  .header__inner{
    opacity: 1;
    position: relative;
    z-index: 5;
    color: #fff;
    text-align: center;
    /* margin: auto 0; */
    display: flex;
    padding-top: 20%;
    flex-direction: column;
    justify-content: center;
    h1{
      font-size: 3rem;
    }
    h2{
      font-size: 1.5rem;
    }
    @media(max-width:997px){
      h1{
        font-size: 2rem;
      }
      h2{
        font-size: 1rem;
      }
    }
    @media(max-width:407px){
      h1{
        font-size: 1.5rem;
      }
      h2{
        font-size: 1rem;
      }
    }
  }
`;
