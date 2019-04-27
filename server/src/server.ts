import { Server as HapiServer } from "hapi";
import { IServerConfig } from "config";
import { Database } from "database";
import { Route } from "routes/route";

export class Server {
    private hapiServer: HapiServer;
    private database: Database;

    constructor(config: IServerConfig, routes: Route[], database: Database) {
        this.database = database;

        this.hapiServer = new HapiServer({
            port: config.port,
            host: config.host,
        });

        this.hapiServer.route(routes.map((route: Route) => route.getHapiRoute()));
    }

    public get info() {
        return this.hapiServer.info;
    }

    public async start() {
        await this.database.open();
        await this.hapiServer.start();
    }

    public async stop() {
        await this.hapiServer.stop();
        await this.database.close();
    }
}
