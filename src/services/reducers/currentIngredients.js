import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SWAP_INGREDIENT,
  CLEAN_CART,
} from "../actions/currentIngredients";

const initialState = {
  currentIngredients: [],
  currentBun: null,
  totalPrice: 0,
  bunPrice: 0,
};
export const currentIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        currentBun: action.payload,
        totalPrice:
          state.totalPrice - state.bunPrice + action.payload.price * 2,
        bunPrice: action.payload.price * 2,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients, action.payload],
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].filter(
          (el) => el.uid !== action.payload.uid
        ),
        totalPrice: state.totalPrice - action.payload.price,
      };
    }
    case SWAP_INGREDIENT: {
      return {
        ...state,
        currentIngredients: arrayMove(
          [...state.currentIngredients],
          action.hoverIndex,
          action.dragIndex
        ),
      };
    }
    case CLEAN_CART: {
      return {
        ...state,
        currentIngredients: [],
        currentBun: null,
        totalPrice: 0,
        bunPrice: 0,
      };
    }
    default: {
      return state;
    }
  }
};
const arrayMove = (arr, newIndex, oldIndex) => {
  if (arr.length <= newIndex) {
    let c = newIndex - arr.length + 1;
    while (c--) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};
