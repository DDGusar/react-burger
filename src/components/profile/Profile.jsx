import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./profile.module.css";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useForm } from "../../utils/utils";
import { getUser, updateUser } from "../../services/actions/user";
import { ProfileNavigation } from "../profile-navigation/ProfileNavigation";
import * as selectors from "../../services/selectors";

export const Profile = () => {
  const user = useSelector(selectors.user);
  const updateFailed = useSelector(selectors.updateFailed);
  const expiredToken = useSelector(selectors.expiredToken);
  const dispatch = useDispatch();
  const { values, onChange, setValues } = useForm({
    name: user.name,
    email: user.email,
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(values.name, values.email, values.password));
  };

  const handleReset = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      name: user.name,
      email: user.email,
      password: "",
    });
  };

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const nameClick = () => {
    setTimeout(() => nameRef.current.focus(), 0);
  };
  const emailClick = () => {
    setTimeout(() => emailRef.current.focus(), 0);
  };

  useEffect(() => {
    if (updateFailed && !expiredToken) {
      dispatch(updateUser(values.name, values.email, values.password));
    }
  }, [
    dispatch,
    expiredToken,
    updateFailed,
    values.name,
    values.email,
    values.password,
  ]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <section className={styles.content}>
      <ProfileNavigation />

      <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          icon={"EditIcon"}
          onIconClick={nameClick}
          value={values.name}
          name={"name"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          ref={nameRef}
        />
        <Input
          type={"email"}
          placeholder={"Логин"}
          onChange={onChange}
          icon={"EditIcon"}
          onIconClick={emailClick}
          value={values.email}
          name={"email"}
          error={false}
          errorText={"Ошибка"}
          size={"default"}
          ref={emailRef}
        />
        <PasswordInput
          onChange={onChange}
          value={values.password}
          name={"password"}
          icon="EditIcon"
        />
        <div className={`${styles.buttons}`}>
          <Button
            type="secondary"
            size="medium"
            onClick={handleReset}
            htmlType="button"
          >
            Отмена
          </Button>
          <Button
            disabled={!(values.name && values.email && values.password)}
            type="primary"
            size="medium"
            htmlType="button"
            onClick={handleSubmit}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </section>
  );
};
