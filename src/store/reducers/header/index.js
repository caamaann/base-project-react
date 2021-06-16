import {
  SET_SELECTED_HEADER,
  SET_SELECTED_LINK_HEADER,
  SET_GO_BACK,
  SET_HEADER_MODAL,
} from "../../actions/header";

const initialState = [];

export function setSelectedHeader(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_HEADER:
      return action.value;
    default:
      return state;
  }
}

export function setSelectedLinkHeader(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_LINK_HEADER:
      return action.value;
    default:
      return state;
  }
}

export function setGoBack(state = initialState, action) {
  switch (action.type) {
    case SET_GO_BACK:
      return action.value;
    default:
      return state;
  }
}

export function setHeaderModal(state = initialState, action) {
  switch (action.type) {
    case SET_HEADER_MODAL:
      return {
        ...state,
        isOpenModal: action.data.isOpen,
        modalType: action.data.modalType,
      };
    default:
      return state;
  }
}
