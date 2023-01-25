import {
  OPEN_MODAL_INGREDIENT,
  OPEN_MODAL_ORDER,
  CLOSE_MODAL,
} from "../actions/modals";

const initialState = {
  currentIngredient: null,
  isOpened: false,
};
export const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.payload,
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
