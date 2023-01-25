import { useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import styles from "./cardOrder.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { orderType } from "../../utils/types";
import { formatDate } from "../../utils/formatDate";
import { statusName } from "../../utils/statusOrder";
import * as selectors from "../../services/selectors";
export const CardOrder = ({ openModalOrderInfo, order, counterVisibility }) => {
  const location = useLocation();
  const orderIngredients = order.ingredients;
  const allIngredients = useSelector(selectors.ingredients);
  const pending = order.status === "pending";
  let isVisibleCounter = false;
  let deltaCounter = 0;
  const filterIngredients = useMemo(() => {
    return orderIngredients.map((ingredient) => {
      return allIngredients.find((item) => ingredient === item._id);
    });
  }, [orderIngredients, allIngredients]);
  const arrayIngredients = useMemo(() => {
    return filterIngredients.map((el) => {
      return el;
    });
  }, [filterIngredients]);
  const validIngredients = useMemo(() => {
    const validArray = [];
    arrayIngredients.forEach((ingredient) => {
      if (ingredient) {
        validArray.push({ ...ingredient, key: uuid() });
      }
    });
    return validArray;
  }, [arrayIngredients]);
  const visibleIngredients = useMemo(() => {
    if (validIngredients.length > 6) {
      deltaCounter = validIngredients.length - 6;
      isVisibleCounter = true;
      return validIngredients.splice(0, 6);
    } else {
      return validIngredients;
    }
  }, [validIngredients]);
  const totalPrice = useCallback(() => {
    return validIngredients.reduce((acc, item) => acc + item.price, 0);
  }, [validIngredients]);
  return (
    <Link
      className={`${styles.link} `}
      to={{
        pathname: `${location.pathname}/${order._id}`,
        state: { background: location },
      }}
    >
      <div
        className={`${styles.order} p-6 mr-2 mb-2`}
        onClick={() => {
          openModalOrderInfo();
        }}
      >
        <div className={`${styles.serviceInfo} mb-6`}>
          <p
            className={`text text_type_digits-default`}
          >{`#${order.number}`}</p>
          <p className={`text text_type_main-default text_color_inactive`}>
            {formatDate(order.createdAt)}
          </p>
        </div>
        <h2 className={`text text_type_main-medium`}>{order.name}</h2>
        {pending && !counterVisibility && (
          <p className={`${styles.doneColor} text text_type_main-default mt-2`}>
            {statusName(order.status)}
          </p>
        )}
        {counterVisibility && (
          <p className={`${styles.doneColor} text text_type_main-default mt-2`}>
            {statusName(order.status)}
          </p>
        )}
        <div className={`${styles.detailInfo} mt-6`}>
          <div className={`${styles.ingredients} mr-6`}>
            {visibleIngredients &&
              visibleIngredients.map((ingredient) => (
                <img
                  key={ingredient.key}
                  className={`${styles.ingredient}`}
                  src={ingredient.image}
                  alt={`${ingredient.name}`}
                />
              ))}
            {isVisibleCounter && (
              <div className={`${styles.counter}`}>
                <p
                  className={`${styles.textCounter} text text_type_main-default`}
                >{`+${deltaCounter}`}</p>
              </div>
            )}
          </div>
          <div className={`${styles.price}`}>
            <p className={`text text_type_digits-default`}>{totalPrice()}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
};
CardOrder.propTypes = {
  openModalOrderInfo: PropTypes.func.isRequired,
  order: orderType.isRequired,
  counterVisibility: PropTypes.bool.isRequired,
};
