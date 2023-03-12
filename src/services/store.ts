import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { apiConfig } from "../utils/api";
import {
  ALL_ORDER_WS_CONNECTION_START,
  ALL_ORDER_WS_CONNECTION_SUCCESS,
  ALL_ORDER_WS_CONNECTION_ERROR,
  ALL_ORDER_WS_CONNECTION_CLOSED,
  ALL_ORDER_WS_GET_MESSAGE,
  ALL_ORDER_WS_SEND_MESSAGE,
} from "./actions/wsAllOrders";
import {
  USER_ORDER_WS_CONNECTION_START,
  USER_ORDER_WS_CONNECTION_SUCCESS,
  USER_ORDER_WS_CONNECTION_ERROR,
  USER_ORDER_WS_CONNECTION_CLOSED,
  USER_ORDER_WS_GET_MESSAGE,
  USER_ORDER_WS_SEND_MESSAGE,
} from "./actions/wsUserOrders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type TWsUserOrdersActions = {
  wsInitUser?: typeof USER_ORDER_WS_CONNECTION_START;
  wsSendMessage: typeof USER_ORDER_WS_SEND_MESSAGE;
  onOpen: typeof USER_ORDER_WS_CONNECTION_SUCCESS;
  onClose: typeof USER_ORDER_WS_CONNECTION_CLOSED;
  onError: typeof USER_ORDER_WS_CONNECTION_ERROR;
  onMessage: typeof USER_ORDER_WS_GET_MESSAGE;
};
export type TWsAllOrdersActions = {
  wsInit?: typeof ALL_ORDER_WS_CONNECTION_START;
  wsSendMessage: typeof ALL_ORDER_WS_SEND_MESSAGE;
  onOpen: typeof ALL_ORDER_WS_CONNECTION_SUCCESS;
  onClose: typeof ALL_ORDER_WS_CONNECTION_CLOSED;
  onError: typeof ALL_ORDER_WS_CONNECTION_ERROR;
  onMessage: typeof ALL_ORDER_WS_GET_MESSAGE;
};

const wsAllOrdersActions: TWsAllOrdersActions = {
  wsInit: ALL_ORDER_WS_CONNECTION_START,
  wsSendMessage: ALL_ORDER_WS_SEND_MESSAGE,
  onOpen: ALL_ORDER_WS_CONNECTION_SUCCESS,
  onClose: ALL_ORDER_WS_CONNECTION_CLOSED,
  onError: ALL_ORDER_WS_CONNECTION_ERROR,
  onMessage: ALL_ORDER_WS_GET_MESSAGE,
};
const wsUserOrdersActions: TWsUserOrdersActions = {
  wsInitUser: USER_ORDER_WS_CONNECTION_START,
  wsSendMessage: USER_ORDER_WS_SEND_MESSAGE,
  onOpen: USER_ORDER_WS_CONNECTION_SUCCESS,
  onClose: USER_ORDER_WS_CONNECTION_CLOSED,
  onError: USER_ORDER_WS_CONNECTION_ERROR,
  onMessage: USER_ORDER_WS_GET_MESSAGE,
};

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(`${apiConfig.wsBaseUrl}/orders/all`, wsAllOrdersActions),
    socketMiddleware(`${apiConfig.wsBaseUrl}/orders`, wsUserOrdersActions)
  )
);

export const store = createStore(rootReducer, enhancer);
