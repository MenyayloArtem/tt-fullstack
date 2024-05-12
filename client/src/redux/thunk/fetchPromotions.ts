import { Dispatch } from "redux";
import Promotion from "../../shared/types/Promotion";
import setPromotions from "../actions/app/promotions/setPromotions";
import Api from "../../api/Api";

export default function () {
  return async (dispatch : Dispatch) => {
    const promotions = await Api.get("promotions/all")
    console.log(promotions)
    dispatch(setPromotions(promotions.data))
  };
}
