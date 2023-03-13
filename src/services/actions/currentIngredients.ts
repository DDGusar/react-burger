import uuid from "react-uuid";
import { TIngredient, TConstructorIngredient } from "../types/data";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const SWAP_INGREDIENT: "SWAP_INGREDIENT" = "SWAP_INGREDIENT";
export const CLEAN_CART: "CLEAN_CART" = "CLEAN_CART";

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  payload: TConstructorIngredient;
}
export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  item: { uid: string; data: TIngredient };
}
export interface IAddBun {
  readonly type: typeof ADD_BUN;
  currentBun: TIngredient;
}
export interface ISwapIngredient {
  readonly type: typeof SWAP_INGREDIENT;
  readonly hoverIndex: number;
  readonly dragIndex: number;
}
export interface ICleanCart {
  readonly type: typeof CLEAN_CART;
}

export type TCurrentIngredientActions =
  | IAddIngredient
  | IDeleteIngredient
  | IAddBun
  | ISwapIngredient
  | ICleanCart;

export const addBun = (item: TIngredient): IAddBun => {
  return { type: ADD_BUN, currentBun: item };
};

export const addIngredient = (item: TIngredient): IAddIngredient => {
  return { type: ADD_INGREDIENT, payload: { uid: uuid(), data: item } };
};

export const swapIngredient = (
  dragIndex: number,
  hoverIndex: number
): ISwapIngredient => {
  return { type: SWAP_INGREDIENT, dragIndex, hoverIndex };
};

export const deleteIngredient = (
  item: TConstructorIngredient
): IDeleteIngredient => {
  return { type: DELETE_INGREDIENT, item };
};

export const cleanCart = (): ICleanCart => ({
  type: CLEAN_CART,
});
