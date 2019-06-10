import { HomePage } from "../pages/home";
import { OrigamyPage } from "../pages/origamy";
import { RouteObject } from "redux-first-router";
import { SearchOrigamyPage } from "../pages/search_origamy";
import { CategoriesPage } from "../pages/categories";
import { RouteType } from "./route_type";

type RouteObjectWithComponent = RouteObject & {
    type: RouteType,
    component: React.ComponentType;
}

export interface IRoutesMap {
    [key: string]: RouteObjectWithComponent,
}

export const routesMap: IRoutesMap = {
    [RouteType.HOME]: {
        type: RouteType.HOME,
        path: "/",
        component: HomePage,
    },
    [RouteType.ORIGAMY]: {
        type: RouteType.ORIGAMY,
        path: "/origamy",
        component: OrigamyPage,
    },
    [RouteType.SEARCH_ORIGAMY]: {
        type: RouteType.SEARCH_ORIGAMY,
        path: "/search_origamy",
        component: SearchOrigamyPage,
    },
    [RouteType.CATEGORIES]: {
        type: RouteType.CATEGORIES,
        path: "/categories",
        component: CategoriesPage,
    },
    [RouteType.BEGINNER]: {
        type: RouteType.BEGINNER,
        path: "/beginner",
        component: () => null as any as JSX.Element,
    },
}
