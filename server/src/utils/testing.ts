import { Server } from "../server";
import { Database } from "../database";
import { IConfig } from "config";
import { getAllRoutes } from "../routes";
import { initAllModels } from "../model";
import * as request from "supertest";
import { Route } from "../routes/route";
// import { Model } from "sequelize";

export const TEST_CONFIG: IConfig = {
    host: "localhost",
    port: 8778,
    sqlitePath: ":memory:",
}

export const createTestServer = async (prepareDatabase?: (database: Database) => Promise<void>): Promise<Server> => {
    const database = new Database(TEST_CONFIG);

    initAllModels(database);

    if (prepareDatabase !== undefined) {
        await database.open();
        await prepareDatabase(database);
    }

    const routes = getAllRoutes(database);

    return new Server(TEST_CONFIG, routes, database);
};

const query = (obj: {[key:string]:any}) => {
    let result = "";
    for(let key in obj) {
        result += `${key}=${String(obj[key])}&`;
    }

    return result.slice(0, result.length - 1);
}

export const TestCRUDRoute = <T extends {id: number}>(
    name:string,
    ModelConstructor: any,
    Route: any,
    createItem: () => T,
) => {
    describe(name, () => {
        let server: Server;

        afterEach(async () => {
            if(server) {
                await server.stop();
            }
        });

        it("Возвращает item по id", async () => {
            const item = createItem();
            server = await createTestServer(async (database: Database) => {
                const autor = await ModelConstructor.create(item);
                await autor.save();
            });
            
            await server.start();
    
            await request
                .agent(server.info.uri)
                .get(`${new Route().PATH}/${item.id}`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(item));
        });

        it("Возвращает всех items", async () => {
            const itemsData = [
                createItem(),
            ]
            server = await createTestServer();
            
            await server.start();

            const autor = await ModelConstructor.create(itemsData[0]);
            await autor.save();
    
            await request
                .agent(server.info.uri)
                .get(new Route().PATH)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(itemsData));
        });
        it("Создает item", async () => {
            const itemData = createItem();
            
            delete itemData.id;

            server = await createTestServer();
            
            await server.start();
    
            const response = await request
                .agent(server.info.uri)
                .post(`${new Route().PATH}?${query(itemData)}`)
                .expect("Content-Type", /json/)
                .expect(201);

            const autor = await ModelConstructor.findOne({ where: itemData });
                
            expect(autor).toBeTruthy();

            if (autor) {
                const expectedBody = {
                    meta: {
                        description: `${name} with name ${autor.name} was created`,
                        ref: `${new Route().PATH}?id=${autor.id}`,
                    }
                };

                expect(response.body).toEqual(expectedBody);
            }
        });

        // Берем все имена полей сущности кроме id
        const paramNames = Object.keys(createItem()).filter(key => key !== "id");

        for(let i = 0; i < paramNames.length; i++) {
            it(`Обновляет ${paramNames[i]} item`, async () => {
                server = await createTestServer();
     
                await server.start();
    
                const itemData = createItem();
                delete itemData.id;
    
                const autor = await ModelConstructor.create(itemData);
                await autor.save();
    
                const newParamValue = typeof (itemData as any)[paramNames[i]] === "string" 
                    ? "new param value"
                    : 1211211221;

                const newItemData = {
                    ...autor.toPlain(),
                    [paramNames[i]]: newParamValue,
                };
        
                await request
                    .agent(server.info.uri)
                    .put(`${new Route().PATH}/${autor.id}?${paramNames[i]}=${newItemData[paramNames[i]]}`)
                    .expect("Content-Type", /json/)
                    .expect(200);
                
                await autor.reload();
                    
                expect(autor.toPlain()).toEqual(newItemData);
            });
        }
        
        it("Должен удалить item по id", async () => {
            server = await createTestServer();
 
            await server.start();

            const itemData = createItem();
            delete itemData.id;

            const autor = await ModelConstructor.create(itemData);
            await autor.save();
    
            await request
                .agent(server.info.uri)
                .delete(`${new Route().PATH}/${autor.id}`)
                .expect("Content-Type", /json/)
                .expect(200);
            
            const afterRemoveAutor = await ModelConstructor.findByPk(autor.id);
                
            expect(afterRemoveAutor).toBeNull();
        });
        it("Должен вернуть 404 при удалении не существующего item", async () => {
            server = await createTestServer();
 
            await server.start();

            const autorId = 1111;
    
            await request
                .agent(server.info.uri)
                .delete(`${new Route().PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `${name} with id ${autorId} not found`,
                        code: 404,
                    }
                }));
        });
        it("Возвращает 404 с ошибкой если автора нет", async () => {  
            const autorId = 6666;
            server = await createTestServer();
            
            await server.start();
            
            await request
                .agent(server.info.uri)
                .get(`${new Route().PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `${name} with id ${autorId} not found`,
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
                .put(`${new Route().PATH}/${newAutorData.id}?name=${newAutorData.name}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                    error: {
                        description: `${name} with id ${newAutorData.id} not found`,
                        code: 404,
                    }
                }));
        });
    });    
}