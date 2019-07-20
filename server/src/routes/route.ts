import { TDBConnection } from "../database";
import { TServerRoute } from "../server";
import { ResponseToolkit, Request } from "hapi";
import { parseStringQuery, parseNumberQuery } from "../utils/parse_query";
import { JoiObject, ObjectSchema } from "joi";
import * as joi from "joi";
import { TPage, TPageSort } from "../model/page";

export type TReadRouteConfig<T> = {
    name: string,
    path: string,
    description: string,
    notes: string,
    getItemByCode: (db: TDBConnection, code: string) => Promise<T|undefined>,
}

export const getReadRoute = <T>(db: TDBConnection, config: TReadRouteConfig<T>): TServerRoute => {
    return {
        method: "GET",
        path: `${config.path}/{code}`,
        options: {
            tags: ["api"],
            description: config.description,
            notes: config.notes,
            validate: {
                params: {
                    code: joi.string(),
                }
            }
        },
        handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
            const code = parseStringQuery(request.params.code);

            const item = await config.getItemByCode(db, code);

            if (!item) {
                return h.response(JSON.stringify({
                    error: {
                        description: `${config.name} with code ${code} not found`,
                        code: 404,
                    }
                })).type("application/json").code(404);
            }

            return h.response(JSON.stringify(item)).type("application/json");
        },
    }
}

export type TReadAllRouteConfig<T> = {
    name: string,
    path: string,
    description: string,
    notes: string,
    getItems: (db: TDBConnection) => Promise<T[]|undefined>,
}

export const getReadAllRoute = <T>(db: TDBConnection, config: TReadAllRouteConfig<T>): TServerRoute => {
    return {
        method: "GET",
        path: `${config.path}`,
        options: {
            tags: ["api"],
            description: config.description,
            notes: config.notes,
        },
        handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
            const items = await config.getItems(db);

            return h.response(JSON.stringify(items || [])).type("application/json");
        },
    }
}

export type TCreateRouteConfig<T> = {
    name: string,
    path: string,
    description: string,
    notes: string,
    params: {[paramName: string]: JoiObject} | ObjectSchema,
    insertItem: (db: TDBConnection, item: T) => Promise<void>,
}

export const getCreateRoute = <T extends {code: string}>(db: TDBConnection, config: TCreateRouteConfig<T>): TServerRoute => {
    return {
        method: "POST",
        path: config.path,
        options: {
            tags: ["api"],
            description: config.description,
            notes: config.notes,
            validate: {
                payload: config.params,
            }
        },
        handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
            const item: T = Object.keys(config.params).reduce<T>((acc, key) => {
                return { ...acc, [key]: (request as any).payload[key]};
            }, {} as T);

            try {
                await config.insertItem(db, item);

                return h.response(JSON.stringify({
                    meta: {
                        description: `${config.name} with code ${item.code} was created`,
                        ref: `${config.path}/${item.code}`,
                    }
                })).code(201).type("application/json");
            } catch (e) {
                if (e.code === "SQLITE_CONSTRAINT") {
                    return h.response(JSON.stringify({
                        error: {
                            description: `${config.name} with code ${item.code} already exists`,
                            code: 409,
                        }
                    })).code(409).type("application/json");
                }

                throw e;
            }
        },
    }
}

export type TDeleteRouteConfig<T> = {
    name: string,
    path: string,
    description: string,
    notes: string,
    deleteItemByCode: (db: TDBConnection, code: string) => Promise<void>,
    getItemByCode: (db: TDBConnection, code: string) => Promise<T|undefined>,
}

export const getDeleteRoute = <T>(db: TDBConnection, config: TDeleteRouteConfig<T>): TServerRoute => {
    return {
        method: "DELETE",
        path: `${config.path}/{code}`,
        options: {
            tags: ["api"],
            description: config.description,
            notes: config.notes,
            validate: {
                params: {
                    code: joi.string(),
                }
            }
        },
        handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
            const code = parseStringQuery(request.params.code);

            const item = await config.getItemByCode(db, code)

            if (!item) {
                return h.response(JSON.stringify({
                    error: {
                        description: `${config.name} with code ${code} not found`,
                        code: 404,
                    }
                })).type("application/json").code(404);
            }

            await config.deleteItemByCode(db, code);

            return h.response(JSON.stringify({
                meta: {
                    description: `${config.name} with code ${code} was deleted`,
                }
            })).type("application/json");
        },
    }
}

export type TSearchRouteConfig<T> = {
    name: string,
    path: string,
    description: string,
    notes: string,
    getItemPage: (db: TDBConnection, from: number, to:number, sort: TPageSort, textMatch?: string) => Promise<TPage<T>>,
}

export const getSearchRoute = <T>(db: TDBConnection, config: TSearchRouteConfig<T>) => {
    return {
        method: "GET",
        path: `/search${config.path}`,
        options: {
            tags: ["api"],
            description: config.description,
            notes: config.notes,
            validate: {
                params: {
                    from: joi.number().required(),
                    to: joi.number().required(),
                    match: joi.string().optional(),
                }
            }
        },
        handler: async (request: Request, h: ResponseToolkit, err?: Error) => {
            const from = parseNumberQuery(request.params.from);
            const to = parseNumberQuery(request.params.to);
            const match = request.params.match ? parseStringQuery(request.params.match) : undefined;
            const sort: TPageSort = {
                fieldName: "name",
            };

            const page = await config.getItemPage(db, from, to, sort, match);

            return h.response(JSON.stringify(page)).type("application/json");
        },
    }
}
