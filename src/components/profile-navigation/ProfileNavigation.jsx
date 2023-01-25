import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { exit } from "../../services/actions/user";
import { deleteCookie } from "../../utils/cookie";
import styles from "./profileNavigation.module.css";
export const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const handleExit = (e) => {
    dispatch(exit());
    deleteCookie("authToken");
    deleteCookie("refreshToken");
  };
  return (
    <nav className={`${styles.navigation}`}>
      <NavLink
        exact
        to="/profile"
        activeClassName={`${styles.activeLink}`}
        className={`${styles.link} text text_type_main-medium text_color_inactive`}
      >
        Профиль
      </NavLink>
      <NavLink
        exact
        to="/profile/orders"
        activeClassName={`${styles.activeLink}`}
        className={`${styles.link} text text_type_main-medium text_color_inactive`}
      >
        История заказов
      </NavLink>
      <NavLink
        exact
        to={{ pathname: "/login", state: { from: true } }}
        onClick={handleExit}
        activeClassName={`${styles.activeLink}`}
        className={`${styles.link} text text_type_main-medium text_color_inactive`}
      >
        Выход
      </NavLink>
      <p className={`${styles.caption} text text_type_main-default mt-20`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </nav>
  );
};
