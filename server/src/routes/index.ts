import { TDBConnection } from "../database";
import { TServerRoute } from "../server";
import { getAutorReadRoute, getAutorCreateRoute, getAutorReadAllRoute, getAutorDeleteRoute } from "./autor";
import { getOrigamyReadRoute, getOrigamyCreateRoute, getOrigamySearchRoute } from "./origamy";

export const getAllRoutes = (db: TDBConnection): TServerRoute[] => {
    return [
        getAutorReadRoute(db),
        getAutorReadAllRoute(db),
        getAutorCreateRoute(db),
        getAutorDeleteRoute(db),

        getOrigamyReadRoute(db),
        getOrigamyCreateRoute(db),
        getOrigamySearchRoute(db),
    ];
};
