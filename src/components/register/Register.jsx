import styles from "./register.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "../../utils/utils";
import { registerUser } from "../../services/actions/user";
import * as selectors from "../../services/selectors";
export const Register = () => {
  const { values, onChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const user = useSelector(selectors.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(values.email, values.password, values.name));
  };
  if (user) {
    return <Redirect to={"/"} />;
  }
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>Регистрация</h1>
      <form className={`${styles.form} mb-15`} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive pl-10`}>
        Уже зарегистрированы?
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
