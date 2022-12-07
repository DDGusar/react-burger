import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { OrderDetails } from "../order-details/OrderDetails";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";

import { Modal } from "../modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredientsList";
import { getOrder } from "../../services/actions/order";
import { OPEN_MODAL, CLOSE_MODAL } from "../../services/actions/modals";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const dispatch = useDispatch();

  const ingredients = useSelector((store) => store.ingredientsList.ingredients);
  const currentIngredients = useSelector(
    (store) => store.currentIngredients.currentIngredients
  );
  const ingredientsRequest = useSelector(
    (store) => store.ingredientsList.ingredientsRequest
  );
  const ingredientsFailed = useSelector(
    (store) => store.ingredientsList.ingredientsFailed
  );
  const bun = useSelector((store) => store.currentIngredients.currentBun);
  const currentIngredient = useSelector(
    (store) => store.modals.currentIngredient
  );
  const order = useSelector((store) => store.order.order);

  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const closeModals = () => {
    setOpenOrderDetails(false);
    dispatch({ type: CLOSE_MODAL });
  };

  const openModalIngredient = (ingredient) => {
    dispatch({ type: OPEN_MODAL, payload: ingredient });
  };

  const openModalOrder = () => {
    dispatch(
      getOrder([
        bun._id,
        ...currentIngredients.map((item) => item._id),
        bun._id,
      ])
    );
    setOpenOrderDetails(true);
  };

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <main className={styles.main}>
        {ingredients && !ingredientsFailed && !ingredientsRequest && (
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients
                openModalIngredient={openModalIngredient}
              ></BurgerIngredients>
              <BurgerConstructor
                openModalOrder={openModalOrder}
              ></BurgerConstructor>
            </DndProvider>
          </>
        )}
        {ingredientsFailed && <p>Ошибка получения данных с сервера</p>}
        {ingredientsRequest && "Загрузка..."}
      </main>
      {currentIngredient && (
        <Modal header="Детали ингредиента" onClose={closeModals}>
          <IngredientDetails ingredient={currentIngredient} />
        </Modal>
      )}
      {openOrderDetails && (
        <Modal onClose={closeModals} header="">
          <OrderDetails orderNumber={order} />
        </Modal>
      )}
    </div>
  );
};

export default App;
