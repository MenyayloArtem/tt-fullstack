import createAction from "../../../createAction"

export const SET_PROMOTIONS_COUNT = "SET_PROMOTIONS_COUNT"

export default (count : number) => createAction(SET_PROMOTIONS_COUNT, count)