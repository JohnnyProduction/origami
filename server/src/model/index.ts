import { Database } from "../database";
import { AutorModel } from "./autor";
import { CategoryModel } from "./category";

// TODO сделать initialize и toPlain обязательным в моделях
export const initAllModels = (database: Database) => {
    AutorModel.initialize(database);
    CategoryModel.initialize(database);
};
