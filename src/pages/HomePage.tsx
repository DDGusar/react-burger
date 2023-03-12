import React, { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "../services/hooks/useSelector";
import BurgerIngredients from "../components/burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../components/burger-constructor/BurgerConstructor";

import * as selectors from "../services/selectors";
import { TIngredient } from "../services/types/data";

type THomePageProps = {
  openModalIngredient: (ingredient: TIngredient) => void;
  openModalOrder: () => void;
};

export const HomePage: FC<THomePageProps> = ({
  openModalIngredient,
  openModalOrder,
}) => {
  const ingredients = useSelector(selectors.ingredients);

  const ingredientsRequest = useSelector(selectors.ingredientsRequest);
  const ingredientsFailed = useSelector(selectors.ingredientsFailed);

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
};
