import { Database } from "database";
import { AutorRoute } from "./autor";
import { CategoryRoute } from "./category";

export const getAllRoutes = (database: Database) => {
    return [
        new AutorRoute(database),
        new CategoryRoute(database),
    ];
}
