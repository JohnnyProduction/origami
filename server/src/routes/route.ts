import { TDBConnection } from "../database";
import { TServerRoute } from "../server";
import { ResponseToolkit, Request } from "hapi";
import { parseStringQuery } from "../utils/parse_query";
import { JoiObject } from "joi";
const  joi = require("@hapi/joi");

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

export type TCreateRouteConfig<T> = {
    name: string,
    path: string,
    description: string,
    notes: string,
    params: {[paramName: string]: JoiObject}
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

            await config.insertItem(db, item);

            return h.response(JSON.stringify({
                meta: {
                    description: `${config.name} with code ${item.code} was created`,
                    ref: `${config.path}?id=${item.code}`,
                }
            })).code(201).type("application/json");
        },
    }
}

