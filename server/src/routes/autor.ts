import { Route } from "./route";
import { ResponseToolkit, Request, ServerRoute } from "hapi";
import { AutorModel } from "../model/autor";
import { parseNumberQuery, parseStringQuery } from "../utils/parse_query";
const  joi = require("@hapi/joi");

export class AutorRoute extends Route {
    static PATH = "/autors";
    public getHapiRoute(): ServerRoute[]{
        return [
            {
                method: "GET",
                path: `${AutorRoute.PATH}/{id}`,
                options: {
                    tags: ["api"],
                    description: "Автор оригами",
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
                method: "POST",
                path: AutorRoute.PATH,
                options: {
                    tags: ["api"],
                    description: "Автор оригами",
                    notes: "Создает нового автора",
                    validate: {
                        query: {
                            name: joi.string(),
                            avatar: joi.string(),
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
                            ref: `${AutorRoute.PATH}?id=${autor.id}`,
                        }
                    })).code(201).type("application/json");
                },
            },
        ];
    }
}
