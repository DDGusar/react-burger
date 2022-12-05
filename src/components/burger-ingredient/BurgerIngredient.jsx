import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerIngredient.module.css";

import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
// import { useMemo } from "react";
// import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

export const BurgerIngredient = ({ item, openModalIngredient }) => {
  // const ingredients = useSelector((store) => store.ingredientsList.ingredients);
  // const bun = useSelector((store) => store.currentIngredients.currentBun);
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: item,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });
  const setCounter = 2;
  // useMemo(() => {
  //   if (item.type === "bun") {
  //     return bun && item._id === bun._id ? 2 : 0;
  //   } else {
  //     return (
  //       ingredients.length > 0 &&
  //       ingredients.filter((element) => element.data._id === item._id).length
  //     );
  //   }
  // }, [bun, ingredients, item._id, item.type]);

  return (
    <li
      draggable
      ref={dragRef}
      style={{ opacity }}
      className={`${styles.card}`}
      onClick={() => {
        openModalIngredient(item);
      }}
    >
      {setCounter > 0 && <Counter count={setCounter} size="default" />}
      <img src={item.image} alt={item.name} />
      <div className={`${styles.price} mt-2 mb-2`}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={`${styles.name} text text_type_main-default`}>
        {item.name}
      </h4>
    </li>
  );
};
BurgerIngredient.propTypes = {
  item: ingredientType.isRequired,
  openModalIngredient: PropTypes.func.isRequired,
};
