export interface IDatabaseConfig {
    sqlitePath: string;
}

export interface IServerConfig {
    host: string;
    port: number;
}
export type IConfig = IDatabaseConfig & IServerConfig;

export const CONFIG:IConfig = {
    host: "localhost",
    port: 8778,
    sqlitePath: "test.sqlite",
};
