import * as request from "supertest";
import { startService, stopService, TService } from "./service";
import { TEST_CONFIG } from "./utils/testing";

describe("Server", () => {
    let service: TService;

    beforeEach(async () => {
        service = await startService(TEST_CONFIG);
    });

    afterEach(async () => {
        await stopService(service);
    });

    describe(".start", () => {
        it("Сервис работает, отвечает 404 по не существующему поинту", async () => {
            await request
                .agent(service.server.info.uri)
                .get('/some-not-existing-point')
                .expect(404);
        });
    });
});
