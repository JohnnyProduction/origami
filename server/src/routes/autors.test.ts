import * as request from "supertest";
import { createTestServer } from "../utils/testing";
import { AutorsRoute } from "./autors";
import { Database } from "../database";
import { AutorModel } from "../model/autor";
import { Server } from "../server";

describe("routes", () => {
    describe("autors", () => {
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
                .get(`${AutorsRoute.PATH}/${autorData.id}`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(autorData));
        });
        it("Возвращает 404 с ошибкой если автора нет", async () => {  
            const autorId = 6666;
            server = await createTestServer();
            
            await server.start();
            
            await request
                .agent(server.info.uri)
                .get(`${AutorsRoute.PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Autor with id ${autorId} not found`,
                        code: 404,
                    }
                }));
        });
        it("Возвращает всех авторов", async () => {
            const autorData = [
                {
                    id: 1412,
                    name: "other autor name",
                    avatar: "other url",
                },
            ]
            server = await createTestServer();
            
            await server.start();

            const autor = await AutorModel.create(autorData[0]);
            await autor.save();
    
            await request
                .agent(server.info.uri)
                .get(AutorsRoute.PATH)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(autorData));
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
                .post(`${AutorsRoute.PATH}?name=${autorData.name}&avatar=${autorData.avatar}`)
                .expect("Content-Type", /json/)
                .expect(201);

            const autor: AutorModel|null = await AutorModel.findOne({ where: autorData });
                
            expect(autor).toBeTruthy();

            if (autor) {
                const expectedBody = {
                    meta: {
                        description: `Autor with name ${autorData.name} was created`,
                        ref: `${AutorsRoute.PATH}?id=${autor.id}`,
                    }
                };

                expect(response.body).toEqual(expectedBody);
            }
        });
        it("Обновляет имя автора", async () => {
            server = await createTestServer();
 
            await server.start();

            const autor: AutorModel = await AutorModel.create({
                name: "autor name",
                avatar: "some url",
            });
            await autor.save();

            const newAutorData = {
                ...autor.toPlain(),
                name: "new autor name",
            };
    
            await request
                .agent(server.info.uri)
                .put(`${AutorsRoute.PATH}/${autor.id}?name=${newAutorData.name}`)
                .expect("Content-Type", /json/)
                .expect(200);
            
            await autor.reload();
                
            expect(autor.toPlain()).toEqual(newAutorData);
        });
        it("Обновляет аватар автора", async () => {
            server = await createTestServer();
 
            await server.start();

            const autor: AutorModel = await AutorModel.create({
                name: "autor name",
                avatar: "some url",
            });
            await autor.save();

            const newAutorData = {
                ...autor.toPlain(),
                avatar: "new avatar",
            };
    
            await request
                .agent(server.info.uri)
                .put(`${AutorsRoute.PATH}/${autor.id}?avatar=${newAutorData.avatar}`)
                .expect("Content-Type", /json/)
                .expect(200);
            
            await autor.reload();
                
            expect(autor.toPlain()).toEqual(newAutorData);
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
                .put(`${AutorsRoute.PATH}/${newAutorData.id}?name=${newAutorData.name}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Autor with id ${newAutorData.id} not found`,
                        code: 404,
                    }
                }));
        });
        it("Должен удалить автора по id", async () => {
            server = await createTestServer();
 
            await server.start();

            const autor: AutorModel = await AutorModel.create({
                name: "autor name",
                avatar: "some url",
            });
            await autor.save();
    
            await request
                .agent(server.info.uri)
                .delete(`${AutorsRoute.PATH}/${autor.id}`)
                .expect("Content-Type", /json/)
                .expect(200);
            
            const afterRemoveAutor = await AutorModel.findByPk(autor.id);
                
            expect(afterRemoveAutor).toBeNull();
        });
        it("Должен вернуть 404 при удалении не существующего автора", async () => {
            server = await createTestServer();
 
            await server.start();

            const autorId = 1111;
    
            await request
                .agent(server.info.uri)
                .delete(`${AutorsRoute.PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Autor with id ${autorId} not found`,
                        code: 404,
                    }
                }));
        });
    });
});
