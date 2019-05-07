import { Database } from "database";
import { AutorRoute } from "./autor";

export const getAllRoutes = (database: Database) => {
    return [
        new AutorRoute(database),
    ];
}