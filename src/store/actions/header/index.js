import { actionPending, actionSuccess, actionError } from "../actionTypes";

export const SET_SELECTED_HEADER = "SET_SELECTED_HEADER";
export const SET_SELECTED_LINK_HEADER = "SET_SELECTED_LINK_HEADER";
export const SET_GO_BACK = "SET_GO_BACK";
export const SET_HEADER_MODAL = "SET_HEADER_MODAL";

export function setSelectedHeader(value) {
  return {
    type: SET_SELECTED_HEADER,
    value: value,
  };
}

export function setSelectedLinkHeader(value) {
  return {
    type: SET_SELECTED_LINK_HEADER,
    value: value,
  };
}

export function setGoBack(value) {
  return {
    type: SET_GO_BACK,
    value: value,
  };
}

export const setHeaderModal = (modalType, isOpen) => (dispatch) =>
  dispatch(
    actionSuccess(SET_HEADER_MODAL, { modalType: modalType, isOpen: isOpen })
  );
