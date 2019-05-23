import * as request from "supertest";
import { createTestServer, TestCRUDRoute } from "../utils/testing";
import { Server } from "../server";
import { CategoryModel } from "../model/category";
import { CategoryRoute } from "./category";

describe("routes", () => {
    TestCRUDRoute(
        "Category",
        CategoryModel,
        CategoryRoute,
        () => ({
            id: 5545,
            name: "category name",
            image: "some url",
            rating: 4
        }),
        "Category",
        ["name", "image", "rating"],
    );
    describe("category", () => {
        let server: Server;

        afterEach(async () => {
            if(server) {
                await server.stop();
            }
        });
        
        it("Возвращает 404 с ошибкой если категории нет", async () => {  
            const id = 6666;
            server = await createTestServer();
            
            await server.start();
            
            await request
                .agent(server.info.uri)
                .get(`${new CategoryRoute().PATH}/${id}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Category with id ${id} not found`,
                        code: 404,
                    }
                }));
        });
        it("Должен вернуть 404 при обновлении не существующей категории", async () => {
            server = await createTestServer();
 
            await server.start();

            const newData = {
                id: 111,
                name: "new category name",
            };
    
            await request
                .agent(server.info.uri)
                .put(`${new CategoryRoute().PATH}/${newData.id}?name=${newData.name}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `Category with id ${newData.id} not found`,
                        code: 404,
                    }
                }));
        });
    });
});
