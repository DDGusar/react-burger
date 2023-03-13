import styles from "./forgotPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { FC, FormEvent } from "react";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useForm } from "../../services/hooks/useForm";
import { forgotPasswordUser } from "../../services/actions/user";
import * as selectors from "../../services/selectors";
import { TLocation } from "../../services/types/data";

export const ForgotPassword: FC = () => {
  const { values, onChange } = useForm({
    email: "",
  });

  const dispatch = useDispatch();
  const location = useLocation<TLocation>();
  const user = useSelector(selectors.user);

  const forgotSuccess = useSelector(selectors.forgotPasswordSuccess);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPasswordUser(values.email));
  };
  if (forgotSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
          state: { from: location.pathname },
        }}
      />
    );
  }
  if (user) {
    return <Redirect to={"/"} />;
  }
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${styles.form} mb-15`} onSubmit={handleSubmit}>
        <Input
          type={"email"}
          placeholder={"Укажите е-mail"}
          onChange={onChange}
          value={values.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
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
