import Promotion from "../../../../shared/types/Promotion"
import createAction from "../../../createAction"

export const SET_PROMOTIONS = "SET_PROMOTIONS"

export default (promotions : Promotion[]) => createAction(SET_PROMOTIONS, promotions)