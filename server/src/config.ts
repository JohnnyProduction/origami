// export const enum Environment {
//     Develop,
//     Production,
//     Test,
// }

export interface IConfig {
    host: string;
    port: number;
}

export const CONFIG:IConfig = {
    host: "localhost",
    port: 8778,
}
