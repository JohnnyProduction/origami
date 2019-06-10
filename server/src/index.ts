import { Server } from "./server";
import { Database } from "./database";
import { getAllRoutes } from "./routes";
import { CONFIG } from "./config";
import { initAllModels } from "./model";

(async () => {
    process.on('unhandledRejection', (err: any) => {
        console.log(err);

        process.exit(1);
    });

    const database = new Database(CONFIG);

    initAllModels(database);

    const server = new Server(CONFIG, getAllRoutes(database), database);

    await server.start();

    console.log(`server started on ${server.info.uri}`)
})();
