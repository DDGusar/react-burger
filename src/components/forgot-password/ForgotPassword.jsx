import styles from "./forgotPassword.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/utils";
export const ForgotPassword = () => {
  const { values, onChange, setValues } = useForm({
    email: "",
  });
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${styles.form} mb-20`}>
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
        <Button htmlType="button" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className={`text text_type_main-default text_color_inactive`}>
        Вспомнили пароль?
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
