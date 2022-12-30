import styles from "./resetPassword.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/utils";
export const ResetPassword = () => {
  const { values, onChange, setValues } = useForm({
    password: "",
    code: "",
  });
  return (
    <section className={styles.content}>
      <h1 className={`text text_type_main-medium mb-6`}>
        Восстановление пароля
      </h1>
      <form className={`${styles.form} mb-20`}>
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
          value={values.name}
          name={"name"}
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
