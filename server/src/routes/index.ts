import { Database } from "database";
import { AutorRoute } from "./autor";

export const getRoutes = (database: Database) => {
    return [
        new AutorRoute(database),
    ];
}