import { TIngredient } from "../types/data";
export const OPEN_MODAL_INGREDIENT: "OPEN_MODAL_INGREDIENT" =
  "OPEN_MODAL_INGREDIENT";
export const OPEN_MODAL_ORDER: "OPEN_MODAL_ORDER" = "OPEN_MODAL_ORDER";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";

export interface IOpenModalIngredient {
  readonly type: typeof OPEN_MODAL_INGREDIENT;
  readonly currentIngredient: TIngredient;
}

export interface IOpenModalOrder {
  readonly type: typeof OPEN_MODAL_ORDER;
  readonly isOpened?: true;
}

export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL;
}

export type TModalActions =
  | IOpenModalIngredient
  | IOpenModalOrder
  | ICloseModal;

export const openModalIngredient = (
  ingredient: TIngredient
): IOpenModalIngredient => {
  return { type: OPEN_MODAL_INGREDIENT, currentIngredient: ingredient };
};

export const openModalOrder = (): IOpenModalOrder => {
  return { type: OPEN_MODAL_ORDER };
};

export const closeModal = (): ICloseModal => {
  return { type: CLOSE_MODAL };
};
