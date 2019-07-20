import { TDBConnection } from "../database";
import { sqlGet, sqlRun, sqlAll } from "./sql";


export type TAutor = {
    code: string;
    name: string;
}

export const getAutorByCode = (db: TDBConnection, code: string) => {
    return sqlGet<TAutor>(
        db,
        "SELECT * FROM autors WHERE code = ?",
        [code]
    );
}

export const getAllAutors = (db: TDBConnection) => {
    return sqlAll<TAutor>(
        db,
        "SELECT * FROM autors",
        [],
    );
}

export const insertAutor = (db: TDBConnection, autor: TAutor) => {
    const {code, name} = autor;

    return sqlRun(
        db,
        "INSERT INTO autors (code, name) VALUES (?, ?)",
        [code, name]
    );
}

export const deleteAutorByCode = (db: TDBConnection, code: string) => {
    return sqlRun(
        db,
        "DELETE FROM autors WHERE code = ?",
        [code]
    );
}
