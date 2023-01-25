import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./profileOrders.module.css";
import PropTypes from "prop-types";
import { ListOrders } from "../list-orders/ListOrders";
import { ProfileNavigation } from "../profile-navigation/ProfileNavigation";
import {
  wsConnectionOpenUserOrders,
  wsConnectionClosedUserOrders,
} from "../../services/actions/wsUserOrders";

export const ProfileOrders = ({ openModalOrderInfo }) => {
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
      <ListOrders openModalOrderInfo={openModalOrderInfo} type="user" />
    </section>
  );
};

ProfileOrders.propTypes = {
  openModalOrderInfo: PropTypes.func.isRequired,
};
