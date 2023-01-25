import { useMemo } from "react";
import { useSelector } from "react-redux";
import styles from "./listOrders.module.css";
import PropTypes from "prop-types";
import { CardOrder } from "../card-order/CardOrder";
import * as selectors from "../../services/selectors";

export const ListOrders = ({ openModalOrderInfo, header, type }) => {
  const selector = type === "user" ? selectors.userOrders : selectors.allOrders;
  const orders = useSelector(selector);

  const counterVisibility = type === "user" ? true : false;
  return (
    <section className={`${styles.content}`}>
      {header && (
        <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      )}
      <div className={`${styles.orders}`}>
        {useMemo(
          () =>
            orders.map((order) => (
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

ListOrders.propTypes = {
  openModalOrderInfo: PropTypes.func.isRequired,
  header: PropTypes.string,
  type: PropTypes.string.isRequired,
};
