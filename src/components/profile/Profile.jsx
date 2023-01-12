import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/utils";
import { getUser, updateUser, exit } from "../../services/actions/user";
import { deleteCookie } from "../../utils/cookie";

export const Profile = () => {
  const user = useSelector((store) => store.user.user);
  const updateFailed = useSelector((store) => store.user.updateFailed);
  const expiredToken = useSelector((store) => store.user.expiredToken);
  const dispatch = useDispatch();
  const { values, onChange, setValues } = useForm({
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(values.name, values.email, values.password));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const handleExit = (e) => {
    dispatch(exit());
    deleteCookie("authToken");
    deleteCookie("refreshToken");
  };

  const nameRef = useRef(null);
  // const passwordRef = useRef(null);
  const emailRef = useRef(null);
  const nameClick = () => {
    setTimeout(() => nameRef.current.focus(), 0);
  };
  const emailClick = () => {
    setTimeout(() => emailRef.current.focus(), 0);
  };
  // const passwordClick = () => {
  //   setTimeout(() => passwordRef.current.focus(), 0);
  // };

  useEffect(() => {
    if (updateFailed && !expiredToken) {
      dispatch(updateUser(values.name, values.email, values.password));
    }
  }, [
    dispatch,
    expiredToken,
    updateFailed,
    values.name,
    values.email,
    values.password,
  ]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <section className={styles.content}>
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
      <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          icon={"EditIcon"}
          onIconClick={nameClick}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          ref={nameRef}
        />
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={onChange}
          icon={"EditIcon"}
          onIconClick={emailClick}
          value={values.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          ref={emailRef}
        />
        <PasswordInput
          onChange={onChange}
          value={values.password}
          name={"password"}
          icon="EditIcon"
        />
        <div className={`${styles.buttons}`}>
          <Button
            type="secondary"
            size="medium"
            onClick={handleReset}
            htmlType="button"
          >
            Отмена
          </Button>
          <Button
            disabled={!(values.name && values.email && values.password)}
            type="primary"
            size="medium"
            htmlType="button"
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
};
