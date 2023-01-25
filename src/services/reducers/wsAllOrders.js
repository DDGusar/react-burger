import {
  ALL_ORDER_WS_CONNECTION_SUCCESS,
  ALL_ORDER_WS_CONNECTION_ERROR,
  ALL_ORDER_WS_CONNECTION_CLOSED,
  ALL_ORDER_WS_GET_MESSAGE,
} from "../actions/wsAllOrders";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsAllOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ORDER_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case ALL_ORDER_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case ALL_ORDER_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case ALL_ORDER_WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
