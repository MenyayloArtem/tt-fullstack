import createAction from "../../createAction"
import { ModalName } from "../../reducers/modalReducer"


export const HISTORY_PUSH = "HISTORU_PUSH"

export default (item : ModalName) => createAction(HISTORY_PUSH, item)