import React from "react";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ data, openModalOrder }) => {
  return (
    <section className={`${styles.constructor} pt-25 pl-4`}>
      <div className={styles.ingredients}>
        <div className="pl-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>

        <ul className={`${styles.list_toppings} pr-3`}>
          {data
            .filter((item) => item.type !== "bun")
            .map((item) => (
              <li className={`${styles.item__topping} pb-4`} key={item._id}>
                <DragIcon />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            ))}
        </ul>

        <div className="pl-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </div>
      </div>
      <div className={`${styles.order} pt-10 pr-3`}>
        <div className={`${styles.total__price} pr-10`}>
          <p className={` text text_type_digits-medium`}>
            {data.reduce((acc, topping) => {
              const totalPrice =
                acc + (topping.type !== "bun" ? topping.price : 0);
              return totalPrice;
            }, 0)}
          </p>
          <CurrencyIcon />
        </div>

        <Button type="primary" size="large" onClick={openModalOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  openModalOrder: PropTypes.func.isRequired,
};
export default BurgerConstructor;
