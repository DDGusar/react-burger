import React from "react";
import styles from "./modalOverlay.module.css";
export const ModalOverlay = ({ onClick }) => {
  return <div onClick={onClick} className={styles.overlay}></div>;
};
