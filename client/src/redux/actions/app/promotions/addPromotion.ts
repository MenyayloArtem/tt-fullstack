import Promotion from "../../../../shared/types/Promotion"
import createAction from "../../../createAction"

export const ADD_PROMOTION = "ADD_PROMOTION"

export default (promotion : Promotion|Promotion[]) => createAction(ADD_PROMOTION, promotion)