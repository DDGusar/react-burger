import React, { useEffect, useState } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/AppHeader";
import { Switch, Route } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCookie, deleteCookie } from "../../utils/cookie";
import { updateToken, getUser, exit } from "../../services/actions/user";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage";
import { ForgotPasswordPage } from "../../pages/ForgotPasswordPage";
import { ResetPasswordPage } from "../../pages/ResetPasswordPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { NotFound404Page } from "../../pages/NotFound404Page";
import { IngredientPage } from "../../pages/IngredientPage";
import { ProfileOrdersPage } from "../../pages/ProfileOrdersPage";

import { OrderDetails } from "../order-details/OrderDetails";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { Modal } from "../modal/modal";
import { getIngredients } from "../../services/actions/ingredientsList";
import { getOrder } from "../../services/actions/order";
import { closeModal, openModal } from "../../services/actions/modals";

const App = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const authToken = getCookie("authToken");
  const refreshToken = getCookie("refreshToken");
  const userFailed = useSelector((store) => store.user.userFailed);
  const expiredToken = useSelector((store) => store.user.expiredToken);
  const tokenFailed = useSelector((store) => store.user.tokenFailed);

  const currentIngredients = useSelector(
    (store) => store.currentIngredients.currentIngredients
  );
  const bun = useSelector((store) => store.currentIngredients.currentBun);

  const order = useSelector((store) => store.order.order);
  const orderRequest = useSelector((store) => store.order.orderRequest);

  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const closeModals = () => {
    setOpenOrderDetails(false);
    dispatch(closeModal());
    history.replace("/");
  };
  const openModalIngredient = (ingredient) => {
    dispatch(openModal(ingredient));
  };

  const openModalOrder = () => {
    if (user) {
      dispatch(
        getOrder([
          bun._id,
          ...currentIngredients.map((item) => item._id),
          bun._id,
        ])
      );
      setOpenOrderDetails(true);
    } else {
      history.push("/login");
    }
  };

  useEffect(() => {
    if (expiredToken && !tokenFailed) {
      dispatch(updateToken());
    }
    if (expiredToken && tokenFailed) {
      dispatch(exit());
      deleteCookie("authToken");
      deleteCookie("refreshToken");
    }
    if (userFailed && !expiredToken) {
      dispatch(getUser());
    }
  }, [expiredToken, userFailed]);

  useEffect(() => {
    if (!user && authToken && refreshToken) {
      dispatch(getUser());
    }
  }, [dispatch, user, refreshToken, authToken]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app__layout}>
      <AppHeader />
      <main className={styles.main}>
        <Switch location={background || location}>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders">
            <ProfileOrdersPage />
          </ProtectedRoute>
          <Route exact path="/ingredients/:id">
            <div className={styles.content}>
              <h1 className="text text_type_main-large">Детали ингредиента</h1>
              <IngredientPage />
            </div>
          </Route>
          <Route exact path="/">
            <HomePage
              openModalIngredient={openModalIngredient}
              openModalOrder={openModalOrder}
            />
          </Route>
          <Route component={NotFound404Page} />
        </Switch>
        {background && (
          <Route exact path="/ingredients/:id">
            <Modal header="Детали ингредиента" onClose={closeModals}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
        {openOrderDetails && (
          <Modal onClose={closeModals}>
            <>
              {orderRequest && (
                <p className={`text text_type_main-medium`}>Загрузка...</p>
              )}
              {!orderRequest && <OrderDetails orderNumber={order} />}
            </>
          </Modal>
        )}
      </main>
    </div>
  );
};

export default App;
