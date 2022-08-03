import React from "react";
import styles from "./burgerIngredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data.js";

const getItems = (data, type) => {
  return (
    <ul className={styles.list_ingredients}>
      {data
        .filter((item) => item.type === type)
        .map((item) => (
          <div className={styles.card} key={item._id}>
            <Counter count={1} size="default" />
            <img src={item.image} />
            <div className="mt-1 mb-1">
              <span className="text text_type_digits-default mr-2">
                {item.price}
              </span>
              <CurrencyIcon type="primary" />
            </div>
            <h4 className={`${styles.name} text text_type_main-default`}>
              {item.name}
            </h4>
          </div>
        ))}
    </ul>
  );
};

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("bun");
  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
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
      <ul className={styles.list_types}>
        <li>
          <h3 className="text text_type_main-medium mt-10 mb-6">Булки</h3>
          {getItems(data, "bun")}
        </li>
        <li>
          <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>
          {getItems(data, "sauce")}
        </li>
        <li>
          <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
          {getItems(data, "main")}
        </li>
      </ul>
    </section>
  );
};

export default BurgerIngredients;
