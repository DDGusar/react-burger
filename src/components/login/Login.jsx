import React, { useState } from "react";
import styles from "./login.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { useForm } from "../../utils/utils";
export const Login = () => {
  const { values, onChange, setValues, onSubmit } = useForm({
    email: "",
    password: "",
  });
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form className={`${styles.form} mb-20`} onSubmit={onSubmit}>
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
        <Button htmlType="button" type="primary" size="medium">
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
