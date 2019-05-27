import { IRouterState, routerReducer } from "./router";
import { combineReducers } from "redux";

export interface IRootState {
    router: IRouterState;
}

export const rootReducer = combineReducers<IRootState>({
    router: routerReducer,
});
