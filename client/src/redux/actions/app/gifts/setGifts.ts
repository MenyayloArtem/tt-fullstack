import Gift from "../../../../shared/types/Gift"
import createAction from "../../../createAction"


export const SET_GIFTS = "SET_GIFTS"

export default (gifts : Gift[]) => createAction(SET_GIFTS, gifts)