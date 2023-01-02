import styles from "./resetPassword.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "../../utils/utils";
import { resetPasswordUser } from "../../services/actions/user";
export const ResetPassword = () => {
  const { values, onChange, setValues, onSubmit } = useForm({
    password: "",
    token: "",
  });
  const dispatch = useDispatch();
  const resetSuccess = useSelector((store) => store.user.resetPasswordSuccess);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordUser(values.password, values.token));
  };
  if (resetSuccess) {
    return <Redirect to={"/login"} />;
  }
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
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
        <Button htmlType="button" type="primary" size="medium">
          Сохранить
        </Button>
      </form>{" "}
      <p className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
        <Link to="/login">
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass="pl-2 pb-2"
            onClick={handleSubmit}
          >
            Войти
          </Button>
        </Link>
      </p>
    </section>
  );
};
