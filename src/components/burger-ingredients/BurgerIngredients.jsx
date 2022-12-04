import React, { useMemo, useEffect } from "react";
import styles from "./burgerIngredients.module.css";
import PropTypes from "prop-types";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { SET_CURRENT_TAB } from "../../services/actions/ingredientsList";

const BurgerIngredients = ({ openModalIngredient }) => {
  const ingredients = useSelector((store) => store.ingredientsList.ingredients);
  const currentTab = useSelector((store) => store.ingredientsList.currentTab);

  const dispatch = useDispatch();
  const [bun, inViewBun] = useInView({
    threshold: 0.2,
  });
  const [sauce, inViewSauce] = useInView({
    threshold: 0.2,
  });
  const [main, inViewMain] = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inViewBun) {
      dispatch({ type: SET_CURRENT_TAB, currentTab: "bun" });
    } else if (inViewSauce) {
      dispatch({ type: SET_CURRENT_TAB, currentTab: "sauce" });
    } else if (inViewMain) {
      dispatch({ type: SET_CURRENT_TAB, currentTab: "main" });
    }
  }, [inViewBun, inViewSauce, inViewMain, dispatch]);

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
  const tabClick = (value) => {
    document.querySelector(`.${value}`).scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tab__bar} mb-10`}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          inViewBun={inViewBun}
          onClick={(value) => {
            dispatch({ type: SET_CURRENT_TAB, currentTab: value });
            tabClick(value);
          }}
        >
          Булки
        </Tab>

        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          inViewSauce={inViewSauce}
          onClick={(value) => {
            dispatch({ type: SET_CURRENT_TAB, currentTab: value });
            tabClick(value);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          inViewMain={inViewMain}
          onClick={(value) => {
            dispatch({ type: SET_CURRENT_TAB, currentTab: value });
            tabClick(value);
          }}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.list_types} pl-2`}>
        <li ref={bun}>
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
        <li ref={sauce}>
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
        <li ref={main}>
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
