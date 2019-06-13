import { Server as HapiServer, ServerRoute } from "hapi";
import { TServerConfig } from "config";
import vision from "vision";
import inert from "inert";

export type TServer = HapiServer;
export type TServerRoute = ServerRoute;

export const createServer = (config: TServerConfig): TServer => {
    return new HapiServer({host: config.host, port: config.port});
}

export const addRoutesToServer = (server: TServer, routes: TServerRoute[]): void => {
    server.route(routes);
}

export const startServer = async (server: TServer) => {
        await server.register([
            { plugin: inert },
            { plugin: vision },
            {
                plugin: require("hapi-swaggered") as any,
                options: {
                    info: {
                        title: "Origami API",
                        description: "REST api для сайта origami",
                        version: "0.0.1"
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
    await server.start();
}

export const stopServer = async (server: TServer): Promise<void> => {
    await server.stop();
}
