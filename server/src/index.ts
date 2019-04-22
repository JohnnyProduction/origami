import {CONFIG} from "config";
import { createServer } from "./server";


const init = async () => {
    const server = createServer(CONFIG);

    await server.start()

    console.log(`server started on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
