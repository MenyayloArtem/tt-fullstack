import Promotion from "../../../../shared/types/Promotion"
import createAction from "../../../createAction"

export const SAVE_PROMOTION = "SAVE_PROMOTION"

export default (promotion : Promotion) => createAction(SAVE_PROMOTION, promotion)