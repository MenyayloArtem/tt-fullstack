import Gift from "../../shared/types/Gift";
import Promotion, { RawPromotion } from "../../shared/types/Promotion";
import { SAVE_PROMOTION } from "../actions/app/promotions/savePromotion";
import { SET_PROMOTIONS } from "../actions/app/promotions/setPromotions";
import { SELECT_GIFT } from "../actions/app/gifts/selectGift";
import { SELECT_PROMOTION } from "../actions/app/promotions/selectPromotion";
import { SET_GIFTS } from "../actions/app/gifts/setGifts";
import { PayloadAction } from "../actions/type/PayloadAction";
import { ADD_PROMOTION } from "../actions/app/promotions/addPromotion";
import { DELETE_PROMOTION } from "../actions/app/promotions/deletePromotion";

interface State {
  gifts: Gift[];
  currentPromotion: Promotion | null;
  promotions: Promotion[];
  seelcteGift : Gift | null
}

const initialState: State = {
  gifts: [],
  currentPromotion: null,
  promotions: [],
  seelcteGift : null
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
      };
    case SELECT_PROMOTION:
      return {
        ...state,
        currentPromotion: action.payload,
      };
    case ADD_PROMOTION:
      return {
        ...state,
        promotions: [...state.promotions, action.payload],
      };
    case DELETE_PROMOTION:
      return {
        ...state,
        promotions: state.promotions.filter(
          (item) => item.id !== action.payload.id
        ),
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
        // currentPromotion: state.currentPromotion
        //   ? {
        //       ...state.currentPromotion,
        //       gift: action.payload,
        //     }
        //   : state.currentPromotion,
        // promotions: state.promotions.map((item) => {
        //   if (item.id === state.currentPromotion?.id && state.currentPromotion) {
        //     return state.currentPromotion;
        //   }
        //   return item;
        // }),
        seelcteGift : action.payload
      };

    default:
      return state;
  }
}
