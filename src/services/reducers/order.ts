import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  TOrderActions,
} from "../actions/order";

type TInitialState = {
  order: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState = {
  order: 0,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TInitialState => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: false,
        order: action.order,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
        order: 0,
      };
    }
    default: {
      return state;
    }
  }
};
