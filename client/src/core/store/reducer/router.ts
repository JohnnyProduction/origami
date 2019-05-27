import { routesMap } from "../../routes_map";
import { Action, Location } from "redux-first-router";
import { RouteType } from "../../route_type";

export interface IRouterState {
    pathname: string; 
    type: RouteType;
    payload: {};
    prev: {
        pathname: string;
        type: RouteType;
        payload: {}
    };
    kind?: string;
    routesMap: typeof routesMap;
}

const initialState = {
    pathname: "/", 
    type: RouteType.UNDEFINED,
    payload: {},
    prev: {
        pathname: "/",
        type: RouteType.UNDEFINED,
        payload: {}
    },
    kind: undefined,
    // hasSSR: isServer() ? true : undefined,
    routesMap: routesMap
}

export const routerReducer = (state: IRouterState = initialState, action: Action): IRouterState => {
    if (routesMap[action.type]) {
        const pathname = action.meta && action.meta.location.current.pathname;
        const prev = action.meta && action.meta.location.prev;
        const kind = action.meta && action.meta.location.kind;
        return {
          pathname: pathname || "/",
          type: action.type as RouteType,
          payload: { ...action.payload },
          prev: prev || {
            pathname: "",
            type: RouteType.UNDEFINED,
            payload: {}
          } as any,
          kind: kind || undefined,
          routesMap
        }
      }
    
      return state
}