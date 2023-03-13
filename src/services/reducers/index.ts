import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { ingredientsListReducer } from "./ingredientsList";
import { modalsReducer } from "./modals";
import { currentIngredientsReducer } from "./currentIngredients";
import { userReducer } from "./user";
import { wsAllOrdersReducer } from "./wsAllOrders";
import { wsUserOrdersReducer } from "./wsUserOrders";

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  order: orderReducer,
  modals: modalsReducer,
  currentIngredients: currentIngredientsReducer,
  user: userReducer,
  wsAllOrders: wsAllOrdersReducer,
  wsUserOrders: wsUserOrdersReducer,
});
