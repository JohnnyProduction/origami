import { TConfig } from "config";
import { OPEN_READWRITE, OPEN_CREATE } from "sqlite3";

// import { Server } from "../server";
// import { Database } from "../database";
// import { IConfig } from "config";
// import { getAllRoutes } from "../routes";
// import { initAllModels } from "../model";
// import * as request from "supertest";
// import { Route } from "../routes/route";
// // import { Model } from "sequelize";

// export const TEST_CONFIG: IConfig = {
//     host: "localhost",
//     port: 8778,
//     sqlitePath: ":memory:",
// }

// export const createTestServer = async (prepareDatabase?: (database: Database) => Promise<void>): Promise<Server> => {
//     const database = new Database(TEST_CONFIG);

//     initAllModels(database);

//     if (prepareDatabase !== undefined) {
//         await database.open();
//         await prepareDatabase(database);
//     }

//     const routes = getAllRoutes(database);

//     return new Server(TEST_CONFIG, routes, database);
// };

// const query = (obj: {[key:string]:any}) => {
//     let result = "";
//     for(let key in obj) {
//         result += `${key}=${String(obj[key])}&`;
//     }

//     return result.slice(0, result.length - 1);
// }

// // export const testRead = <T extends {code: string}> (name: string, create)


// export const TestCRUDRoute = <T extends {id: number}>(
//     name:string,
//     ModelConstructor: any,
//     Route: any,
//     createItem: () => T,
// ) => {
//     describe(name, () => {
//         it("Должен вернуть 404 при обновлении не существующего автора", async () => {
//             server = await createTestServer();
 
//             await server.start();

//             const newAutorData = {
//                 id: 111,
//                 name: "new autor name",
//             };
    
//             await request
//                 .agent(server.info.uri)
//                 .put(`${new Route().PATH}/${newAutorData.id}?name=${newAutorData.name}`)
//                 .expect("Content-Type", /json/)
//                 .expect(404, JSON.stringify({
//                     error: {
//                         description: `${name} with id ${newAutorData.id} not found`,
//                         code: 404,
//                     }
//                 }));
//         });
//     });    
// }

export const TEST_CONFIG: TConfig = {
    host: "localhost",
    port: 8778,
    sqlitePath: ":memory:",
    sqliteMode: OPEN_READWRITE | OPEN_CREATE,
}
