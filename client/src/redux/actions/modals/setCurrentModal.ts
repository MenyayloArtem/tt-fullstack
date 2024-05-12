import { ModalName } from "../../reducers/modalReducer"
import { PayloadAction } from "../type/PayloadAction"


export const SET_MODAL = "SET_MODAL"

export default (modalName : ModalName|null) : PayloadAction => {
    return {
        type : SET_MODAL,
        payload : modalName
    }
}