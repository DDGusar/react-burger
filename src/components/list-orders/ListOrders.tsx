import { useMemo, FC } from "react";
import { useSelector } from "../../services/hooks/useSelector";
import { useLocation } from "react-router-dom";
import styles from "./listOrders.module.css";
import { CardOrder } from "../card-order/CardOrder";
import * as selectors from "../../services/selectors";
import { TOrder } from "../../services/types/data";

type TListOrdersProps = {
  openModalOrderInfo: () => void;
  header: string;
};

export const ListOrders: FC<TListOrdersProps> = ({
  openModalOrderInfo,
  header,
}) => {
  const location = useLocation();
  const selector = location.pathname.includes("profile")
    ? selectors.userOrders
    : selectors.allOrders;

  const orders = useSelector(selector);

  const counterVisibility = location.pathname.includes("profile")
    ? true
    : false;
  return (
    <section className={`${styles.content}`}>
      {header && (
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      )}
      <div className={`${styles.orders}`}>
        {useMemo(
          () =>
            orders.map((order: TOrder) => (
              <CardOrder
                key={order._id}
                openModalOrderInfo={openModalOrderInfo}
                order={order}
                counterVisibility={counterVisibility}
              />
            )),
          [orders, openModalOrderInfo]
        )}
      </div>
    </section>
  );
};
