import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";

const App = () => {
  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
};

export default App;
