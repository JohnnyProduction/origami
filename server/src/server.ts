import { Server as HapiServer } from "hapi";
import { IServerConfig } from "config";
import { Database } from "database";
import { Route } from "routes/route";
import vision from "vision";
import inert from "inert";


export class Server {
    private hapiServer: HapiServer;
    private database: Database;

    constructor(
        config: IServerConfig,
        routes: Route[],
        database: Database,
    ) {
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
        this.hapiServer.register([
            { plugin: inert },
            { plugin: vision },
            {
                plugin: require('hapi-swaggered') as any,
                options: {
                    info: {
                        title: 'Example API',
                        description: 'Powered by node, hapi, joi, hapi-swaggered, hapi-swaggered-ui and swagger-ui',
                        version: '1.0'
                    }
                }
            },
            {
                plugin: require("hapi-swaggered-ui") as any,
                options: {
                    title: "Example API",
                    path: "/docs",
                    swaggerEndpoint: "/swagger",
                    authorization: {
                      field: "apiKey",
                      scope: "query",
                      defaultValue: "demoKey",
                      placeholder: "Enter your apiKey here"
                    },
                    swaggerOptions: {}
                }
            },
        ])
        await this.database.open();
        await this.hapiServer.start();
    }

    public async stop() {
        await this.hapiServer.stop();
        await this.database.close();
    }
}
