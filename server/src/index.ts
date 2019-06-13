import { CONFIG } from "./config";
import { startService, stopService } from "./service";


(async () => {
    process.on('unhandledRejection', async (err: any) => {
        console.log(err);

        process.exit(1);
    });

    const service = await startService(CONFIG);

    console.log(`server started on ${service.server.info.uri}`)
})();
