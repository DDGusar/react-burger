import styles from "./resetPassword.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, FormEvent } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useForm } from "../../services/hooks/useForm";
import { resetPasswordUser } from "../../services/actions/user";
import * as selectors from "../../services/selectors";
import { TLocation } from "../../services/types/data";

export const ResetPassword: FC = () => {
  const { values, onChange } = useForm({
    password: "",
    token: "",
  });
  const dispatch = useDispatch();
  const resetSuccess = useSelector(selectors.resetPasswordSuccess);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetPasswordUser(values.password, values.token));
  };
  const location = useLocation<TLocation>();
  if (location.state?.from !== "/forgot-password") {
    return <Redirect to={"/"} />;
  }
  if (resetSuccess) {
    return <Redirect to={"/login"} />;
  }
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${styles.form} mb-15`} onSubmit={handleSubmit}>
        <PasswordInput
          placeholder="Введите новый пароль"
          onChange={onChange}
          value={values.password}
          name={"password"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={onChange}
          value={values.token}
          name={"token"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button
          disabled={!(values.token && values.password)}
          htmlType="submit"
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </form>{" "}
      <p className={`text text_type_main-default text_color_inactive pl-10`}>
        Вспомнили пароль?
        <Link to="/login">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-2 pb-2"
          >
            Войти
          </Button>
        </Link>
      </p>
    </section>
  );
};
