import { Dispatch } from "redux";
import Promotion from "../../shared/types/Promotion";
import Api from "../../api/Api";
import deletePromotion from "../actions/app/promotions/deletePromotion";
import setPromotionsCount from "../actions/app/promotions/setPromotionsCount";

export default function (promotion : Promotion) {
    return async (dispatch : Dispatch) => {
        let res = await Api.delete("promotions", {
            id : promotion.id
        })
        
        if (res.statusText === "OK") {
            dispatch(setPromotionsCount(res.headers['x-total-count']))
            dispatch(deletePromotion(promotion));
        }
    }
}