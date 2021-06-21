export const ACTIVE_MENU = "ACTIVE_MENU";
export const TOAST_MODAL = "TOAST_MODAL";

export const setActiveMenu = (menu) => (dispatch) => {
  dispatch({ type: ACTIVE_MENU, menu });
};

export const setToastModal = (isOpen, isSuccess, modalBody) => (dispatch) => {
  dispatch({ type: TOAST_MODAL, data: { isOpen, isSuccess, modalBody } });
};
