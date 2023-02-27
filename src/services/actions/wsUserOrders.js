export const USER_ORDER_WS_CONNECTION_START = "USER_ORDER_WS_CONNECTION_START";
export const USER_ORDER_WS_CONNECTION_SUCCESS =
  "USER_ORDER_WS_CONNECTION_SUCCESS";
export const USER_ORDER_WS_CONNECTION_ERROR = "USER_ORDER_WS_CONNECTION_ERROR";
export const USER_ORDER_WS_CONNECTION_CLOSED =
  "USER_ORDER_WS_CONNECTION_CLOSED";
export const USER_ORDER_WS_GET_MESSAGE = "USER_ORDER_WS_GET_MESSAGE";
export const USER_ORDER_WS_SEND_MESSAGE = "USER_ORDER_WS_SEND_MESSAGE";

export const wsConnectionOpenUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_START,
  };
};

export const wsConnectionSuccessUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionErrorUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosedUserOrders = () => {
  return {
    type: USER_ORDER_WS_CONNECTION_CLOSED,
  };
};

export const wsGetUserOrders = (orders) => {
  return {
    type: USER_ORDER_WS_GET_MESSAGE,
    payload: orders,
  };
};
export const wsSendUserOrders = (orders) => {
  return {
    type: USER_ORDER_WS_SEND_MESSAGE,
    payload: orders,
  };
};
