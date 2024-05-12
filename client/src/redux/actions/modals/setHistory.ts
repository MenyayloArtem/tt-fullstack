import createAction from "../../createAction"
import { ModalName } from "../../reducers/modalReducer"


export const SET_HISTORY = "SET_HISTORY"

export default (value : ModalName[]) => createAction(SET_HISTORY, value)