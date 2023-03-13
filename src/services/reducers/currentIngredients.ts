import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SWAP_INGREDIENT,
  CLEAN_CART,
  TCurrentIngredientActions,
} from "../actions/currentIngredients";
import { TIngredient, TConstructorIngredient } from "../types/data";

type TInitialState = {
  currentIngredients: TConstructorIngredient[];
  currentBun: TIngredient | null;
  totalPrice: number;
  bunPrice: number;
};

const initialState: TInitialState = {
  currentIngredients: [],
  currentBun: null,
  totalPrice: 0,
  bunPrice: 0,
};
export const currentIngredientsReducer = (
  state = initialState,
  action: TCurrentIngredientActions
): TInitialState => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        currentBun: action.currentBun,
        totalPrice:
          state.totalPrice - state.bunPrice + action.currentBun.price * 2,
        bunPrice: action.currentBun.price * 2,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients, action.payload],
        totalPrice: state.totalPrice + action.payload.data.price,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].filter(
          (el) => el.uid !== action.item.uid
        ),
        totalPrice: state.totalPrice - action.item.data.price,
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
const arrayMove = (
  arr: Array<{ uid: string; data: TIngredient }>,
  newIndex: number,
  oldIndex: number
) => {
  if (arr.length <= newIndex) {
    let c = newIndex - arr.length + 1;
    while (c--) {
      arr.push();
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr;
};
