import { useMemo, FC } from "react";
import { useSelector } from "../../services/hooks/useSelector";
import styles from "./ordersBoard.module.css";
import * as selectors from "../../services/selectors";

export const OrdersBoard: FC = () => {
  const allOrders = useSelector(selectors.allOrders);
  const allTotal = useSelector(selectors.allTotal);
  const allTotalToday = useSelector(selectors.allTotalToday);
  const statusDone = allOrders
    .filter((order) => order.status === "done")
    .slice(0, 10);
  const statusWait = allOrders
    .filter((order) => order.status !== "done")
    .slice(0, 10);
  return (
    <div className={`${styles.content} pt-25`}>
      <div className={`${styles.ordersList} `}>
        <div className={` mr-9`}>
          <h2 className={`${styles.title} text text_type_main-medium mb-6`}>
            Готовы:
          </h2>
          <ul className={`${styles.list} ${styles.readyOrders}`}>
            {useMemo(
              () =>
                statusDone.map((order) => (
                  <li
                    key={order._id}
                    className={`${styles.item} text text_type_digits-default`}
                  >
                    {order.number}
                  </li>
                )),
              [statusDone]
            )}
          </ul>
        </div>
        <div className={`${styles.inWorkOrders}`}>
          <h2 className={`${styles.title} text text_type_main-medium mb-6`}>
            В работе:
          </h2>
          <ul className={`${styles.list}`}>
            {useMemo(
              () =>
                statusWait.map((order) => (
                  <li
                    key={order._id}
                    className={`${styles.item} text text_type_digits-default`}
                  >
                    {order.number}
                  </li>
                )),
              [statusWait]
            )}
          </ul>
        </div>
      </div>
      <h2 className={`${styles.title} text text_type_main-medium mt-15`}>
        Выполнено за все время:
      </h2>
      <p className={`${styles.count} text text_type_digits-large`}>
        {allTotal}
      </p>
      <h2 className={`${styles.title} text text_type_main-medium mt-15`}>
        Выполнено за сегодня:
      </h2>
      <p className={`${styles.count} text text_type_digits-large`}>
        {allTotalToday}
      </p>
    </div>
  );
};
