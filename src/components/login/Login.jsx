import React from "react";
import styles from "./login.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "../../services/actions/user";
import { useForm } from "../../utils/utils";
export const Login = () => {
  const { values, onChange, setValues } = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const exitRequest = useSelector((store) => store.user.exitRequest);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authUser(values.email, values.password));
  };
  const location = useLocation();
  if (user && !exitRequest) {
    return <Redirect to={location?.state?.from || "/"} />;
  }
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={onChange}
          value={values.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <PasswordInput
          onChange={onChange}
          value={values.password}
          name={"password"}
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleSubmit}
        >
          Войти
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive`}>
        Вы — новый пользователь?
        <Link to="/register">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-2 pb-2"
          >
            Зарегистрироваться
          </Button>
        </Link>
      </p>
      <p className={`text text_type_main-default text_color_inactive`}>
        Забыли пароль?{" "}
        <Link to="/forgot-password">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-2 pt-2"
          >
            Восстановить пароль
          </Button>
        </Link>
      </p>
    </section>
  );
};
