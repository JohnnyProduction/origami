"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const route_1 = require("./route");
const parse_query_1 = require("../utils/parse_query");
const category_1 = require("../model/category");
const joi = require("@hapi/joi");
class CategoryRoute extends route_1.CRUDRoute {
    constructor() {
        super(...arguments);
        this.PATH = "/category";
    }
    read() {
        return {
            description: "Получить категорию оригами",
            notes: "Возвращает полную информацию о конкретной категории по id",
            handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                const id = parse_query_1.parseNumberQuery(request.params.id);
                const category = yield category_1.CategoryModel.findByPk(id);
                if (!category) {
                    return h.response(JSON.stringify({
                        error: {
                            description: `Category with id ${id} not found`,
                            code: 404,
                        }
                    })).type("application/json").code(404);
                }
                return h.response(JSON.stringify(category.toPlain())).type("application/json");
            }),
        };
    }
    readAll() {
        return {
            description: "Получить все категории оригами",
            notes: "Возвращает список авторов с полной информацией по ним",
            handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                const categories = yield category_1.CategoryModel.findAll();
                return h.response(JSON.stringify(categories.map(autor => autor.toPlain()))).type("application/json");
            }),
        };
    }
    create() {
        return {
            description: "Создать категорию оригами",
            notes: "Создает новую категорию",
            params: {
                name: joi.string().optional(),
                image: joi.string().optional(),
                rating: joi.number().optional(),
            },
            handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                const name = request.query.name && parse_query_1.parseStringQuery(request.query.name);
                const image = request.query.image && parse_query_1.parseStringQuery(request.query.image);
                const rating = request.query.rating && parse_query_1.parseNumberQuery(request.query.rating);
                const category = yield category_1.CategoryModel.create({ name, image, rating });
                yield category.save();
                return h.response(JSON.stringify({
                    meta: {
                        description: `Category with name ${category.name} was created`,
                        ref: `${this.PATH}?id=${category.id}`,
                    }
                })).code(201).type("application/json");
            }),
        };
    }
    update() {
        return {
            description: "Обновить категорию оригами",
            notes: "Обновляет категорию по id",
            params: {
                name: joi.string().optional(),
                image: joi.string().optional(),
                rating: joi.string().optional(),
            },
            handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                const id = parse_query_1.parseNumberQuery(request.params.id);
                const name = request.query.name && parse_query_1.parseStringQuery(request.query.name);
                const image = request.query.image && parse_query_1.parseStringQuery(request.query.image);
                const rating = request.query.rating && parse_query_1.parseNumberQuery(request.query.rating);
                const category = yield category_1.CategoryModel.findByPk(id);
                if (!category) {
                    return h.response(JSON.stringify({
                        error: {
                            description: `Category with id ${id} not found`,
                            code: 404,
                        }
                    })).type("application/json").code(404);
                }
                category.name = name || category.name;
                category.image = image || category.image;
                category.rating = rating || category.rating;
                yield category.save();
                return h.response().code(200).type("application/json");
            }),
        };
    }
    delete() {
        return {
            description: "Удалить категорию оригами",
            notes: "Удаляет категорию по id",
            handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                const id = parse_query_1.parseNumberQuery(request.params.id);
                const category = yield category_1.CategoryModel.findByPk(id);
                if (!category) {
                    return h.response(JSON.stringify({
                        error: {
                            description: `Category with id ${id} not found`,
                            code: 404,
                        }
                    })).type("application/json").code(404);
                }
                yield category.destroy();
                return h.response().code(200).type("application/json");
            }),
        };
    }
    getHapiRoutes() {
        return [
            ...super.getHapiRoutes(),
            {
                method: "GET",
                path: `${this.PATH}/search`,
                options: {
                    tags: ["api"],
                    description: "Постраничный поиск категории",
                    notes: "Возвращает страницу заданного размера по поисковым параметрам",
                    validate: {
                        query: {
                            from: joi.number().required(),
                            to: joi.number().required(),
                            sortField: joi.string().optional(),
                            invertSort: joi.boolean().optional(),
                            name: joi.string().optional(),
                            image: joi.string().optional(),
                            rating: joi.number().optional(),
                        }
                    }
                },
                handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                    const from = parse_query_1.parseNumberQuery(request.query.from);
                    const to = parse_query_1.parseNumberQuery(request.query.to);
                    // const sortField = request.query.sortField && parseStringQuery(request.query.sortField);
                    // const invertSort = request.query.invertSort && parseBooleanQuery(request.query.invertSort);
                    // const name = request.query.name && parseStringQuery(request.query.name);
                    // const image = request.query.image && parseStringQuery(request.query.image);
                    // const rating = request.query.rating && parseNumberQuery(request.query.rating);
                    const filter = {};
                    const sort = [];
                    // if (sortField) {
                    //     if (invertSort) {
                    //         sort.push([sortField]);
                    //     } else {
                    //         sort.push([sortField, "DESC"]);
                    //     }
                    // }
                    // if (name) {
                    //     filter["name"] = name;
                    // }
                    // if (image) {
                    //     filter["image"] = image;
                    // }
                    // if (rating) {
                    //     filter["rating"] = rating;
                    // }
                    const categories = yield category_1.CategoryModel.findAll({
                        offset: from,
                        limit: to - from,
                    });
                    return h.response(JSON.stringify(categories.map(autor => autor.toPlain()))).type("application/json");
                }),
            },
        ];
    }
}
exports.CategoryRoute = CategoryRoute;
