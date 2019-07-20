import { TDBConnection } from "../database";
import { sqlGet, sqlAll, sqlRun } from "./sql";

export type TCategory = {
    code: string;
    name: string;
}

export const getCategoryByCode = (db: TDBConnection, code: string) => {
    return sqlGet<TCategory>(
        db,
        "SELECT * FROM categories WHERE code = ?",
        [code]
    );
}

export const getAllCategories = (db: TDBConnection) => {
    return sqlAll<TCategory>(
        db,
        "SELECT * FROM categories",
        [],
    );
}

export const insertCategory = (db: TDBConnection, category: TCategory) => {
    const {code, name} = category;

    return sqlRun(
        db,
        "INSERT INTO categories (code, name) VALUES (?, ?)",
        [code, name]
    );
}

export const deleteCategoryByCode = (db: TDBConnection, code: string) => {
    return sqlRun(
        db,
        "DELETE FROM categories WHERE code = ?",
        [code]
    );
}
