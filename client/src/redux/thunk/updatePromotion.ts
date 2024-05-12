import { Dispatch } from "redux";
import Promotion from "../../shared/types/Promotion";
import Api from "../../api/Api";
import formatDate from "../../heplers/formatDate";
import savePromotion from "../actions/app/promotions/savePromotion";

export default function (promotion : Promotion) {
    return async (dispatch : Dispatch) => {
        let res = await Api.patch("promotions", {
            ...promotion,
            gift : promotion.gift.id,
        })
        
        if (res.statusText === "OK") {
            dispatch(savePromotion(promotion));
        }
    }
}