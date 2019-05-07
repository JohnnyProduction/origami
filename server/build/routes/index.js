"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autor_1 = require("./autor");
const category_1 = require("./category");
exports.getAllRoutes = (database) => {
    return [
        new autor_1.AutorRoute(database),
        new category_1.CategoryRoute(database),
    ];
};
