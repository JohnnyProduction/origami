"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autor_1 = require("./autor");
const category_1 = require("./category");
// TODO сделать initialize и toPlain обязательным в моделях
exports.initAllModels = (database) => {
    autor_1.AutorModel.initialize(database);
    category_1.CategoryModel.initialize(database);
};
