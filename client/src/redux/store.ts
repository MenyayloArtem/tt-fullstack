import { applyMiddleware, combineReducers, createStore } from "redux";
import modalReducer from "./reducers/modalReducer";
import { thunk } from "redux-thunk";
import appReducer from "./reducers/appReducer";

const rootReducer = combineReducers({
  modal: modalReducer,
  app : appReducer
});

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
