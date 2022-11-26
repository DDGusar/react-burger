import React, { useContext, useMemo, useState, useRef } from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import { DataContext } from "../../services/dataContext";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = ({ openModalIngredient }) => {
  const { ingredients } = useContext(DataContext);
  const [current, setCurrent] = useState("bun");
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);
  const tabClick = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tab__bar} mb-10`}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => {
            setCurrent("bun");
            tabClick(bunsRef);
          }}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => {
            setCurrent("sauce");
            tabClick(saucesRef);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => {
            setCurrent("main");
            tabClick(mainsRef);
          }}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.list_types} pl-2`}>
        <li ref={bunsRef}>
          <h3 className="text text_type_main-medium mb-6">Булки</h3>
          <ul className={styles.list_ingredients}>
            {buns.map((item) => (
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
        <li ref={saucesRef}>
          <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>

          <ul className={styles.list_ingredients}>
            {sauces.map((item) => (
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
        <li ref={mainsRef}>
          <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
          <ul className={styles.list_ingredients}>
            {mains.map((item) => (
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
  openModalIngredient: PropTypes.func.isRequired,
};
export default BurgerIngredients;
