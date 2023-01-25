import PropTypes from "prop-types";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ListOrders } from "../components/list-orders/ListOrders";
import { OrdersBoard } from "../components/orders-board/OrdersBoard";
import {
  wsConnectionOpenAllOrders,
  wsConnectionCloseAllOrders,
} from "../services/actions/wsAllOrders";

export function OrderFeedPage({ openModalOrderInfo }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionOpenAllOrders());
    return () => {
      dispatch(wsConnectionCloseAllOrders());
    };
  }, [dispatch]);
  return (
    <>
      <ListOrders
        openModalOrderInfo={openModalOrderInfo}
        header="Лента заказов"
        type="all"
      />
      <OrdersBoard />
    </>
  );
}
OrderFeedPage.propTypes = {
  openModalOrderInfo: PropTypes.func.isRequired,
};
