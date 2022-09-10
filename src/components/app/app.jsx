import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { ingredientsLink } from "../../utils/constants";
import { Modal } from "../modal/modal";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [status, setDownloadStatus] = useState({
    isLoading: true,
    hasError: false,
    error: "",
  });
  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const [openIngredientDetails, setShowIngredientDetails] = useState(false);

  const apiRequest = async () => {
    const res = await fetch(`${ingredientsLink.url}`);
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
  };

  const closeModals = () => {
    setOpenOrderDetails(false);
    setShowIngredientDetails(false);
  };

  const openModalIngredient = (/*ingredient*/) => {
    // setInfoIngredient(ingredient);
    setShowIngredientDetails(true);
  };

  const getProductData = () => {
    apiRequest()
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
  useEffect(() => {
    getProductData();
  }, []);
  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <main>
        {status.hasError && <p>Ошибка получения данных с сервера</p>}
        {ingredients.length && !status.hasError && (
          <BurgerIngredients
            data={ingredients}
            openModalIngredient={openModalIngredient}
          />
        )}
        <BurgerConstructor data={ingredients} />
      </main>
      {openOrderDetails && <Modal handleClose={closeModals} header=""></Modal>}
      {openIngredientDetails && (
        <Modal title="Детали ингредиента" handleClose={closeModals}>
          {/* <IngredientDetails ingredient={infoIngredient} /> */}
        </Modal>
      )}
    </div>
  );
};

export default App;
