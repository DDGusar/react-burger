import { RootState } from "./types";

export const getUser = (store: RootState) => store.user;
export const getCurrentIngredients = (store: RootState) =>
  store.currentIngredients;
export const getOrder = (store: RootState) => store.order;
export const getIngredientsList = (store: RootState) => store.ingredientsList;
export const getWsAllOrders = (store: RootState) => store.wsAllOrders;
export const getWsUserOrders = (store: RootState) => store.wsUserOrders;

export const user = (store: RootState) => getUser(store).user;
export const userFailed = (store: RootState) => getUser(store).userFailed;
export const expiredToken = (store: RootState) => getUser(store).expiredToken;
export const updateFailed = (store: RootState) => getUser(store).updateFailed;
export const tokenFailed = (store: RootState) => getUser(store).tokenFailed;
export const exitRequest = (store: RootState) => getUser(store).exitRequest;
export const resetPasswordSuccess = (store: RootState) =>
  getUser(store).resetPasswordSuccess;
export const forgotPasswordSuccess = (store: RootState) =>
  getUser(store).forgotPasswordSuccess;

export const currentBun = (store: RootState) =>
  getCurrentIngredients(store).currentBun;
export const currentIngredients = (store: RootState) =>
  getCurrentIngredients(store).currentIngredients;
export const totalPrice = (store: RootState) =>
  getCurrentIngredients(store).totalPrice;

export const order = (store: RootState) => getOrder(store).order;
export const orderRequest = (store: RootState) => getOrder(store).orderRequest;

export const ingredients = (store: RootState) =>
  getIngredientsList(store).ingredients;
export const currentTab = (store: RootState) =>
  getIngredientsList(store).currentTab;
export const ingredientsRequest = (store: RootState) =>
  getIngredientsList(store).ingredientsRequest;
export const ingredientsFailed = (store: RootState) =>
  getIngredientsList(store).ingredientsFailed;

export const allOrders = (store: RootState) => getWsAllOrders(store).orders;
export const allTotal = (store: RootState) => getWsAllOrders(store).total;
export const allTotalToday = (store: RootState) =>
  getWsAllOrders(store).totalToday;
export const wsConnectedAll = (store: RootState) =>
  getWsAllOrders(store).wsConnected;

export const userOrders = (store: RootState) =>
  getWsUserOrders(store).userOrders;
export const wsConnectedUser = (store: RootState) =>
  getWsUserOrders(store).wsUserConnected;
