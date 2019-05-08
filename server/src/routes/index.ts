import { Database } from "database";
import { AutorsRoute } from "./autors";

export const getAllRoutes = (database: Database) => {
    return [
        new AutorsRoute(database),
    ];
}