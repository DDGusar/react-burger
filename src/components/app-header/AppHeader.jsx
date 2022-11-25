import React from "react";
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";

const AppHeader = () => {
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav>
        <ul className={`${styles.list} pr-5 pl-5`}>
          <li className={`${styles.list__item} pr-5 pl-5 pt-4 pb-4`}>
            <BurgerIcon type="primary" />
            <p className={`text text_type_main-default `}>Конструктор</p>
          </li>
          <li className={`${styles.list__item} pr-5 pl-5 pt-4 pb-4`}>
            <a href="/#" className={`${styles.link}`}>
              <ListIcon type="secondary" />
            </a>
            <a
              href="/#"
              className={`${styles.link} text text_type_main-default text_color_inactive  `}
            >
              Лента заказов
            </a>
          </li>
        </ul>
      </nav>
      <Logo></Logo>
      <div className={`${styles.profile} pr-5 pl-5 pt-4 pb-4`}>
        <a href="/#" className={`${styles.link}`}>
          <ProfileIcon type="secondary" />
        </a>
        <a
          href="/#"
          className={`${styles.link} text text_type_main-default text_color_inactive`}
        >
          Личный кабинет
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
