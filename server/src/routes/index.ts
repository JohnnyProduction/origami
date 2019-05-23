import { Database } from "database";
import { AutorsRoute } from "./autors";
import { CategoryRoute } from "./category";

export const getAllRoutes = (database: Database) => {
    return [
        new AutorsRoute(database),
        new CategoryRoute(database),
    ];
}
