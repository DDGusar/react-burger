import React, { useMemo, useEffect, FC } from "react";
import styles from "./burgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useInView } from "react-intersection-observer";
import { setCurrentTab } from "../../services/actions/ingredientsList";
import { BurgerIngredient } from "../burger-ingredient/BurgerIngredient";
import { TIngredient } from "../../services/types/data";
import * as selectors from "../../services/selectors";

export type TBurgerIngredientsProps = {
  openModalIngredient: (ingredient: TIngredient) => void;
};

const BurgerIngredients: FC<TBurgerIngredientsProps> = ({
  openModalIngredient,
}) => {
  const ingredients = useSelector(selectors.ingredients);
  const currentTab = useSelector(selectors.currentTab);

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
      dispatch(setCurrentTab("bun"));
    } else if (inViewSauce) {
      dispatch(setCurrentTab("sauce"));
    } else if (inViewMain) {
      dispatch(setCurrentTab("main"));
    }
  }, [inViewBun, inViewSauce, inViewMain, dispatch]);

  const buns = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "bun"),
    [ingredients]
  );
  const mains = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "main"),
    [ingredients]
  );
  const sauces = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === "sauce"),
    [ingredients]
  );
  const tabClick = (value: string) => {
    const element = document.querySelector(`.${value}`) as HTMLDivElement;
    element.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className={styles.ingredients}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tab__bar} mb-10`}>
        <Tab
          value="bun"
          active={currentTab === "bun"}
          onClick={(value) => {
            dispatch(setCurrentTab(value));
            tabClick(value);
          }}
        >
          Булки
        </Tab>

        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={(value) => {
            dispatch(setCurrentTab(value));
            tabClick(value);
          }}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={(value) => {
            dispatch(setCurrentTab(value));
            tabClick(value);
          }}
        >
          Начинки
        </Tab>
      </div>
      <ul className={`${styles.list_types} pl-2`}>
        <li ref={bun} className="bun">
          <h3 className="text text_type_main-medium mb-6">Булки</h3>
          <ul className={styles.list_ingredients}>
            {buns.map((item: TIngredient) => (
              <BurgerIngredient
                key={item._id}
                item={item}
                openModalIngredient={openModalIngredient}
              />
            ))}
          </ul>
        </li>
        <li ref={sauce} className="sauce">
          <h3 className="text text_type_main-medium mt-10 mb-6">Соусы</h3>

          <ul className={styles.list_ingredients}>
            {sauces.map((item: TIngredient) => (
              <BurgerIngredient
                key={item._id}
                item={item}
                openModalIngredient={openModalIngredient}
              />
            ))}
          </ul>
        </li>
        <li ref={main} className="main">
          <h3 className="text text_type_main-medium mt-10 mb-6">Начинки</h3>
          <ul className={styles.list_ingredients}>
            {mains.map((item: TIngredient) => (
              <BurgerIngredient
                key={item._id}
                item={item}
                openModalIngredient={openModalIngredient}
              />
            ))}
          </ul>
        </li>
      </ul>
    </section>
  );
};
export default BurgerIngredients;
