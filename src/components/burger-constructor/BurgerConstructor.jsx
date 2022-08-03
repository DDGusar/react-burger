import React from "react";
import styles from "./burgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  LockIcon,
  DeleteIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data.js";

const getTopping = (data) => {
  return (
    <ul className={styles.list_toppings}>
      {data
        .filter((item) => item.type !== "bun")
        .map((item) => (
          <li className={`${styles.item__topping} pb-4`} key={item._id}>
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
            />
          </li>
        ))}
    </ul>
  );
};

const BurgerConstructor = () => {
  return (
    <section className={`${styles.constructor} pt-15`}>
      <div className={styles.ingredients}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={data[0].image}
        />
        {getTopping(data)}
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={data[0].image}
        />
      </div>
      <div className={`${styles.order} pt-10`}>
        <p
          className={`${styles.total_price} text text_type_digits-medium pr-10`}
        >
          {data.reduce((acc, topping) => {
            const totalPrice =
              acc + (topping.type !== "bun" ? topping.price : 0);
            return totalPrice;
          }, 0)}
          {/* <span className={styles.currency}> */}
          <CurrencyIcon width="36px" height="36px" />
          {/* </span> */}
        </p>

        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
