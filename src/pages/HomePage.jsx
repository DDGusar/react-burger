import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import BurgerIngredients from "../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../components/burger-constructor/BurgerConstructor";
import PropTypes from "prop-types";
import * as selectors from "../services/selectors";

export function HomePage({ openModalIngredient, openModalOrder }) {
  const ingredients = useSelector(selectors.ingredients);

  const ingredientsRequest = useSelector(
    (store) => store.ingredientsList.ingredientsRequest
  );
  const ingredientsFailed = useSelector(
    (store) => store.ingredientsList.ingredientsFailed
  );

  return (
    <>
      {ingredients && !ingredientsFailed && !ingredientsRequest && (
        <>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openModalIngredient={openModalIngredient} />
            <BurgerConstructor openModalOrder={openModalOrder} />
          </DndProvider>
        </>
      )}
      {ingredientsFailed && <p>Ошибка получения данных с сервера</p>}
      {ingredientsRequest && "Загрузка..."}
    </>
  );
}

HomePage.propTypes = {
  openModalOrder: PropTypes.func.isRequired,
  openModalIngredient: PropTypes.func.isRequired,
};
