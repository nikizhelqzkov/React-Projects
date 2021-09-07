import React from "react";
import { NavLink } from "react-router-dom";
import { Wrapper } from "./Navbar.Styles";
const Navbar = ({ section }) => {
  const currentActiveClass = (text) => {
    return section === text ? "current" : "";
  };
  return (
    <Wrapper>
      <ul className="d-none d-lg-flex nav--full">
        <li className="nav--full__items">
          <NavLink to="/" className={currentActiveClass('home')}>
            Начало
          </NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink to="/autobiography" className={currentActiveClass('autobiography')}>Автобиография</NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink to="/qualification" className={currentActiveClass('qualification')}>Квалификация</NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink to="/activity" className={currentActiveClass('activity')}>Дейности</NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink to="/contacts" className={currentActiveClass('contacts')}>Контакти</NavLink>
        </li>
      </ul>
    </Wrapper>
  );
};
export default Navbar;
