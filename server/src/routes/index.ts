import { TDBConnection } from "../database";
import { TServerRoute } from "../server";
import { getAutorReadRoute, getAutorCreateRoute } from "./autor";

export const createAllRoutes = (db: TDBConnection): TServerRoute[] => {
    return [
        getAutorReadRoute(db),
        getAutorCreateRoute(db),
    ]
};
