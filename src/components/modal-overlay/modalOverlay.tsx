import React, { FC } from "react";
import styles from "./modalOverlay.module.css";

export type TModalOverlayProps = {
  onClick: () => void;
};

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <div onClick={onClick} className={styles.overlay}></div>;
};
