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
          <h3>Адрес на Средно училище "Панайот Волов"</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2176.4030710567495!2d26.916740457038905!3d43.26924165487743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a58a5f561a4473%3A0xfb5918d0c83beae8!2z0KHRgNC10LTQvdC-INGD0YfQuNC70LjRidC1IOKAntCf0LDQvdCw0LnQvtGCINCS0L7Qu9C-0LLigJw!5e0!3m2!1sbg!2sbg!4v1631265724538!5m2!1sbg!2sbg"
            style={{ border: 0, width: "70%", height: "300px" }}
            allowFullScreen=""
            loading="lazy"
            title="School map"
            className="footer--map"
          ></iframe>
          <a
            href="https://www.google.com/maps/place/%D0%A1%D1%80%D0%B5%D0%B4%D0%BD%D0%BE+%D1%83%D1%87%D0%B8%D0%BB%D0%B8%D1%89%D0%B5+%E2%80%9E%D0%9F%D0%B0%D0%BD%D0%B0%D0%B9%D0%BE%D1%82+%D0%92%D0%BE%D0%BB%D0%BE%D0%B2%E2%80%9C/@43.2692417,26.9167405,17z/data=!4m5!3m4!1s0x40a58a5f561a4473:0xfb5918d0c83beae8!8m2!3d43.2692674!4d26.9184389"
            target="_blank"
            rel="noreferrer"
          >
            ул. „Съединение“ 100, 9700 Шумен Център, Шумен
          </a>
        </div>
        <div className="footer__list--right col-12 col-lg-6">
          <h3>Календар</h3>
          <Calendar
            onChange={changerDate}
            value={calendarValue}
            locale="bg"
            className="footer--calendar"
          />
        </div>
        <div className="footer__coppyright">
          <h4 className="footer__coppyright__header"> Всички права запазени</h4>
          <h5 className="footer__coppyright__author">
            {copy} Дизайн и програмиране:
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
