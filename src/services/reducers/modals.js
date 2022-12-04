import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modals";

const initialState = {
  currentIngredient: null,
};
export const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL: {
      return {
        ...state,
        currentIngredient: action.payload,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        currentIngredient: null,
      };
    }
    default: {
      return state;
    }
  }
};
