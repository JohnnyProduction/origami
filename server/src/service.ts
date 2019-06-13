import { TDBConnection, openDBConnection, closeDBConnection, applyDBSchema } from "./database";
import { TConfig } from "./config";
import { createServer, TServer, startServer, stopServer, addRoutesToServer } from "./server";
import { createAllRoutes } from "./routes";

export type TService = {
    server: TServer;
    db: TDBConnection;
}

export const startService = async (config: TConfig): Promise<TService> => {
    const db = await openDBConnection(config);

    await applyDBSchema(db);

    const server = createServer(config);

    addRoutesToServer(server, createAllRoutes(db));

    await startServer(server);

    return { server, db };
}

export const stopService = async (service: TService): Promise<void> => {
    await stopServer(service.server);
    await closeDBConnection(service.db);
}