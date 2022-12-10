import { orderRequest } from "../../utils/api";
import { cleanCart } from "./currentIngredients";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const getOrder = (ingredientsIdArray) => {
  return function (dispatch) {
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
