import * as request from "supertest";
import { startService, stopService, TService } from "../service";
import { TEST_CONFIG } from "../utils/testing";
import { insertAutor, TAutor, getAutorByCode } from "../model/autor";
import { AUTOR_PATH } from "./autor";

describe("routes", () => {
    describe("autor", () => {
        let service: TService;

        beforeEach(async () => {
            service = await startService(TEST_CONFIG);
        });
    
        afterEach(async () => {
            await stopService(service);
        });

        describe("Read", () => {
            it("Должен возвращать autor по code", async () => {
                const autor: TAutor = {
                    code: "some_code",
                    name: "some name",
                }

                await insertAutor(service.db, autor);

                await request
                    .agent(service.server.info.uri)
                    .get(`${AUTOR_PATH}/${autor.code}`)
                    .set('Accept', 'application/json')
                    .expect("Content-Type", /json/)
                    .expect(200, JSON.stringify(autor));
            });
            // TODO
            // it("Должен возвращать 404 для не существующего автора", async () => {});
        });
        describe("Read", () => {
            it("Должен создавать автора по параметрам", async () => {
                const autor: TAutor = {
                    code: "some_code",
                    name: "some name",
                }

                await request
                    .agent(service.server.info.uri)
                    .post(`${AUTOR_PATH}`)
                    .set('Accept', 'application/json')
                    .send(autor)
                    .expect("Content-Type", /json/)
                    .expect(201);
                
                const actual = await getAutorByCode(service.db, autor.code);    
                
                expect(actual).toEqual(autor);
            });
        });
    });
});
