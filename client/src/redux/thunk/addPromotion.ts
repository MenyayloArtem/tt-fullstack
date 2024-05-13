import { Dispatch } from "redux";
import Promotion from "../../shared/types/Promotion";
import Api from "../../api/Api";
import addPromotion from "../actions/app/promotions/addPromotion";

export default function (promotion: Promotion) {
  return async (dispatch: Dispatch) => {
    let temp = {
      ...promotion,
      gift: promotion.gift.id,
    };

    // @ts-ignore
    delete temp.date
    let res = await Api.post("promotions", temp);

    if (res.statusText === "OK") {
      promotion.id = res.data.id
      dispatch(addPromotion(promotion));
    }
  };
}
