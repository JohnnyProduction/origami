import * as request from "supertest";
import { createTestServer, TestCRUDRoute } from "../utils/testing";
import { AutorRoute } from "./autor";
import { Database } from "../database";
import { AutorModel } from "../model/autor";
import { Server } from "../server";

describe("routes", () => {
    TestCRUDRoute(
        "Autor",
        AutorModel,
        AutorRoute,
        () => ({
            id: 5545,
            name: "autor name",
            avatar: "some url",
        }),
        "Autor",
        ["name", "avatar"],
    );
    describe("autors", () => {
        let server: Server;

        afterEach(async () => {
            if(server) {
                await server.stop();
            }
        });
        
        it("Возвращает 404 с ошибкой если автора нет", async () => {  
            const autorId = 6666;
            server = await createTestServer();
            
            await server.start();
            
            await request
                .agent(server.info.uri)
                .get(`${new AutorRoute().PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Autor with id ${autorId} not found`,
                        code: 404,
                    }
                }));
        });
        it("Должен вернуть 404 при обновлении не существующего автора", async () => {
            server = await createTestServer();
 
            await server.start();

            const newAutorData = {
                id: 111,
                name: "new autor name",
            };
    
            await request
                .agent(server.info.uri)
                .put(`${new AutorRoute().PATH}/${newAutorData.id}?name=${newAutorData.name}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Autor with id ${newAutorData.id} not found`,
                        code: 404,
                    }
                }));
        });
    });
});
