import { Route, CRUDRoute } from "./route";
import { ResponseToolkit, Request, ServerRoute } from "hapi";
import { parseNumberQuery, parseStringQuery } from "../utils/parse_query";
import { CategoryModel, ICategoryModel } from "../model/category";
import { AutorsRoute } from "./autors";
import { AutorModel } from "../model/autor";
const  joi = require("@hapi/joi");

export class CategoryRoute extends CRUDRoute<ICategoryModel> {
    public PATH = "/category";
    protected read() {
        return {
            description: "Получить категорию оригами",
            notes: "Возвращает полную информацию о конкретной категории по id",
            handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                const id = parseNumberQuery(request.params.id);
                const category = await CategoryModel.findByPk(id);

                if (!category) {
                    return h.response(JSON.stringify({
                        error: {
                            description: `Category with id ${id} not found`,
                            code: 404,
                        }
                    })).type("application/json").code(404);
                }

                return h.response(JSON.stringify(category.toPlain())).type("application/json");
            },
        }
    }
    protected readAll() {
        return {
            description: "Получить все категории оригами",
            notes: "Возвращает список авторов с полной информацией по ним",
            handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                const categories = await CategoryModel.findAll();

                return h.response(JSON.stringify(
                    categories.map(autor => autor.toPlain())
                )).type("application/json");
            },
        };
    }
    protected create() {
        return {
            description: "Создать категорию оригами",
            notes: "Создает новую категорию",
            params: {
                name: joi.string().optional(),
                image: joi.string().optional(),
                rating: joi.number().optional(),
            },
            handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                const name = request.query.name && parseStringQuery(request.query.name);
                const image = request.query.image && parseStringQuery(request.query.image);
                const rating = request.query.rating && parseNumberQuery(request.query.rating);

                const category: CategoryModel = await CategoryModel.create({name, image, rating});
                await category.save();

                return h.response(JSON.stringify({
                    meta: {
                        description: `Category with name ${category.name} was created`,
                        ref: `${this.PATH}?id=${category.id}`,
                    }
                })).code(201).type("application/json");
            },
        };
    }
    protected update() {
        return {
            description: "Обновить категорию оригами",
            notes: "Обновляет категорию по id",
            params: {
                name: joi.string().optional(),
                image: joi.string().optional(),
                rating: joi.string().optional(),
            },
            handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                const id = parseNumberQuery(request.params.id);
                const name = request.query.name && parseStringQuery(request.query.name);
                const image = request.query.image && parseStringQuery(request.query.image);
                const rating = request.query.rating && parseNumberQuery(request.query.rating);

                const category: CategoryModel|null = await CategoryModel.findByPk(id);
                
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
                await category.save();
                return h.response().code(200).type("application/json");
            },
        };   
    }
    protected delete() {
        return {
            description: "Удалить категорию оригами",
            notes: "Удаляет категорию по id",
            handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
                const id = parseNumberQuery(request.params.id);

                const category: CategoryModel|null = await CategoryModel.findByPk(id);
                
                if (!category) {
                    return h.response(JSON.stringify({
                        error: {
                            description: `Category with id ${id} not found`,
                            code: 404,
                        }
                    })).type("application/json").code(404);  
                }
                await category.destroy();
                return h.response().code(200).type("application/json");
            },
        }
    }
}