import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css";

import { useEffect, useState, FC } from "react";
import { useSelector } from "../../services/hooks/useSelector";
import { TConstructorIngredient, TIngredient } from "../../services/types/data";
import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";
import * as selectors from "../../services/selectors";

export type TBurgerIngredientProps = {
  item: TIngredient;
  openModalIngredient: (ingredient: TIngredient) => void;
};

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  item,
  openModalIngredient,
}) => {
  const ingredients = useSelector(selectors.currentIngredients);
  const bun = useSelector(selectors.currentBun);
  const location = useLocation();
  const [counter, setCounter] = useState(0);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { item },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  useEffect(() => {
    if (item.type === "bun" && bun && item._id === bun._id) {
      setCounter(2);
    } else {
      ingredients.length > 0 &&
        setCounter(
          ingredients.filter(
            (element: TConstructorIngredient) => element.data._id === item._id
          ).length
        );
    }
  }, [bun, ingredients, item]);

  return (
    <li
      draggable
      ref={dragRef}
      style={{ opacity }}
      className={``}
      onClick={() => {
        openModalIngredient(item);
      }}
    >
      <Link
        className={`${styles.card}`}
        to={{
          pathname: `/ingredients/${item._id}`,
          state: { background: location },
        }}
      >
        {counter > 0 && <Counter count={counter} size="default" />}
        <img src={item.image} alt={item.name} />
        <div className={`${styles.price} mt-2 mb-2`}>
          <p className="text text_type_digits-default mr-2">{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <h4 className={`${styles.name} text text_type_main-default`}>
          {item.name}
        </h4>
      </Link>
    </li>
  );
};
