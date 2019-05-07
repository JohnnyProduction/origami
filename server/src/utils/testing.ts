import { Server } from "../server";
import { Database } from "../database";
import { IConfig } from "config";
import { getRoutes } from "../routes";
import { initModels } from "../model";

export const TEST_CONFIG:IConfig = {
    host: "localhost",
    port: 8778,
    sqlitePath: ":memory:",
}

export const createTestServer = async (prepareDatabase?: (database: Database) => Promise<void>): Promise<Server> => {
    const database = new Database(TEST_CONFIG);

    initModels(database);

    if (prepareDatabase !== undefined) {
        await database.open();
        await prepareDatabase(database);
    }

    const routes = getRoutes(database);

    return new Server(TEST_CONFIG, routes, database);
};
