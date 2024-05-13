import { Dispatch } from "redux";
import setGifts from "../actions/app/gifts/setGifts";
import Api from "../../api/Api";

export default function () {
    return async (dispatch : Dispatch) => {
        const gifts = await Api.get("gifts/all")

        dispatch(setGifts(gifts.data))
    }
}