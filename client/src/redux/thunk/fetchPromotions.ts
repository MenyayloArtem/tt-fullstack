import { Dispatch } from "redux";
import setPromotions from "../actions/app/promotions/setPromotions";
import Api from "../../api/Api";
import setPromotionsCount from "../actions/app/promotions/setPromotionsCount";

export default function () {
  return async (dispatch: Dispatch) => {
    const res = await Api.get("promotions/all");

    if (res.statusText === "OK") {
      dispatch(setPromotionsCount(+res.headers["x-total-count"]))
      dispatch(setPromotions(res.data));
    }
  };
}
