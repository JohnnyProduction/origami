import { TCategory } from "./category";
import { TDBConnection } from "database";
import { sqlGet, sqlAll, sqlExec, sqlRun } from "./sql";
import { TPage, TPageSort } from "./page";

export type TOrigamyStep = {
    code: string,
    number: number,
    description: string,
    photos: string,
    schemas: string,
}

export type TShortOrigamy = {
    code: string,
    name: string,
    complexity: number,
    duration: number,
}

export type TOrigamy = TShortOrigamy & {
    description: string,
    photos: string,
    categories: TCategory[],
    steps: TOrigamyStep[],
}

export const getOrigamyByCode = (db: TDBConnection, code: string) => {
    return sqlGet<TOrigamy>(
        db,
        "SELECT * FROM origamies WHERE code = ?",
        [code],
    );
}

export const insertOrigamy = (db: TDBConnection, origamy: TShortOrigamy) => {
    const { code, name, complexity, duration } = origamy;

    return sqlRun(
        db,
        "INSERT INTO origamies (code, name, complexity, duration) VALUES (?, ?, ?, ?)",
        [code, name, complexity, duration]
    );
}

export const deleteOrigamyByCode = (db: TDBConnection, code: string) => {
    return sqlRun(
        db,
        "DELETE FROM origamies WHERE code = ?",
        [code]
    );
}

export const getOrigamyStepByCode = (db: TDBConnection, code: string) => {
    return sqlGet<TOrigamyStep>(
        db,
        "SELECT * FROM origamy_steps WHERE code = ?",
        [code]
    );
}

export const getAllOrigamySteps = (db: TDBConnection) => {
    return sqlAll<TOrigamyStep>(
        db,
        "SELECT * FROM origamy_steps",
        [],
    );
}

export const insertOrigamyStep = (db: TDBConnection, origamyStep: TOrigamyStep) => {
    const {code, description, number, photos, schemas} = origamyStep;

    return sqlRun(
        db,
        "INSERT INTO origamy_steps (code, description, number, photos, schemas) VALUES (?, ?)",
        [code, description, number, photos, schemas]
    );
}

export const deleteOrigamyStepByCode = (db: TDBConnection, code: string) => {
    return sqlRun(
        db,
        "DELETE FROM origamy_steps WHERE code = ?",
        [code]
    );
}

export const getOrigamyPage = async (db: TDBConnection, from: number, to:number, sort: TPageSort, textMatch?: string): Promise<TPage<TShortOrigamy>> => {
    let matchSql = "";
    let sortSql = "";
    let matchParams: any[] = [];
    let sortParams: any[] = [];

    if (textMatch) {
        matchSql = "WHERE origamies_index MATCH ?";
        matchParams.push(textMatch);
    }

    if (sort) {
        sortSql += "ORDER BY ?"
        sortParams.push(sort.fieldName);

        if (sort.desc) {
            sortSql += " DESC"
        }
    }

    const totalResult = await sqlGet<{"COUNT(*)": number}>(
        db,
        `SELECT COUNT(*) FROM origamies_index ${matchSql}`,
        matchParams,
    );
    const total = totalResult ? totalResult["COUNT(*)"] : 0;
    
    const sql = textMatch
        ? `SELECT code, name, complexity, duration FROM origamies WHERE rowid in (SELECT rowid FROM origamies_index ${matchSql}) ${sortSql} LIMIT ? OFFSET ?`
        : `SELECT code, name, complexity, duration FROM origamies ${sortSql} LIMIT ? OFFSET ?`

    const data = await sqlAll<TShortOrigamy>(
        db,
        sql,
        [...matchParams, ...sortParams, to - from, from],
    );

    return {
        from,
        to,
        total,
        data,
    }
}
