import styled from "styled-components";

export const Wrapper = styled.footer`
  padding: 5rem;
  background-color: #a4c4d5;
  @media (max-width: 997px) {
    padding: 2rem;
  }
  @media (max-width: 500px) {
    padding: 1rem;
  }

  .footer--map {
    width: 70%;
    height: 400px;
    margin-left: 10%;
    @media (max-width: 1300px) {
      width: 80%;
    }
    @media (max-width: 997px) {
      width: 100%;
      margin: 0;
      margin-bottom: 2rem;
    }
    @media (max-width: 500px) {
      height: 300px;
    }
    @media (max-width: 300px) {
      height: 200px;
    }
  }
  .footer--calendar {
    width: 70%;
    height: 400px;
    margin: 0 auto;
    @media (max-width: 1300px) {
      width: 80%;
    }
    @media (max-width: 997px) {
      width: 100%;
    }
  }

  .react-calendar__viewContainer {
    display: flex;
    /* margin-top: 25px; */
    align-items: center;
    line-height: 2;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 1.5rem 0.5rem;
    line-height: 2;
  }
  .footer__list {
    &--title {
      text-align: center;
      font-size: 1rem;
      font-weight: bold;
      @media (max-width: 997px) {
        font-size: 1.5rem;
      }
      @media (max-width: 607px) {
        font-size: 1rem;
      }
    }
  }
  .footer__coppyright {
    text-align: center;
    margin-top: 2rem;
    &__header,
    &__author {
      font-size: 1.2rem;
      @media (max-width: 500px) {
        font-size: 1rem;
      }
    }
    &__header {
      margin-bottom: 1rem;
      @media (max-width: 400px){
          margin-bottom: .5rem;
      }
    }
    &__author {
      a {
        text-decoration: none;
        cursor: pointer;
        color: #000;
        font-weight: bold;
        transition: 0.3s ease-in-out;
        display: inline-block;
        margin-left: 1rem;
        vertical-align: middle;
        @media (max-width: 400px) {
          display: block;
          text-align: center;
          margin-top: .5rem;
          margin-left: 0;
        }
        &:hover {
          font-size: 1.5rem;
          color: #fff1ad;
          padding-top: 7px;
          @media (max-width: 500px) {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
`;
