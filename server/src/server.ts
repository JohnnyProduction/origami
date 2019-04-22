import {Server} from "hapi";
import {IConfig} from "config";


export const createServer = (config: IConfig): Server => {
    return new Server({
        port: config.port,
        host: config.host,
    });
};
