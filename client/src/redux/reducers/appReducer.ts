import Gift from "../../shared/types/Gift";
import Promotion from "../../shared/types/Promotion";
import { SAVE_PROMOTION } from "../actions/app/promotions/savePromotion";
import { SET_PROMOTIONS } from "../actions/app/promotions/setPromotions";
import { SELECT_GIFT } from "../actions/app/gifts/selectGift";
import { SELECT_PROMOTION } from "../actions/app/promotions/selectPromotion";
import { SET_GIFTS } from "../actions/app/gifts/setGifts";
import { PayloadAction } from "../actions/type/PayloadAction";
import { ADD_PROMOTION } from "../actions/app/promotions/addPromotion";
import { DELETE_PROMOTION } from "../actions/app/promotions/deletePromotion";
import {
  SET_SEARCHED_COUNT,
  SET_SEARCHED_PROMOTIONS,
} from "../actions/app/promotions/setSearchedPromotions";
import { SET_PROMOTIONS_COUNT } from "../actions/app/promotions/setPromotionsCount";

interface State {
  gifts: Gift[];
  currentPromotion: Promotion | null;
  promotions: Promotion[];
  promotionsTotalCount: number;
  searchedPromotions: Promotion[];
  seelcteGift: Gift | null;
  searchedCount: number;
}

const initialState: State = {
  gifts: [],
  currentPromotion: null,
  promotions: [],
  searchedPromotions: [],
  seelcteGift: null,
  promotionsTotalCount: 0,
  searchedCount: 0,
};

export default function (state = initialState, action: PayloadAction): State {
  switch (action.type) {
    // Promotions

    case SET_PROMOTIONS:
      return {
        ...state,
        promotions: action.payload,
      };
    case SAVE_PROMOTION:
      return {
        ...state,
        currentPromotion: action.payload,
        promotions: state.promotions.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
        searchedPromotions: state.searchedPromotions.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case SELECT_PROMOTION:
      return {
        ...state,
        currentPromotion: action.payload,
      };
    case ADD_PROMOTION:
      let promotions = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      return {
        ...state,
        promotions: [...state.promotions, ...promotions],
      };
    case DELETE_PROMOTION:
      return {
        ...state,
        promotions: state.promotions.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case SET_SEARCHED_PROMOTIONS:
      return {
        ...state,
        searchedPromotions: action.payload,
      };
    case SET_PROMOTIONS_COUNT:
      return {
        ...state,
        promotionsTotalCount: action.payload,
      };
    case SET_SEARCHED_COUNT:
      return {
        ...state,
        searchedCount: action.payload,
      };

    // Gifts

    case SET_GIFTS:
      return {
        ...state,
        gifts: action.payload,
      };
    case SELECT_GIFT:
      return {
        ...state,
        seelcteGift: action.payload,
      };

    default:
      return state;
  }
}
