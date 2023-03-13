import { TCurrentIngredientActions } from "../actions/currentIngredients";
import { TListIngredientsActions } from "../actions/ingredientsList";
import { TModalActions } from "../actions/modals";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";
import { TWsAllOrdersActions } from "../actions/wsAllOrders";
import { TWsUserOrdersActions } from "../actions/wsUserOrders";

import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { rootReducer } from "../reducers";

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  | TCurrentIngredientActions
  | TListIngredientsActions
  | TModalActions
  | TOrderActions
  | TUserActions
  | TWsAllOrdersActions
  | TWsUserOrdersActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
