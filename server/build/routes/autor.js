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
const autor_1 = require("../model/autor");
const parse_query_1 = require("../utils/parse_query");
const joi = require("@hapi/joi");
class AutorRoute extends route_1.Route {
    constructor() {
        super(...arguments);
        this.PATH = "/autor";
    }
    getHapiRoutes() {
        return [
            {
                method: "GET",
                path: `${this.PATH}/{id}`,
                options: {
                    tags: ["api"],
                    description: "Получить автора оригами",
                    notes: "Возвращает полную информацию конкретного автора по id",
                    validate: {
                        params: {
                            id: joi.number(),
                        }
                    }
                },
                handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                    const id = parse_query_1.parseNumberQuery(request.params.id);
                    const autor = yield autor_1.AutorModel.findByPk(id);
                    if (!autor) {
                        return h.response(JSON.stringify({
                            error: {
                                description: `Autor with id ${id} not found`,
                                code: 404,
                            }
                        })).type("application/json").code(404);
                    }
                    return h.response(JSON.stringify(autor.toPlain())).type("application/json");
                }),
            },
            {
                method: "GET",
                path: this.PATH,
                options: {
                    tags: ["api"],
                    description: "Получить всех авторов оригами",
                    notes: "Возвращает список авторов с полной информацией по ним",
                },
                handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                    const autors = yield autor_1.AutorModel.findAll();
                    return h.response(JSON.stringify(autors.map(autor => autor.toPlain()))).type("application/json");
                }),
            },
            {
                method: "POST",
                path: this.PATH,
                options: {
                    tags: ["api"],
                    description: "Создать автора оригами",
                    notes: "Создает нового автора",
                    validate: {
                        query: {
                            name: joi.string().required(),
                            avatar: joi.string().required(),
                        }
                    }
                },
                handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                    const name = parse_query_1.parseStringQuery(request.query.name);
                    const avatar = parse_query_1.parseStringQuery(request.query.avatar);
                    const autor = yield autor_1.AutorModel.create({ name, avatar });
                    yield autor.save();
                    return h.response(JSON.stringify({
                        meta: {
                            description: `Autor with name ${autor.name} was created`,
                            ref: `${this.PATH}?id=${autor.id}`,
                        }
                    })).code(201).type("application/json");
                }),
            },
            {
                method: "PUT",
                path: `${this.PATH}/{id}`,
                options: {
                    tags: ["api"],
                    description: "Обновить автора оригами",
                    notes: "Обновляет автора по id",
                    validate: {
                        params: {
                            id: joi.number(),
                        },
                        query: {
                            name: joi.string().optional(),
                            avatar: joi.string().optional(),
                        }
                    }
                },
                handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                    const id = parse_query_1.parseNumberQuery(request.params.id);
                    const name = request.query.name && parse_query_1.parseStringQuery(request.query.name);
                    const avatar = request.query.avatar && parse_query_1.parseStringQuery(request.query.avatar);
                    const autor = yield autor_1.AutorModel.findByPk(id);
                    if (!autor) {
                        return h.response(JSON.stringify({
                            error: {
                                description: `Autor with id ${id} not found`,
                                code: 404,
                            }
                        })).type("application/json").code(404);
                    }
                    autor.name = name || autor.name;
                    autor.avatar = avatar || autor.avatar;
                    yield autor.save();
                    return h.response().code(200).type("application/json");
                }),
            },
            {
                method: "DELETE",
                path: `${this.PATH}/{id}`,
                options: {
                    tags: ["api"],
                    description: "Удалить автора оригами",
                    notes: "Удаляет автора по id",
                    validate: {
                        params: {
                            id: joi.number(),
                        },
                    }
                },
                handler: (request, h, err) => __awaiter(this, void 0, void 0, function* () {
                    const id = parse_query_1.parseNumberQuery(request.params.id);
                    const autor = yield autor_1.AutorModel.findByPk(id);
                    if (!autor) {
                        return h.response(JSON.stringify({
                            error: {
                                description: `Autor with id ${id} not found`,
                                code: 404,
                            }
                        })).type("application/json").code(404);
                    }
                    yield autor.destroy();
                    return h.response().code(200).type("application/json");
                }),
            },
        ];
    }
}
exports.AutorRoute = AutorRoute;
