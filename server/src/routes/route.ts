import { Database } from "../database";
import { ServerRoute, Lifecycle, HandlerDecorations } from "hapi";
import { JoiObject } from "joi";
import { CONFIG } from "../config";
const joi = require("joi");

export abstract class Route {
    protected database: Database;

    constructor(database?: Database) {
        this.database = database || new Database(CONFIG);
    }

    public abstract getHapiRoutes(): ServerRoute[];
}

interface ICRUDServerRoute<T> {
    description: string;
    notes: string;
    handler: Lifecycle.Method | HandlerDecorations
    params?: {
        [name in keyof T]: JoiObject
    },
}

export abstract class CRUDRoute<T> extends Route {
    public getHapiRoutes() {
        const read = this.read();
        const readAll = this.readAll();
        const create = this.create();
        const update = this.update();
        const del = this.delete();

        return [
            {
                method: "GET",
                path: `${this.PATH}/{id}`,
                options: {
                    tags: ["api"],
                    description: read.description,
                    notes: read.notes,
                    validate: {
                        params: {
                            id: joi.number(),
                        }
                    }
                },
                handler: read.handler
            },
            {
                method: "GET",
                path: this.PATH,
                options: {
                    tags: ["api"],
                    description: readAll.description,
                    notes: readAll.notes,
                },
                handler: readAll.handler
            },
            {

                method: "POST",
                path: this.PATH,
                options: {
                    tags: ["api"],
                    description: create.description,
                    notes: create.notes,
                    validate: {
                        query: create.params
                    }
                },
                handler: create.handler,
            },
            {
                method: "PUT",
                path: `${this.PATH}/{id}`,
                options: {
                    tags: ["api"],
                    description: update.description,
                    notes: update.notes,
                    validate: {
                        params: {
                            id: joi.number(),
                        },
                        query: update.params,
                    },
                },
                handler: update.handler,
            },
            {
                method: "DELETE",
                path: `${this.PATH}/{id}`,
                options: {
                    tags: ["api"],
                    description: del.description,
                    notes: del.notes,
                    validate: {
                        params: {
                            id: joi.number(),
                        },
                    },
                    handler: del.handler,
                },
            }
        ]
    }

    public abstract PATH: string;
    
    protected abstract read(): ICRUDServerRoute<T>;
    protected abstract readAll(): ICRUDServerRoute<T>;
    protected abstract create(): ICRUDServerRoute<T>;
    protected abstract update(): ICRUDServerRoute<T>;
    protected abstract delete(): ICRUDServerRoute<T>;
}
