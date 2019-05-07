import * as request from "supertest";
import { createTestServer } from "../utils/testing";
import { AutorRoute } from "./autor";
import { Database } from "../database";
import { AutorModel } from "../model/autor";

describe("routes", () => {
    describe("autor", () => {
        it("Сервер работает, отвечает Hello world", async () => {
            const autorData = {
                id: 5545,
                name: "autor name",
                avatar: "some url",
            }
            const server = await createTestServer(async (database: Database) => {
                await AutorModel.create(autorData);
            });
            
            await server.start();
    
            await request
                .agent(server.info.uri)
                .get(`${AutorRoute.PATH}?id=${autorData.id}`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(autorData));

            await server.stop();  
        });
    });
});
