import { TDBConnection } from "../database";
import { TServerRoute } from "../server";
import { getAutorByCode, insertAutor } from "../model/autor";
import { getReadRoute, getCreateRoute } from "./route";
const  joi = require("@hapi/joi");

export const AUTOR_PATH = "/autor";

export const getAutorReadRoute = (db: TDBConnection): TServerRoute => getReadRoute(db, {
    name: "Autor",
    path: AUTOR_PATH,
    description: "Получить автора оригами",
    notes: "Возвращает полную информацию конкретного автора по code",
    getItemByCode: getAutorByCode,
});

export const getAutorCreateRoute = (db: TDBConnection): TServerRoute => getCreateRoute(db, {
    name: "Autor",
    path: AUTOR_PATH,
    description: "Создать автора оригами",
    notes: "Создает автора оригами по переданным параметрам",
    insertItem: insertAutor,
    params: {
        code: joi.string().required(),
        name: joi.string().required(),
    }
});
