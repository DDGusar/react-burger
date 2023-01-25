export const OPEN_MODAL_INGREDIENT = "OPEN_MODAL_INGREDIENT";
export const OPEN_MODAL_ORDER = "OPEN_MODAL_ORDER";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModalIngredient = (ingredient) => {
  return { type: OPEN_MODAL_INGREDIENT, payload: ingredient };
};
export const openModalOrder = () => {
  return { type: OPEN_MODAL_ORDER };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};
