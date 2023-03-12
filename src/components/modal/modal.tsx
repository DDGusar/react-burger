import React, { useEffect, FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { modalRoot } from "../../utils/api";
import { ModalOverlay } from "../modal-overlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

type TModalProps = {
  onClose: () => void;
  header?: string;
  children: ReactNode;
};

export const Modal: FC<TModalProps> = ({ header, onClose, children }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };
    document.addEventListener("keydown", onEsc);

    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  }, []);
  return createPortal(
    <>
      <div className={`${styles.modal} pl-10 pt-10 pr-10`}>
        <div className={`${styles.header}`}>
          <h1 className="text text_type_main-large">{header}</h1>
          <button
            className={styles.buttonClose}
            type="button"
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>

      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};
