import { connectRoutes } from "redux-first-router";
import { routesMap } from "../routes_map";
import { rootReducer } from "./reducer";
import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const { middleware: routerMiddleware, enhancer: routerEnhancer } = connectRoutes(routesMap, {
    location: "router",
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(routerEnhancer, applyMiddleware(routerMiddleware)),
);
