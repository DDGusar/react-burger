import React, { useState } from "react";
import styles from "./login.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/utils";
export const Login = () => {
  const { values, onChange, setValues } = useForm({ email: "", password: "" });
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
      <form className={`${styles.form} mb-20`}>
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
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pb-2"
        >
          Зарегистрироваться
        </Button>
      </p>
      <p className={`text text_type_main-default text_color_inactive`}>
        Забыли пароль?{" "}
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pt-2"
        >
          Восстановить пароль
        </Button>
      </p>
    </section>
  );
};
