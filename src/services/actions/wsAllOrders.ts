import { TOrder } from "../types/data";
export const ALL_ORDER_WS_CONNECTION_START: "ALL_ORDER_WS_CONNECTION_START" =
  "ALL_ORDER_WS_CONNECTION_START";
export const ALL_ORDER_WS_CONNECTION_SUCCESS: "ALL_ORDER_WS_CONNECTION_SUCCESS" =
  "ALL_ORDER_WS_CONNECTION_SUCCESS";
export const ALL_ORDER_WS_CONNECTION_ERROR: "ALL_ORDER_WS_CONNECTION_ERROR" =
  "ALL_ORDER_WS_CONNECTION_ERROR";
export const ALL_ORDER_WS_CONNECTION_CLOSED: "ALL_ORDER_WS_CONNECTION_CLOSED" =
  "ALL_ORDER_WS_CONNECTION_CLOSED";
export const ALL_ORDER_WS_GET_MESSAGE: "ALL_ORDER_WS_GET_MESSAGE" =
  "ALL_ORDER_WS_GET_MESSAGE";
export const ALL_ORDER_WS_SEND_MESSAGE: "ALL_ORDER_WS_SEND_MESSAGE" =
  "ALL_ORDER_WS_SEND_MESSAGE";

export interface IAllOrdersWsConnectionStart {
  readonly type: typeof ALL_ORDER_WS_CONNECTION_START;
}
export interface IAllOrdersWsConnectionSuccess {
  readonly type: typeof ALL_ORDER_WS_CONNECTION_SUCCESS;
}
export interface IAllOrdersWsConnectionError {
  readonly type: typeof ALL_ORDER_WS_CONNECTION_ERROR;
}
export interface IAllOrdersWsConnectionClosed {
  readonly type: typeof ALL_ORDER_WS_CONNECTION_CLOSED;
}
export interface IAllOrdersWsGetMessage {
  readonly type: typeof ALL_ORDER_WS_GET_MESSAGE;
  readonly payload: { orders: TOrder[]; total: number; totalToday: number };
}
export interface IAllOrdersWsSendMessage {
  readonly type: typeof ALL_ORDER_WS_SEND_MESSAGE;
  readonly payload: { orders: TOrder[]; total: number; totalToday: number };
}

export type TWsAllOrdersActions =
  | IAllOrdersWsConnectionStart
  | IAllOrdersWsConnectionSuccess
  | IAllOrdersWsConnectionError
  | IAllOrdersWsConnectionClosed
  | IAllOrdersWsGetMessage
  | IAllOrdersWsSendMessage;

export const wsConnectionOpenAllOrders = (): IAllOrdersWsConnectionStart => {
  return {
    type: ALL_ORDER_WS_CONNECTION_START,
  };
};

export const wsConnectionSuccessAllOrders =
  (): IAllOrdersWsConnectionSuccess => {
    return {
      type: ALL_ORDER_WS_CONNECTION_SUCCESS,
    };
  };

export const wsConnectionErrorAllOrders = (): IAllOrdersWsConnectionError => {
  return {
    type: ALL_ORDER_WS_CONNECTION_ERROR,
  };
};

export const wsConnectionCloseAllOrders = (): IAllOrdersWsConnectionClosed => {
  return {
    type: ALL_ORDER_WS_CONNECTION_CLOSED,
  };
};

export const wsGetAllOrders = (orders: {
  orders: TOrder[];
  total: number;
  totalToday: number;
}): IAllOrdersWsGetMessage => {
  return {
    type: ALL_ORDER_WS_GET_MESSAGE,

    payload: orders,
  };
};
export const wsSendAllOrders = (orders: {
  orders: TOrder[];
  total: number;
  totalToday: number;
}): IAllOrdersWsSendMessage => {
  return {
    type: ALL_ORDER_WS_SEND_MESSAGE,

    payload: orders,
  };
};
