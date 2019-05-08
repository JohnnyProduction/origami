import * as request from "supertest";
import { createTestServer } from "../utils/testing";
import { AutorRoute } from "./autor";
import { Database } from "../database";
import { AutorModel } from "../model/autor";
import { Server } from "../server";

describe("routes", () => {
    describe("autor", () => {
        let server: Server;

        afterEach(async () => {
            if(server) {
                await server.stop();
            }
        });


        it("Возвращает автора по id", async () => {
            const autorData = {
                id: 5545,
                name: "autor name",
                avatar: "some url",
            }
            server = await createTestServer(async (database: Database) => {
                const autor: AutorModel = await AutorModel.create(autorData);
                await autor.save();
            });
            
            await server.start();
    
            await request
                .agent(server.info.uri)
                .get(`${AutorRoute.PATH}/${autorData.id}`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(autorData));
        });
        it("Возвращает 404 с ошибкой если автора нет", async () => {  
            const autorId = 6666;
            server = await createTestServer();
            
            await server.start();
            
            await request
                .agent(server.info.uri)
                .get(`${AutorRoute.PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Autor with id ${autorId} not found`,
                        code: 404,
                    }
                }));
        });
        it("Создает автора", async () => {
            const autorData = {
                name: "autor name",
                avatar: "some url",
            }
            server = await createTestServer();
            
            await server.start();
    
            const response = await request
                .agent(server.info.uri)
                .post(`${AutorRoute.PATH}?name=${autorData.name}&avatar=${autorData.avatar}`)
                .expect("Content-Type", /json/)
                .expect(201);

            const autor: AutorModel|null = await AutorModel.findOne({ where: autorData });
                
            expect(autor).toBeTruthy();

            if (autor) {
                const expectedBody = {
                    meta: {
                        description: `Autor with name ${autorData.name} was created`,
                        ref: `${AutorRoute.PATH}?id=${autor.id}`,
                    }
                };

                expect(response.body).toEqual(expectedBody);
            }
        }); 
    });
});
