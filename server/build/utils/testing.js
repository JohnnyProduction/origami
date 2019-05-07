"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const database_1 = require("../database");
const routes_1 = require("../routes");
const model_1 = require("../model");
const request = __importStar(require("supertest"));
// import { Model } from "sequelize";
exports.TEST_CONFIG = {
    host: "localhost",
    port: 8778,
    sqlitePath: ":memory:",
};
exports.createTestServer = (prepareDatabase) => __awaiter(this, void 0, void 0, function* () {
    const database = new database_1.Database(exports.TEST_CONFIG);
    model_1.initAllModels(database);
    if (prepareDatabase !== undefined) {
        yield database.open();
        yield prepareDatabase(database);
    }
    const routes = routes_1.getAllRoutes(database);
    return new server_1.Server(exports.TEST_CONFIG, routes, database);
});
const query = (obj) => {
    let result = "";
    for (let key in obj) {
        result += `${key}=${String(obj[key])}&`;
    }
    return result.slice(0, result.length - 1);
};
exports.TestCRUDRoute = (name, ModelConstructor, Route, createItem, notFoundName, paramNames) => {
    describe(name, () => {
        let server;
        afterEach(() => __awaiter(this, void 0, void 0, function* () {
            if (server) {
                yield server.stop();
            }
        }));
        it("Возвращает item по id", () => __awaiter(this, void 0, void 0, function* () {
            const item = createItem();
            server = yield exports.createTestServer((database) => __awaiter(this, void 0, void 0, function* () {
                const autor = yield ModelConstructor.create(item);
                yield autor.save();
            }));
            yield server.start();
            yield request
                .agent(server.info.uri)
                .get(`${new Route().PATH}/${item.id}`)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(item));
        }));
        it("Возвращает всех items", () => __awaiter(this, void 0, void 0, function* () {
            const itemsData = [
                createItem(),
            ];
            server = yield exports.createTestServer();
            yield server.start();
            const autor = yield ModelConstructor.create(itemsData[0]);
            yield autor.save();
            yield request
                .agent(server.info.uri)
                .get(new Route().PATH)
                .expect("Content-Type", /json/)
                .expect(200, JSON.stringify(itemsData));
        }));
        it("Создает item", () => __awaiter(this, void 0, void 0, function* () {
            const itemData = createItem();
            delete itemData.id;
            server = yield exports.createTestServer();
            yield server.start();
            const response = yield request
                .agent(server.info.uri)
                .post(`${new Route().PATH}?${query(itemData)}`)
                .expect("Content-Type", /json/)
                .expect(201);
            const autor = yield ModelConstructor.findOne({ where: itemData });
            expect(autor).toBeTruthy();
            if (autor) {
                const expectedBody = {
                    meta: {
                        description: `${notFoundName} with name ${autor.name} was created`,
                        ref: `${new Route().PATH}?id=${autor.id}`,
                    }
                };
                expect(response.body).toEqual(expectedBody);
            }
        }));
        for (let i = 0; i < paramNames.length; i++) {
            it(`Обновляет ${paramNames[i]} item`, () => __awaiter(this, void 0, void 0, function* () {
                server = yield exports.createTestServer();
                yield server.start();
                const itemData = createItem();
                delete itemData.id;
                const autor = yield ModelConstructor.create(itemData);
                yield autor.save();
                const newParamValue = typeof itemData[paramNames[i]] === "string"
                    ? "new param value"
                    : 11;
                const newItemData = Object.assign({}, autor.toPlain(), { [paramNames[i]]: newParamValue });
                yield request
                    .agent(server.info.uri)
                    .put(`${new Route().PATH}/${autor.id}?${paramNames[i]}=${newItemData[paramNames[i]]}`)
                    .expect("Content-Type", /json/)
                    .expect(200);
                yield autor.reload();
                expect(autor.toPlain()).toEqual(newItemData);
            }));
        }
        it("Должен удалить item по id", () => __awaiter(this, void 0, void 0, function* () {
            server = yield exports.createTestServer();
            yield server.start();
            const itemData = createItem();
            delete itemData.id;
            const autor = yield ModelConstructor.create(itemData);
            yield autor.save();
            yield request
                .agent(server.info.uri)
                .delete(`${new Route().PATH}/${autor.id}`)
                .expect("Content-Type", /json/)
                .expect(200);
            const afterRemoveAutor = yield ModelConstructor.findByPk(autor.id);
            expect(afterRemoveAutor).toBeNull();
        }));
        it("Должен вернуть 404 при удалении не существующего item", () => __awaiter(this, void 0, void 0, function* () {
            server = yield exports.createTestServer();
            yield server.start();
            const autorId = 1111;
            yield request
                .agent(server.info.uri)
                .delete(`${new Route().PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                error: {
                    description: `${notFoundName} with id ${autorId} not found`,
                    code: 404,
                }
            }));
        }));
    });
};
