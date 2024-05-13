import { Dispatch } from "redux";
import Promotion from "../../shared/types/Promotion";
import Api from "../../api/Api";
import deletePromotion from "../actions/app/promotions/deletePromotion";

export default function (promotion : Promotion) {
    return async (dispatch : Dispatch) => {
        let res = await Api.delete("promotions", {
            id : promotion.id
        })
        
        if (res.statusText === "OK") {
            dispatch(deletePromotion(promotion));
        }
    }
}