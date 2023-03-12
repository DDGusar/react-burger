import { orderRequest } from "../../utils/api";
import { cleanCart } from "./currentIngredients";
import { TIngredientsIdArray } from "../types/data";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: number;
}
export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}

export type TOrderActions =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed;

export const getOrder = (ingredientsIdArray: TIngredientsIdArray) => {
  return function (dispatch: any) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    orderRequest(ingredientsIdArray)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order.number,
        });
      })
      .then(() => {
        dispatch(cleanCart());
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(err);
      });
  };
};
