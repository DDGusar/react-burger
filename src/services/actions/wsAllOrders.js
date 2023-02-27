export const ALL_ORDER_WS_CONNECTION_START = "ALL_ORDER_WS_CONNECTION_START";
export const ALL_ORDER_WS_CONNECTION_SUCCESS =
  "ALL_ORDER_WS_CONNECTION_SUCCESS";
export const ALL_ORDER_WS_CONNECTION_ERROR = "ALL_ORDER_WS_CONNECTION_ERROR";
export const ALL_ORDER_WS_CONNECTION_CLOSED = "ALL_ORDER_WS_CONNECTION_CLOSED";
export const ALL_ORDER_WS_GET_MESSAGE = "ALL_ORDER_WS_GET_MESSAGE";
export const ALL_ORDER_WS_SEND_MESSAGE = "ALL_ORDER_WS_SEND_MESSAGE";

export const wsConnectionOpenAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_START,
  };
};

export const wsConnectionSuccessAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionErrorAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_ERROR,
  };
};

export const wsConnectionCloseAllOrders = () => {
  return {
    type: ALL_ORDER_WS_CONNECTION_CLOSED,
  };
};

export const wsGetAllOrders = (orders) => {
  return {
    type: ALL_ORDER_WS_GET_MESSAGE,
    payload: orders,
  };
};
export const wsSendAllOrders = (orders) => {
  return {
    type: ALL_ORDER_WS_SEND_MESSAGE,
    payload: orders,
  };
};
