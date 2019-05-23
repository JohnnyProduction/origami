import { Route } from "./route";
import { ResponseToolkit, Request, ServerRoute } from "hapi";
import { AutorModel } from "../model/autor";
import { parseNumberQuery, parseStringQuery } from "../utils/parse_query";
const  joi = require("@hapi/joi");

export class AutorsRoute extends Route {
    public PATH = "/autors";
    public getHapiRoutes(): ServerRoute[]{
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
                handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                    const id = parseNumberQuery(request.params.id);
                    const autor = await AutorModel.findByPk(id);

                    if (!autor) {
                        return h.response(JSON.stringify({
                            error: {
                                description: `Autor with id ${id} not found`,
                                code: 404,
                            }
                        })).type("application/json").code(404);
                    }

                    return h.response(JSON.stringify(autor.toPlain())).type("application/json");
                },
            },
            {
                method: "GET",
                path: this.PATH,
                options: {
                    tags: ["api"],
                    description: "Получить всех авторов оригами",
                    notes: "Возвращает список авторов с полной информацией по ним",
                },
                handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                    const autors = await AutorModel.findAll();

                    return h.response(
                        JSON.stringify(
                            autors.map(autor => autor.toPlain())
                        )
                    ).type("application/json");
                },
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
                handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                    const name = parseStringQuery(request.query.name);
                    const avatar = parseStringQuery(request.query.avatar);

                    const autor: AutorModel = await AutorModel.create({name, avatar});
                    await autor.save();

                    return h.response(JSON.stringify({
                        meta: {
                            description: `Autor with name ${autor.name} was created`,
                            ref: `${this.PATH}?id=${autor.id}`,
                        }
                    })).code(201).type("application/json");
                },
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
                handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                    const id = parseNumberQuery(request.params.id);
                    const name = request.query.name && parseStringQuery(request.query.name);
                    const avatar = request.query.avatar && parseStringQuery(request.query.avatar);

                    const autor: AutorModel|null = await AutorModel.findByPk(id);
                    
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
                    await autor.save();
                    return h.response().code(200).type("application/json");
                },
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
                handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                    const id = parseNumberQuery(request.params.id);

                    const autor: AutorModel|null = await AutorModel.findByPk(id);
                    
                    if (!autor) {
                        return h.response(JSON.stringify({
                            error: {
                                description: `Autor with id ${id} not found`,
                                code: 404,
                            }
                        })).type("application/json").code(404);  
                    }
                    await autor.destroy();
                    return h.response().code(200).type("application/json");
                },
            },
        ];
    }
}
