import React, { useEffect, FC } from "react";
import { useDispatch } from "../../services/hooks/useDispatch";
import styles from "./profileOrders.module.css";
import { ListOrders } from "../list-orders/ListOrders";
import { ProfileNavigation } from "../profile-navigation/ProfileNavigation";
import {
  wsConnectionOpenUserOrders,
  wsConnectionClosedUserOrders,
} from "../../services/actions/wsUserOrders";

type TProfileOrdersProps = {
  openModalOrderInfo: () => void;
};

export const ProfileOrders: FC<TProfileOrdersProps> = ({
  openModalOrderInfo,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsConnectionOpenUserOrders());
    return () => {
      dispatch(wsConnectionClosedUserOrders());
    };
  }, [dispatch]);
  return (
    <section className={styles.content}>
      <ProfileNavigation />
      <ListOrders openModalOrderInfo={openModalOrderInfo} header="" />
    </section>
  );
};
