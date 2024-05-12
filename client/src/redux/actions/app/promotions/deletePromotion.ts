import Promotion from "../../../../shared/types/Promotion"
import createAction from "../../../createAction"

export const DELETE_PROMOTION = "DELETE_PROMOTION"

export default (promotion : Promotion) => createAction(DELETE_PROMOTION, promotion)