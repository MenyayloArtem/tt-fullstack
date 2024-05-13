import { Dispatch } from "redux";
import Promotion from "../../shared/types/Promotion";
import Api from "../../api/Api";
import setPromotions from "../actions/app/promotions/setPromotions";
import setPromotionsCount from "../actions/app/promotions/setPromotionsCount";
import addPromotion from "../actions/app/promotions/addPromotion";
import store, { RootState } from "../store";
import setSearchedPromotions, { setSearchedCount } from "../actions/app/promotions/setSearchedPromotions";

export interface PromotionsQuery {
  search?: string;
  page?: number;
  sort?: {
    field: string;
    order: string;
  };
}

export default function (query: PromotionsQuery) {
  const page = query.page || 0;
  const sort = query?.sort ? Object.assign(query.sort, {}) : {};
  return async (dispatch: Dispatch) => {
    let storeState = store.getState();
    let { app } = storeState as any as RootState;

    let needUpdateMain = app.promotionsTotalCount > app.promotions.length
    let needUpdateSearch = query.search

    if (
      needUpdateMain ||
      !app.promotionsTotalCount || query.search
    ) {
      let res = await Api.get("promotions/all", {
        page: page,
        ...sort,
        search: query.search || undefined,
      });

      if (res.statusText === "OK") {
        let count = +res.headers["x-total-count"]
        if (query.search) {
          dispatch(setSearchedPromotions(res.data))
          dispatch(setSearchedCount(count))
        } else {
          dispatch(setPromotionsCount(count));
          dispatch(addPromotion(res.data));
        }
      }
    }
  };
}
