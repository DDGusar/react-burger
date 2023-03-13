import styles from "./orderInfo.module.css";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useEffect, FC } from "react";
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
import { TIngredient, TLocation } from "../../services/types/data";

export const OrderInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation<TLocation>();
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

  let currentOrder;

  if (location.pathname.includes("feed")) {
    currentOrder = allOrders?.find((order) => order._id === id);
  } else {
    currentOrder = userOrders?.find((order) => order._id === id);
  }

  const currentIngredients: TIngredient[] = useSelector(selectors.ingredients);
  if (!currentOrder) return null;
  const { name, number, createdAt, ingredients } = currentOrder;
  const orderedIngredients = ingredients
    .filter((ingredient) => ingredient != null)
    .map((item) => currentIngredients.filter((el) => el._id === item)[0]);
  const uniqueIngredients = [...new Set(orderedIngredients)];

  const sumTotal: number = orderedIngredients.reduce(
    (acc, item) => acc + item?.price,
    0
  );

  return (
    <>
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
    </>
  );
};
