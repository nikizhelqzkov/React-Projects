import React from "react";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/">Начало</NavLink>
        </li>
        <li>
          <NavLink to="/autobiography">Автобиография</NavLink>
        </li>
        <li>
          <NavLink to="/qualification">Квалификация</NavLink>
        </li>
        <li>
          <NavLink to="/activity">Дейности</NavLink>
        </li>
        <li>
          <NavLink to="/contacts">Contacts</NavLink>
        </li>
      </ul>
    </>
  );
};
export default Navbar;
