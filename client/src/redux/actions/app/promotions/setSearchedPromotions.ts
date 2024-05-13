import Promotion from "../../../../shared/types/Promotion"
import createAction from "../../../createAction"

export const SET_SEARCHED_PROMOTIONS = "SET_SEARCHED_PROMOTIONS"
export const SET_SEARCHED_COUNT = "SET_SEARCHED_COUNT"

export default (promotions : Promotion[]) => createAction(SET_SEARCHED_PROMOTIONS, promotions)
export const setSearchedCount = (count : number) => createAction(SET_SEARCHED_COUNT, count)