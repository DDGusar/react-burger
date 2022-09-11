import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { modalRoot } from "../../utils/constants";
import { ModalOverlay } from "../modal-overlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const Modal = ({ header, onClose: onClose, children }) => {
  const onEsc = (e) => {
    e.key === "Escape" && onClose();
  };
  useEffect(() => {
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, []);
  return createPortal(
    <>
      <div className={`${styles.modal}`}>
        <h1 className="text text_type_main-large">{header}</h1>
        <button className={`${styles.buttonClose}`}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>

      <ModalOverlay oneClick={onClose} />
    </>,
    modalRoot
  );
};
