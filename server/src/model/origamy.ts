import { TCategory } from "./category";
import { TDBConnection } from "database";
import { sqlGet, sqlAll, sqlExec, sqlRun } from "./sql";
import { TPage, TPageSort } from "./page";

export type TOrigamyStep = {
    code: string,
    number: number,
    description: string,
    photos: string[],
    schemas: string[],
}

export type TShortOrigamy = {
    code: string,
    name: string,
    complexity: number,
    duration: number,
}

export type TOrigamy = TShortOrigamy & {
    description: string,
    photos: string[],
    categories: TCategory[],
    steps: TOrigamyStep[],
}

export const getOrigamyByCode = (db: TDBConnection, code: string) => {
    return sqlGet<TOrigamy>(
        db,
        "SELECT * FROM origamies WHERE code = ?",
        [code]
    );
}

export const insertOrigamy = (db: TDBConnection, origamy: TShortOrigamy) => {
    const { code, name, complexity, duration } = origamy;

    return sqlRun(
        db,
        "INSERT INTO origamies (code, name, complexity, duration) VALUES (?, ?, ?, ?)",
        [code, name, complexity, duration]
    )
}

export const getOrigamyPage = async (db: TDBConnection, from: number, to:number, sort: TPageSort, textMatch?: string): Promise<TPage<TShortOrigamy>> => {
    let matchSql = "";
    let sortSql = "";
    let matchParams: any[] = [];
    let sortParams: any[] = [];

    if (textMatch) {
        matchSql = "WHERE origamies_index MATCH '?'";
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
        `SELECT COUNT(*) FROM origamies_index${matchSql}`,
        matchParams,
    );
    const total = totalResult ? totalResult["COUNT(*)"] : 0;
        console.log(`SELECT code, name, complexity, duration FROM origamies ${sortSql} LIMIT ? OFFSET ?`, [...matchParams, ...sortParams, to - from, from])
    const data = await sqlAll<TShortOrigamy>(
        db,
        `SELECT code, name, complexity, duration FROM origamies ${sortSql} LIMIT ? OFFSET ?`,
        [...matchParams, ...sortParams, to - from, from],
    );

    return {
        from,
        to,
        total,
        data,
    }
}
