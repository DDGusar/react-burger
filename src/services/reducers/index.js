import { combineReducers } from "redux";
import { orderReducer } from "./order";
import { ingredientsListReducer } from "./ingredientsList";
import { modalsReducer } from "./modals";
import { currentIngredientsReducer } from "./currentIngredients";

export const rootReducer = combineReducers({
  ingredientsList: ingredientsListReducer,
  order: orderReducer,
  modals: modalsReducer,
  currentIngredients: currentIngredientsReducer,
});
