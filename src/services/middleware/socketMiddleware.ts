import { getCookie } from "../../utils/cookie";
import { Middleware, MiddlewareAPI } from "redux";
import { TWsAllOrdersActions, TWsUserOrdersActions } from "../store";
import { RootState, AppDispatch } from "../types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWsUserOrdersActions | TWsAllOrdersActions
): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === (wsActions as TWsUserOrdersActions).wsInitUser) {
        const authToken = getCookie("authToken");
        if (authToken) {
          socket = new WebSocket(`${wsUrl}?token=${authToken}`);
        }
      } else if (type === (wsActions as TWsAllOrdersActions).wsInit) {
        socket = new WebSocket(wsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
