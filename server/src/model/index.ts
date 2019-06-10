import { Database } from "../database";
import { AutorModel } from "./autor";
import { CategoryModel } from "./category";
import { ImageModel } from "./image";
import { OrigamyModel } from "./origamy";
import { OrigamyPointModel } from "./origamy_point";

// TODO сделать initialize и toPlain обязательным в моделях
// TODO сделать toPlain асинхронным 
export const initAllModels = (database: Database) => {
    ImageModel.initialize(database);
    OrigamyPointModel.initialize(database);
    AutorModel.initialize(database);
    CategoryModel.initialize(database);
    OrigamyModel.initialize(database);
};
