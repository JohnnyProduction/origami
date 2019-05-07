"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const config_1 = require("../config");
const joi = require("joi");
class Route {
    constructor(database) {
        this.database = database || new database_1.Database(config_1.CONFIG);
    }
}
exports.Route = Route;
class CRUDRoute extends Route {
    getHapiRoutes() {
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
        ];
    }
}
exports.CRUDRoute = CRUDRoute;
