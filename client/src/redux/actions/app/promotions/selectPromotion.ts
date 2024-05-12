import Promotion from "../../../../shared/types/Promotion"
import createAction from "../../../createAction"

export const SELECT_PROMOTION = "SELECT_PROMOTION"

export default (promotion : Promotion|null) => createAction(SELECT_PROMOTION, promotion)