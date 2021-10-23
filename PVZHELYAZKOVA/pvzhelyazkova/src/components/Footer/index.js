import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Wrapper } from "./Footer.Styles";
const Footer = () => {
  const [calendarValue, changerDate] = useState(new Date());
  const copy = "\u00a9";
  return (
    <Wrapper className="footer">
      <div className="row footer__list">
        <div className="footer__list--left col-12 col-lg-6">
          <h3 className="footer__list--title">Адрес на Средно училище "Панайот Волов"</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2176.4030710567495!2d26.916740457038905!3d43.26924165487743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a58a5f561a4473%3A0xfb5918d0c83beae8!2z0KHRgNC10LTQvdC-INGD0YfQuNC70LjRidC1IOKAntCf0LDQvdCw0LnQvtGCINCS0L7Qu9C-0LLigJw!5e0!3m2!1sbg!2sbg!4v1631265724538!5m2!1sbg!2sbg"
            allowFullScreen=""
            loading="lazy"
            title="School map"
            className="footer--map"
          ></iframe>
        </div>
        <div className="footer__list--right col-12 col-lg-6">
          <h3 className="footer__list--title">Календар</h3>
          <Calendar
            onChange={changerDate}
            value={calendarValue}
            locale="bg"
            className="footer--calendar"
          />
        </div>
        <div className="footer__coppyright">
          <h4 className="footer__coppyright__header">
            {copy} Всички права запазени
          </h4>
          <h5 className="footer__coppyright__author">
            Дизайн и програмиране:
            <a
              href="https://github.com/nikizhelqzkov"
              target="_blank"
              rel="noreferrer"
            >
              Николай Желязков
            </a>
          </h5>
        </div>
      </div>
    </Wrapper>
  );
};
export default Footer;
