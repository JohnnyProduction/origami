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
        it("Должен вернуть 5 первых элементов при поиске", async () => {
            const from = 0;
            const to = 5;
            const total = 10;
            server = await createTestServer();

            const categories = [];
 
            await server.start();

            for(let i = 0; i < total; i++) {
                const category = await CategoryModel.create({
                    name: `some name ${i}`,
                    image: `some image ${i}`,
                    // немного псевдо хаоса в рейтинг
                    rating: (((i % 7) * 2) % 11),
                });
                await category.save();
                categories.push(category);
            }
    
            await request
                .agent(server.info.uri)
                .get(`${new CategoryRoute().PATH}/search?from=${from}&to=${to}`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify({
                    from,
                    to,
                    total,
                    items: categories.map((category) => category.toPlain()).slice(from, to),
                }));
        });
        it("Должен вернуть 5 первых элементов при поиске с сортировкой", async () => {
            const from = 0;
            const to = 5;
            const total = 10;
            server = await createTestServer();

            const categories = [];
 
            await server.start();

            for(let i = 0; i < total; i++) {
                const category = await CategoryModel.create({
                    name: `some name ${i}`,
                    image: `some image ${i}`,
                    // немного псевдо хаоса в рейтинг
                    rating: (((i % 7) * 2) % 11),
                });
                await category.save();
                categories.push(category);
            }
    
            await request
                .agent(server.info.uri)
                .get(`${new CategoryRoute().PATH}/search?from=${from}&to=${to}&invertSort=true&sortField=rating`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify({
                    from,
                    to,
                    total,
                    items: categories.map((category) => category.toPlain()).sort((a, b) => b.rating - a.rating).slice(from, to),
                }));
        });
        it("Должен вернуть 5 первых отфильтрованных элементов", async () => {
            const from = 0;
            const to = 5;
            const total = 20;
            const name = "1";
            server = await createTestServer();

            const categories = [];
 
            await server.start();

            for(let i = 0; i < total; i++) {
                const category = await CategoryModel.create({
                    name: `some name ${i}`,
                    image: `some image ${i}`,
                    rating: i,
                });
                await category.save();
                categories.push(category);
            }
    
            await request
                .agent(server.info.uri)
                .get(`${new CategoryRoute().PATH}/search?from=${from}&to=${to}&invertSort=true&sortField=rating&name=${name}`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify({
                    from,
                    to,
                    total,
                    items: categories.map((category) => category.toPlain())
                        .filter((category) => category.name.indexOf(name) >= 0)
                        .sort((a, b) => b.rating - a.rating)
                        .slice(from, to),
                }));
        });
    });
});
