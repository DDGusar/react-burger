import styles from "./forgotPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "../../utils/utils";
import { forgotPasswordUser } from "../../services/actions/user";
export const ForgotPassword = () => {
  const { values, onChange, setValues } = useForm({
    email: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((store) => store.user.user);
  const forgotSuccess = useSelector(
    (store) => store.user.forgotPasswordSuccess
  );
  const handleSubmit = (e) => {
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
      <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
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
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive`}>
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
