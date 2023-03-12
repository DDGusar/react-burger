import { useDispatch } from "../services/hooks/useDispatch";
import { useEffect, FC } from "react";
import { ListOrders } from "../components/list-orders/ListOrders";
import { OrdersBoard } from "../components/orders-board/OrdersBoard";
import {
  wsConnectionOpenAllOrders,
  wsConnectionCloseAllOrders,
} from "../services/actions/wsAllOrders";

type TOrderFeedPageProps = {
  openModalOrderInfo: () => void;
};

export const OrderFeedPage: FC<TOrderFeedPageProps> = ({
  openModalOrderInfo,
}) => {
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
      />
      <OrdersBoard />
    </>
  );
};
