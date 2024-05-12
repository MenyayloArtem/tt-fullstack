import { PayloadAction } from "../actions/type/PayloadAction";
import { SET_MODAL } from "../actions/modals/setCurrentModal";
import { HISTORY_PUSH } from "../actions/modals/historyPush";
import { HISTORY_POP } from "../actions/modals/historyPop";
import { SET_HISTORY } from "../actions/modals/setHistory";
export type ModalName = "confirm" | "edit" | "create" | "gifts";

interface State {
  currentModal: ModalName | null;
  modalHistory: ModalName[];
}

const initialState: State = {
  currentModal: null,
  modalHistory: [],
};

const modalReducer = (state = initialState, action: PayloadAction): State => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        currentModal: action.payload,
      };
    case SET_HISTORY:
      return {
        ...state,
        modalHistory: action.payload,
      };
    case HISTORY_PUSH:
      return {
        ...state,
        modalHistory: [...state.modalHistory, action.payload],
      };
    case HISTORY_POP:
      return {
        ...state,
        modalHistory: state.modalHistory.slice(0, -1),
      };
    default:
      return state;
  }
};

export default modalReducer;
