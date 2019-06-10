import * as request from "supertest";
import { createTestServer } from "./utils/testing";

describe("Server", () => {
    describe(".start", () => {
        it("Сервер работает, отвечает 404 по не существующему поинту", async () => {
            const server = await createTestServer();
            
            await server.start();
    
            await request
                .agent(server.info.uri)
                .get('/some-not-existing-point')
                .expect(404);
    
            server.stop();  
        });
    });
});
