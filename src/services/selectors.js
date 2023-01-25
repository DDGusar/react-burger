export const getUser = (store) => store.user;
export const getCurrentIngredients = (store) => store.currentIngredients;
export const getOrder = (store) => store.order;
export const getIngredientsList = (store) => store.ingredientsList;
export const getWsAllOrders = (store) => store.wsAllOrders;
export const getWsUserOrders = (store) => store.wsUserOrders;

export const user = (store) => getUser(store).user;
export const userFailed = (store) => getUser(store).userFailed;
export const expiredToken = (store) => getUser(store).expiredToken;
export const updateFailed = (store) => getUser(store).updateFailed;
export const tokenFailed = (store) => getUser(store).tokenFailed;
export const exitRequest = (store) => getUser(store).exitRequest;
export const resetPasswordSuccess = (store) =>
  getUser(store).resetPasswordSuccess;

export const currentBun = (store) => getCurrentIngredients(store).currentBun;

export const order = (store) => getOrder(store).order;
export const orderRequest = (store) => getOrder(store).orderRequest;

export const ingredients = (store) => getIngredientsList(store).ingredients;
export const currentTab = (store) => getIngredientsList(store).currentTab;

export const allOrders = (store) => getWsAllOrders(store).orders;
export const allTotal = (store) => getWsAllOrders(store).total;
export const allTotalToday = (store) => getWsAllOrders(store).totalToday;
export const wsConnectedAll = (store) => getWsAllOrders(store).wsConnected;

export const userOrders = (store) => getWsUserOrders(store).userOrders;
export const wsConnectedUser = (store) =>
  getWsUserOrders(store).wsUserConnected;
