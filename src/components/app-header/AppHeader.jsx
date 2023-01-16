import React from "react";
import {
  Logo,
  BurgerIcon,
  ProfileIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, Link } from "react-router-dom";
import styles from "./appHeader.module.css";

const AppHeader = () => {
  const location = useLocation();
  return (
    <header className={`${styles.header} pt-4 pb-4`}>
      <nav>
        <ul className={`${styles.list} pr-5 pl-5`}>
          <li className={` pr-5 pl-5 pt-4 pb-4`}>
            <NavLink
              exact
              to="/"
              className={`${styles.list__item}  text_color_inactive`}
              activeClassName={`${styles.activeList__item}`}
            >
              <BurgerIcon
                type={location.pathname === "/" ? "primary" : "secondary"}
              />
              <p className={` text text_type_main-default`}>Конструктор</p>
            </NavLink>
          </li>
          <li className={` pr-5 pl-5 pt-4 pb-4`}>
            <NavLink
              to="/orders"
              className={`${styles.list__item}  text_color_inactive`}
              activeClassName={`${styles.activeList__item}`}
            >
              <ListIcon
                type={location.pathname === "/orders" ? "primary" : "secondary"}
              />
              <p className={`text text_type_main-default`}>Лента заказов</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to="/">
        <Logo />
      </Link>
      <div className={`${styles.profile} pr-5 pl-5 pt-4 pb-4`}>
        <NavLink
          exact
          to="/profile"
          className={`${styles.list__item}  text_color_inactive`}
          activeClassName={`${styles.activeList__item}`}
        >
          <ProfileIcon
            type={location.pathname === "/profile" ? "primary" : "secondary"}
          />
          <p className={` text text_type_main-default`}>Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
