import { OPEN_CREATE, OPEN_READWRITE } from "sqlite3";

export type TDatabaseConfig = {
    sqlitePath: string;
    sqliteMode: number;
}

export type TServerConfig = {
    host: string;
    port: number;
}
export type TConfig = TDatabaseConfig & TServerConfig;

export const CONFIG: TConfig = {
    host: "localhost",
    port: 8778,
    sqlitePath: "./dev_db.sqlite",
    sqliteMode: OPEN_CREATE | OPEN_READWRITE,
};
