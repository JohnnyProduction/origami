import { Server } from "./server";
import { Database } from "./database";
import { getRoutes } from "./routes";

(async () => {
    process.on('unhandledRejection', (err: any) => {
        console.log(err);

        process.exit(1);
    });

    const database = new Database(CONFIG);
    const server = new Server(CONFIG, getRoutes(database), database);

    await server.start();

    console.log(`server started on ${server.info.uri}`)
})();
