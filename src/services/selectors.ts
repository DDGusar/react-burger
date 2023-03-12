export const getUser = (store: any) => store.user;
export const getCurrentIngredients = (store: any) => store.currentIngredients;
export const getOrder = (store: any) => store.order;
export const getIngredientsList = (store: any) => store.ingredientsList;
export const getWsAllOrders = (store: any) => store.wsAllOrders;
export const getWsUserOrders = (store: any) => store.wsUserOrders;

export const user = (store: any) => getUser(store).user;
export const userFailed = (store: any) => getUser(store).userFailed;
export const expiredToken = (store: any) => getUser(store).expiredToken;
export const updateFailed = (store: any) => getUser(store).updateFailed;
export const tokenFailed = (store: any) => getUser(store).tokenFailed;
export const exitRequest = (store: any) => getUser(store).exitRequest;
export const resetPasswordSuccess = (store: any) =>
  getUser(store).resetPasswordSuccess;
export const forgotPasswordSuccess = (store: any) =>
  getUser(store).forgotPasswordSuccess;

export const currentBun = (store: any) =>
  getCurrentIngredients(store).currentBun;
export const currentIngredients = (store: any) =>
  getCurrentIngredients(store).currentIngredients;
export const totalPrice = (store: any) =>
  getCurrentIngredients(store).totalPrice;

export const order = (store: any) => getOrder(store).order;
export const orderRequest = (store: any) => getOrder(store).orderRequest;

export const ingredients = (store: any) =>
  getIngredientsList(store).ingredients;
export const currentTab = (store: any) => getIngredientsList(store).currentTab;
export const ingredientsRequest = (store: any) =>
  getIngredientsList(store).ingredientsRequest;
export const ingredientsFailed = (store: any) =>
  getIngredientsList(store).ingredientsFailed;

export const allOrders = (store: any) => getWsAllOrders(store).orders;
export const allTotal = (store: any) => getWsAllOrders(store).total;
export const allTotalToday = (store: any) => getWsAllOrders(store).totalToday;
export const wsConnectedAll = (store: any) => getWsAllOrders(store).wsConnected;

export const userOrders = (store: any) => getWsUserOrders(store).userOrders;
export const wsConnectedUser = (store: any) =>
  getWsUserOrders(store).wsUserConnected;
