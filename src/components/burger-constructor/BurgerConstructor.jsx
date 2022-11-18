import React, { useContext, useEffect, useMemo, useCallback } from "react";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";
import { DataContext } from "../../services/dataContext.js";
import { BunContext } from "../../services/bunContext.js";
import { PriceContext } from "../../services/priceContext";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerConstructor = ({ openModalOrder }) => {
  const { ingredients } = useContext(DataContext);
  const { bun, setBun } = useContext(BunContext);
  const { priceState, priceDispatcher } = useContext(PriceContext);
  // useEffect(() => {,[]});
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  setBun(buns[0]);

  const priceCount = useCallback(() => {
    if (bun.price) {
      const price = ingredients.reduce((acc, topping) => {
        const totalPrice = acc + (topping.type !== "bun" ? topping.price : 0);
        return totalPrice;
      }, 0);
      console.log(price);
      priceDispatcher({ type: "count", payload: price + bun.price * 2 });
    }
  }, [ingredients, bun.price, priceDispatcher]);
  useEffect(() => {
    priceCount();
  }, [bun.price, ingredients, priceCount, priceState.price]);
  return (
    <section className={`${styles.constructor} pt-25 pl-4`}>
      <div className={styles.ingredients}>
        <div className="pl-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>

        <ul className={`${styles.list_toppings} pr-3`}>
          {ingredients
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
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>
      <div className={`${styles.order} pt-10 pr-3`}>
        <div className={`${styles.total__price} pr-10`}>
          <p
            className={` text text_type_digits-medium`}
          >{`${priceState.price}`}</p>

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
  openModalOrder: PropTypes.func.isRequired,
};
export default BurgerConstructor;
