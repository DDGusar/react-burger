import uuid from "react-uuid";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  //   SWAP_INGREDIENT,
} from "../actions/currentIngredients";

const initialState = {
  currentIngredients: [],
  currentBun: null,
  totalPrice: 0,
};
export const currentIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        currentBun: action.payload,
        totalPrice: state.totalPrice + action.payload.price * 2,
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [
          ...state.currentIngredients,
          { uid: uuid(), ...action.payload },
        ],
        totalPrice: state.totalPrice + action.payload.price,
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentIngredients: [...state.currentIngredients].filter(
          (el) => el.uid !== action.payload
        ),
        totalPrice: state.totalPrice - action.payload.price,
      };
    }
    //   case SWAP_INGREDIENT: {
    //     return {
    //       ...state,
    //       currentIngredients: arrayMove(
    //         [...state.currentIngredients],
    //         action.hoverIndex,
    //         action.dragIndex
    //       ),
    //     };
    //   }
    default: {
      return state;
    }
  }
};
