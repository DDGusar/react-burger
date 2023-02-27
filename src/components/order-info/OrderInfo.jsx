import styles from "./orderInfo.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  wsConnectionOpenAllOrders,
  wsConnectionCloseAllOrders,
} from "../../services/actions/wsAllOrders";
import {
  wsConnectionOpenUserOrders,
  wsConnectionClosedUserOrders,
} from "../../services/actions/wsUserOrders";
import { statusName } from "../../utils/statusOrder";
import * as selectors from "../../services/selectors";

export const OrderInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const allOrders = useSelector(selectors.allOrders);
  const userOrders = useSelector(selectors.userOrders);

  useEffect(() => {
    dispatch(wsConnectionOpenUserOrders());
    dispatch(wsConnectionOpenAllOrders());
    return () => {
      dispatch(wsConnectionClosedUserOrders());
      dispatch(wsConnectionCloseAllOrders());
    };
  }, [dispatch]);

  let orders;

  if (location.pathname.includes("feed")) {
    orders = allOrders;
  } else if (location.pathname.includes("profile")) {
    orders = userOrders;
  }

  const ingredients = useSelector(selectors.ingredients);
  const currentOrder = orders?.find((order) => order._id === id);
  if (!currentOrder) return null;
  const { name, number, createdAt, ingredients: ingredientsId } = currentOrder;
  const orderedIngredients = ingredientsId
    .filter((ingredient) => ingredient != null)
    .map((item) => ingredients.find((el) => el._id === item));
  const uniqueIngredients = [...new Set(orderedIngredients)];

  const sumTotal = orderedIngredients.reduce(
    (acc, item) => acc + item?.price,
    0
  );

  return (
    currentOrder && (
      <section className={styles.content}>
        <div>
          <h2 className={`${styles.number} text text_type_digits-default`}>
            #{number}
          </h2>
          <p className={"text text_type_main-medium mt-10 mb-3"}>{name}</p>
          <p
            className={`${
              currentOrder.status === "done" ? styles.doneColor : ""
            } text text_type_main-default`}
          >
            {statusName(currentOrder.status)}
          </p>
        </div>

        <div className="mt-15 mb-10">
          <p className="text text_type_main-medium mb-6">Состав:</p>

          <ul className={`${styles.list} custom-scroll`}>
            {uniqueIngredients.map((item, index) => (
              <li key={index} className={`${styles.listItem} mb-4`}>
                <img
                  src={item?.image_mobile}
                  className={styles.icon}
                  alt="иконка ингредиента"
                />
                <p
                  className={`${styles.text} text text_type_main-default mr-4 ml-4`}
                >
                  {item?.name}
                </p>
                <div className={`${styles.quantity} mr-6`}>
                  <p className="text text_type_digits-default mr-2">
                    {
                      orderedIngredients.filter((el) => el?._id === item?._id)
                        .length
                    }
                  </p>
                  <p className="text text_type_digits-default mr-2">
                    x {item?.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(createdAt)} />
          </p>

          <div className={`${styles.price} ml-6`}>
            <p className="text text_type_digits-default mr-2">{sumTotal}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </section>
    )
  );
};
