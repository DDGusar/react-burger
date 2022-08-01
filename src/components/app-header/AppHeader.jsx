import React from "react";
import { Logo, BurgerIcon,ProfileIcon,ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./appHeader.module.css";

const AppHeader=()=>{
    return(
        <header className={styles.header}>
            <nav>
                <ul className={`${styles.list} pt-4 pr-5 pb-4 pl-5`}>
                    <li className={styles.list__item}>
                        <BurgerIcon type="primary" />
                        <a className="text text_type_main-default">Конструктор</a>
                    </li>
                    <li className={styles.list__item}>
                        <ListIcon type="secondary" />
                        <a className="text text_type_main-default text_color_inactive">Лента заказов</a>
                    </li>
                </ul>
            </nav>
            <Logo className="p-4"></Logo>
            <div className={styles.profile}>
                <ProfileIcon type="secondary"/>
                <a className="text text_type_main-default text_color_inactive">Личный кабинет</a>
            </div>
        </header>
    )
}

export default AppHeader;