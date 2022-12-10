import uuid from "react-uuid";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const SWAP_INGREDIENT = "SWAP_INGREDIENT";
export const CLEAN_CART = "CLEAN CART";

export const addBun = (item) => {
  return { type: ADD_BUN, payload: item };
};

export const addIngredient = (item) => {
  return { type: ADD_INGREDIENT, payload: { uid: uuid(), ...item } };
};

export const swapIngredient = (dragIndex, hoverIndex) => {
  return { type: SWAP_INGREDIENT, dragIndex, hoverIndex };
};

export const deleteIngredient = (item) => {
  return { type: DELETE_INGREDIENT, payload: item };
};

export const cleanCart = () => {
  return { type: CLEAN_CART };
};
