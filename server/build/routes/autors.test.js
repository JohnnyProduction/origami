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
const request = __importStar(require("supertest"));
const testing_1 = require("../utils/testing");
const autors_1 = require("./autors");
const autor_1 = require("../model/autor");
describe("routes", () => {
    testing_1.TestCRUDRoute("Autor", autor_1.AutorModel, autors_1.AutorsRoute, () => ({
        id: 5545,
        name: "autor name",
        avatar: "some url",
    }), "Autor", ["name", "avatar"]);
    describe("autors", () => {
        let server;
        afterEach(() => __awaiter(this, void 0, void 0, function* () {
            if (server) {
                yield server.stop();
            }
        }));
        it("Возвращает 404 с ошибкой если автора нет", () => __awaiter(this, void 0, void 0, function* () {
            const autorId = 6666;
            server = yield testing_1.createTestServer();
            yield server.start();
            yield request
                .agent(server.info.uri)
                .get(`${new autors_1.AutorsRoute().PATH}/${autorId}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                error: {
                    description: `Autor with id ${autorId} not found`,
                    code: 404,
                }
            }));
        }));
        it("Должен вернуть 404 при обновлении не существующего автора", () => __awaiter(this, void 0, void 0, function* () {
            server = yield testing_1.createTestServer();
            yield server.start();
            const newAutorData = {
                id: 111,
                name: "new autor name",
            };
            yield request
                .agent(server.info.uri)
                .put(`${new autors_1.AutorsRoute().PATH}/${newAutorData.id}?name=${newAutorData.name}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                error: {
                    description: `Autor with id ${newAutorData.id} not found`,
                    code: 404,
                }
            }));
        }));
    });
});
