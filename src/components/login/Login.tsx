import React, { FC, FormEvent } from "react";
import styles from "./login.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { authUser } from "../../services/actions/user";
import { useForm } from "../../services/hooks/useForm";
import * as selectors from "../../services/selectors";
import { TLocation } from "../../services/types/data";

export const Login: FC = () => {
  const { values, onChange } = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const user = useSelector(selectors.user);
  const exitRequest = useSelector(selectors.exitRequest);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authUser(values.email, values.password));
  };
  const location = useLocation<TLocation>();
  if (user && !exitRequest) {
    return <Redirect to={location.state?.from || "/"} />;
  }
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form className={`${styles.form} mb-15`} onSubmit={handleSubmit}>
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
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive pl-10`}>
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
      <p className={`text text_type_main-default text_color_inactive pl-10`}>
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
