import { Dispatch } from "redux";
import Gift from "../../shared/types/Gift";
import setGifts from "../actions/app/gifts/setGifts";
import Api from "../../api/Api";

export default function () {
    return async (dispatch : Dispatch) => {
        const gifts = await Api.get("gifts/all")

        console.log(gifts)
        dispatch(setGifts(gifts.data))
    }
}