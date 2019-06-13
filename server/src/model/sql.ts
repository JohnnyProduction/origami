import { TDBConnection } from "../database";

const sqlCallback = <T>(
    resolve: (...params: T[]) => void,
    reject: (value: Error) => void,
) => (err: Error | undefined, ...params: T[]) => {
    if (err) {
        reject(err);
    }

    resolve(...params);
} 

export const sqlGet = <T>(db: TDBConnection, sql:string, params: any[]): Promise<T|undefined> => {
    return new Promise((resolve, reject) => {
        db.get(sql, params, sqlCallback(resolve, reject));
    });
}

export const sqlAll = <T>(db: TDBConnection, sql:string, params: any[]): Promise<T[]> => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, sqlCallback(resolve, reject));
    });
}

export const sqlRun = (db: TDBConnection, sql:string, params: any[]): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(sql, params, sqlCallback(resolve, reject));
    });
}

export const sqlExec = (db: TDBConnection, sql:string): Promise<void> => {
    return new Promise((resolve, reject) => {
        db.run(sql, sqlCallback(resolve, reject));
    });
}
