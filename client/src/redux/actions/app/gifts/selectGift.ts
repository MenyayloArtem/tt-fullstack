import Gift from "../../../../shared/types/Gift"
import createAction from "../../../createAction"

export const SELECT_GIFT = "SELECT_GIFT"

export default (gift : Gift|null) => createAction(SELECT_GIFT, gift)