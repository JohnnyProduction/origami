import { Database } from "../database";
import { AutorModel } from "./autor";

export const initAllModels = (database: Database) => {
    AutorModel.initialize(database);
};
