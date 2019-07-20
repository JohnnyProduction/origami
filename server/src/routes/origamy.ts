import { getReadRoute, getCreateRoute, getSearchRoute } from "./route";
import { getOrigamyByCode, insertOrigamy, getOrigamyPage } from "../model/origamy";
import { TDBConnection } from "../database";
import * as joi from "joi";

export const ORIGAMY_PATH = "/origamy";
export const ORIGAMY_NAME = "Origamy";

export const getOrigamyReadRoute = (db: TDBConnection) => getReadRoute(db, {
    name: ORIGAMY_NAME,
    path: ORIGAMY_PATH,
    description: "Получить оригами",
    notes: "Возвращает полную информацию конкретной оригами по code",
    getItemByCode: getOrigamyByCode,
});

export const getOrigamyCreateRoute = (db: TDBConnection) => getCreateRoute(db, {
    name: ORIGAMY_NAME,
    path: ORIGAMY_PATH,
    description: "Создать оригами",
    notes: "Создает оригами по параметрам",
    insertItem: insertOrigamy,
    params: joi.object({
        code: joi.string().required(),
        name: joi.string().required(),
        complexity: joi.number().required(),
        duration: joi.number().required(),
    }).meta({className: ORIGAMY_NAME})
});

export const getOrigamySearchRoute = (db: TDBConnection) => getSearchRoute(db, {
    name: ORIGAMY_NAME,
    path: ORIGAMY_PATH,
    description: "Создать оригами",
    notes: "Создает оригами по параметрам",
    getItemPage: getOrigamyPage
});
