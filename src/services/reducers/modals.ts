import {
  OPEN_MODAL_INGREDIENT,
  OPEN_MODAL_ORDER,
  CLOSE_MODAL,
  TModalActions,
} from "../actions/modals";
import { TIngredient } from "../types/data";

type TInitialState = {
  currentIngredient: TIngredient | null;
  isOpened: boolean;
};

const initialState = {
  currentIngredient: null,
  isOpened: false,
};
export const modalsReducer = (
  state = initialState,
  action: TModalActions
): TInitialState => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.currentIngredient,
      };
    }
    case OPEN_MODAL_ORDER: {
      return {
        ...state,
        isOpened: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        currentIngredient: null,
        isOpened: false,
      };
    }
    default: {
      return state;
    }
  }
};
