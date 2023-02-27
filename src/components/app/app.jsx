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
import { OrderFeedPage } from "../../pages/OrderFeedPage";
import { OrderInfoPage } from "../../pages/OrderInfoPage";

import { OrderDetails } from "../order-details/OrderDetails";
import { IngredientDetails } from "../ingredient-details/IngredientDetails";
import { Modal } from "../modal/modal";
import { getIngredients } from "../../services/actions/ingredientsList";
import { getOrder } from "../../services/actions/order";
import { closeModal } from "../../services/actions/modals";
import * as selectors from "../../services/selectors";

const App = () => {
  const user = useSelector(selectors.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  const authToken = getCookie("authToken");
  const refreshToken = getCookie("refreshToken");
  const userFailed = useSelector(selectors.userFailed);
  const expiredToken = useSelector(selectors.expiredToken);
  const tokenFailed = useSelector(selectors.tokenFailed);

  const currentIngredients = useSelector(
    (store) => store.currentIngredients.currentIngredients
  );
  const bun = useSelector(selectors.currentBun);

  const order = useSelector(selectors.order);
  const orderRequest = useSelector(selectors.orderRequest);

  const [openOrderDetails, setOpenOrderDetails] = useState(false);

  const closeModals = () => {
    setOpenOrderDetails(false);
    dispatch(closeModal());
    history.goBack();
  };
  const openModalIngredient = (ingredient) => {
    dispatch(openModalIngredient(ingredient));
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
  const openModalOrderInfo = () => {};

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
          <Route exact path="/feed">
            <OrderFeedPage openModalOrderInfo={openModalOrderInfo} />
          </Route>
          <Route exact path="/feed/:id">
            <div className="mt-30">
              <OrderInfoPage />
            </div>
          </Route>
          <ProtectedRoute exact path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile/orders">
            <ProfileOrdersPage openModalOrderInfo={openModalOrderInfo} />
          </ProtectedRoute>
          <Route exact path="/profile/orders/:id">
            <div className="mt-30">
              <OrderInfoPage />
            </div>
          </Route>
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
          <>
            <Route exact path="/ingredients/:id">
              <Modal header="Детали ингредиента" onClose={closeModals}>
                <IngredientDetails />
              </Modal>
            </Route>
            <Route exact path="/feed/:id">
              <Modal onClose={closeModals}>
                <OrderInfoPage />
              </Modal>
            </Route>
            <Route exact path="/profile/orders/:id">
              <Modal onClose={closeModals}>
                <OrderInfoPage />
              </Modal>
            </Route>
          </>
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
