import React, { useContext, useMemo, useReducer } from "react";
import styles from "./burgerConstructor.module.css";
import PropTypes from "prop-types";
import { DataContext } from "../../services/dataContext.js";
import { BunContext } from "../../services/bunContext.js";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const priceInit = { price: null };
function reducer(priceState, action) {
  switch (action.type) {
    case "count":
      return { price: action.payload };
    case "reset":
      return priceInit;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

const BurgerConstructor = ({ openModalOrder }) => {
  const { ingredients } = useContext(DataContext);
  const { bun } = useContext(BunContext);
  const [priceState, priceDispatcher] = useReducer(reducer, priceInit);

  const otherIngredients = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );

  useMemo(() => {
    if (bun.price) {
      const price = ingredients.reduce((acc, topping) => {
        const totalPrice = acc + (topping.type !== "bun" ? topping.price : 0);
        return totalPrice;
      }, 0);
      priceDispatcher({ type: "count", payload: price + bun.price * 2 });
    }
  }, [ingredients, bun.price, priceDispatcher]);

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
          {otherIngredients.map((item) => (
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
