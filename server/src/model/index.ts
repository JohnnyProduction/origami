import { Database } from "../database";
import { initAutors } from "./autor";
import { initCategories } from "./category";

export const initModels = (database: Database) => {
    initAutors(database);
    // initCategories(database);
};
