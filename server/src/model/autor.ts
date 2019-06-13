import { TDBConnection } from "../database";
import { sqlGet, sqlRun } from "./sql";

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

export const insertAutor = (db: TDBConnection, autor: TAutor): Promise<void> => {
    const {code, name} = autor;

    return sqlRun(
        db,
        "INSERT INTO autors (code, name) VALUES (?, ?)",
        [code, name]
    );
}
