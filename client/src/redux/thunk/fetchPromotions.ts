import { Dispatch } from "redux";
import setPromotions from "../actions/app/promotions/setPromotions";
import Api from "../../api/Api";

export default function () {
  return async (dispatch : Dispatch) => {
    const promotions = await Api.get("promotions/all")
    
    dispatch(setPromotions(promotions.data))
  };
}
