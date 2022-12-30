import styles from "./register.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/utils";
export const Register = () => {
  const { values, onChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>Регистрация</h1>
      <form className={`${styles.form} mb-20`}>
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
        <Button htmlType="button" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive`}>
        Уже зарегистрированы?
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          extraClass="pl-2 pb-2"
        >
          Войти
        </Button>
      </p>
    </section>
  );
};
