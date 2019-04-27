import * as request from "supertest";
import { CONFIG } from "./config";
import { Server } from "./server";
import { Database } from "./database";

describe("Server", () => {
    describe(".start", () => {
        it("Сервер работает, отвечает 404 по не существующему поинту", async () => {
            const database = new Database(CONFIG);
            const server = new Server(CONFIG, [], database);
            
            await server.start();
    
            const response = await request
                .agent(server.info.uri)
                .get('/some-not-existing-point')
                .expect(404);
    
            server.stop();  
        });
    });
});
