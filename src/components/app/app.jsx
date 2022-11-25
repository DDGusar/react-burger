import React, { useEffect, useState, useMemo } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { OrderDetails } from "../order-details/OrderDetails";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { dataRequest, orderRequest } from "../../utils/constants";
import { Modal } from "../modal/modal";
import { DataContext } from "../../services/dataContext";
import { BunContext } from "../../services/bunContext";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredientModal, setIngredientModal] = useState(null);

  const [bun, setBun] = useState(null);
  const [status, setDownloadStatus] = useState({
    isLoading: true,
    hasError: false,
    error: "",
  });
  const [orderNumber, setOrderNumber] = useState(0);
  const [orderError, setOrderError] = useState(null);
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const [openIngredientDetails, setOpenIngredientDetails] = useState(false);

  const closeModals = () => {
    setOpenOrderDetails(false);
    setOpenIngredientDetails(false);
  };

  const openModalIngredient = (ingredient) => {
    setIngredientModal(ingredient);
    setOpenIngredientDetails(true);
  };

  const openModalOrder = () => {
    setOrderData();
    setOpenOrderDetails(true);
  };

  useMemo(() => {
    const currentBun = ingredients.find((item) => {
      return item.type === "bun";
    });
    setBun(currentBun);
  }, [ingredients, setBun]);

  const getProductData = () => {
    dataRequest()
      .then((res) => {
        setIngredients(res.data);
        setDownloadStatus({
          ...status,
          isLoading: false,
        });
      })
      .catch((err) => {
        setDownloadStatus({
          ...status,
          isLoading: false,
          hasError: true,
          error: err,
        });
      });
  };
  const otherIngredients = useMemo(
    () => ingredients.filter((item) => item.type !== "bun"),
    [ingredients]
  );

  const setOrderData = () => {
    orderRequest([
      bun._id,
      ...otherIngredients.map((item) => item._id),
      bun._id,
    ])
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .catch((err) => {
        setOrderError(err);
      });
  };

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <main className={styles.main}>
        {status.hasError && <p>Ошибка получения данных с сервера</p>}
        {ingredients.length && !status.hasError && (
          <DataContext.Provider value={{ ingredients }}>
            <BunContext.Provider value={{ bun, setBun }}>
              <BurgerIngredients
                openModalIngredient={openModalIngredient}
              ></BurgerIngredients>
              <BurgerConstructor
                openModalOrder={openModalOrder}
              ></BurgerConstructor>
            </BunContext.Provider>
          </DataContext.Provider>
        )}
        {status.hasError && <p>Ошибка получения данных с сервера</p>}
      </main>
      {openIngredientDetails && (
        <Modal header="Детали ингредиента" onClose={closeModals}>
          <IngredientDetails ingredient={ingredientModal} />
        </Modal>
      )}
      {openOrderDetails && (
        <Modal onClose={closeModals} header="">
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}
    </div>
  );
};

export default App;
