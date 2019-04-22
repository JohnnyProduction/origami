import * as request from "supertest";
import { CONFIG } from "./config";
import { createServer } from "./server";
import { Server } from "hapi";

describe("createServer", () => {
    let server: Server;

    beforeEach(async () => {
        server = createServer(CONFIG);
        await server.start();
    });
    afterEach(async () => {
        await server.stop();
    });
    it("Созданный сервер работает, отвечает 404 по не существующему поинту", async () => {
        const response = await request
            .agent(server.info.uri)
            .get('/some-not-existing-point')
            .expect(404);
    });
});
