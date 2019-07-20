import { TDBConnection } from "../database";
import { TServerRoute } from "../server";
import { getAutorByCode, insertAutor, getAllAutors, deleteAutorByCode } from "../model/autor";
import { getReadRoute, getCreateRoute, getReadAllRoute, getDeleteRoute } from "./route";
import * as joi from "joi";

export const AUTOR_NAME = "Autor";
export const AUTOR_PATH = "/autor";

export const getAutorReadRoute = (db: TDBConnection): TServerRoute => getReadRoute(db, {
    name: AUTOR_NAME,
    path: AUTOR_PATH,
    description: "Получить автора оригами",
    notes: "Возвращает полную информацию конкретного автора по code",
    getItemByCode: getAutorByCode,
});

export const getAutorReadAllRoute = (db: TDBConnection): TServerRoute => getReadAllRoute(db, {
    name: AUTOR_NAME,
    path: AUTOR_PATH,
    description: "Получить всех авторов оригами",
    notes: "Возвращает список с полной информацией обо всех авторах оригами",
    getItems: getAllAutors,
});

export const getAutorCreateRoute = (db: TDBConnection): TServerRoute => getCreateRoute(db, {
    name: AUTOR_NAME,
    path: AUTOR_PATH,
    description: "Создать автора оригами",
    notes: "Создает автора оригами по переданным параметрам",
    insertItem: insertAutor,
    params: joi.object({
        code: joi.string().required(),
        name: joi.string().required(),
    }).meta({className: "Autor"})
});

export const getAutorDeleteRoute = (db: TDBConnection): TServerRoute => getDeleteRoute(db, {
    name: AUTOR_NAME,
    path: AUTOR_PATH,
    description: "Удалить автора оригами",
    notes: "Удаляет конкретного автора по code",
    deleteItemByCode: deleteAutorByCode,
    getItemByCode: getAutorByCode,
});
