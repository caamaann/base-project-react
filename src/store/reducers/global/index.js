import { ACTIVE_MENU, TOAST_MODAL } from "../../actions";

const initialState = {
  activeMenu: null,
  isOpen: false,
  isSuccess: false,
  modalBody: "",
};

const global = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVE_MENU:
      return {
        ...state,
        activeMenu: action.menu,
      };
    case TOAST_MODAL:
      return {
        ...state,
        isOpen: action.data.isOpen,
        isSuccess: action.data.isSuccess,
        modalBody: action.data.modalBody,
      };
    default:
      return state;
  }
};

export default global;
