import React from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ data, openModalIngredient }) => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tab__bar} mb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.list_types} pl-2`}>
        <li>
          <h3 className="text text_type_main-medium mb-6">Булки</h3>
          <ul className={styles.list_ingredients}>
            {data
              .filter((item) => item.type === "bun")
              .map((item) => (
                <li
                  className={styles.card}
                  key={item._id}
                  onClick={() => {
                    openModalIngredient(item);
                  }}
                >
                  <Counter count={1} size="default" />
                  <img src={item.image} alt={item.name} />
                  <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default mr-2">
                      {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <h4 className={`${styles.name} text text_type_main-default`}>
                    {item.name}
                  </h4>
                </li>
              ))}
          </ul>
        </li>
        <li>
          <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>

          <ul className={styles.list_ingredients}>
            {data
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <li
                  className={styles.card}
                  key={item._id}
                  onClick={() => {
                    openModalIngredient(item);
                  }}
                >
                  <Counter count={1} size="default" />
                  <img src={item.image} alt={item.name} />
                  <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default mr-2">
                      {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <h4 className={`${styles.name} text text_type_main-default`}>
                    {item.name}
                  </h4>
                </li>
              ))}
          </ul>
        </li>
        <li>
          <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
          <ul className={styles.list_ingredients}>
            {data
              .filter((item) => item.type === "main")
              .map((item) => (
                <li
                  className={styles.card}
                  key={item._id}
                  onClick={() => {
                    openModalIngredient(item);
                  }}
                >
                  <Counter count={1} size="default" />
                  <img src={item.image} alt={item.name} />
                  <div className={`${styles.price} mt-2 mb-2`}>
                    <p className="text text_type_digits-default mr-2">
                      {item.price}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                  <h4 className={`${styles.name} text text_type_main-default`}>
                    {item.name}
                  </h4>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </section>
  );
};
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  openModalIngredient: PropTypes.func.isRequired,
};
export default BurgerIngredients;
