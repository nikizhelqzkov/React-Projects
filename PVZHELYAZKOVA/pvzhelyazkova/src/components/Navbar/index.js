import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Wrapper } from "./Navbar.Styles";
const Navbar = ({ section }) => {
  const currentActiveClass = (text) => {
    return section === text ? "current" : "";
  };
  const [toggle, isToggle] = useState(false);
  const changeTitle = (text) => {
    switch (text) {
      case "home":
        document.title = "Мария Желязкова";
        break;
      case "contacts":
        document.title = "Контакти";
        break;
      case "autobiography":
        document.title = "Автобиография";
        break;
      case "activity":
        document.title = "Дейности";
        break;
      case "qualification":
        document.title = "Квалификация";
        break;

      default:
        document.title = "Грешна страница";
        break;
    }
  };
  useEffect(() => {
    changeTitle(section);
  });
  return (
    <Wrapper>
      <ul className="d-none d-lg-flex nav--full">
        <li className="nav--full__items">
          <NavLink to="/" className={currentActiveClass("home")}>
            Начало
          </NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink
            to="/autobiography"
            className={currentActiveClass("autobiography")}
          >
            Автобиография
          </NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink
            to="/qualification"
            className={currentActiveClass("qualification")}
          >
            Квалификация
          </NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink to="/activity" className={currentActiveClass("activity")}>
            Дейности
          </NavLink>
        </li>
        <li className="nav--full__items">
          <NavLink to="/contacts" className={currentActiveClass("contacts")}>
            Контакти
          </NavLink>
        </li>
      </ul>
      <div className="nav--mobile d-lg-none">
        <div
          className="nav--mobile__header row"
          onClick={() => isToggle(!toggle)}
        >
          <div className="col-6">
            <h4>Меню</h4>
          </div>
          <div className="col-6">
            {toggle ? <span className="open"></span> : <span></span>}
          </div>
        </div>
        {toggle && (
          <ul className="d-lg-none nav--mobile__list">
            <li className="nav--mobile__list__items">
              <NavLink to="/" className={currentActiveClass("home")}>
                Начало
              </NavLink>
            </li>
            <li className="nav--mobile__list__items">
              <NavLink
                to="/autobiography"
                className={currentActiveClass("autobiography")}
              >
                Автобиография
              </NavLink>
            </li>
            <li className="nav--mobile__list__items">
              <NavLink
                to="/qualification"
                className={currentActiveClass("qualification")}
              >
                Квалификация
              </NavLink>
            </li>
            <li className="nav--mobile__list__items">
              <NavLink
                to="/activity"
                className={currentActiveClass("activity")}
              >
                Дейности
              </NavLink>
            </li>
            <li className="nav--mobile__list__items">
              <NavLink
                to="/contacts"
                className={currentActiveClass("contacts")}
              >
                Контакти
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </Wrapper>
  );
};
export default Navbar;
