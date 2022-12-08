export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (ingredient) => {
  return { type: OPEN_MODAL, payload: ingredient };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};
