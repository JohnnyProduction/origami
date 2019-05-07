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
const category_1 = require("../model/category");
const category_2 = require("./category");
describe("routes", () => {
    testing_1.TestCRUDRoute("Category", category_1.CategoryModel, category_2.CategoryRoute, () => ({
        id: 5545,
        name: "category name",
        image: "some url",
        rating: 4
    }), "Category", ["name", "image", "rating"]);
    describe("category", () => {
        let server;
        afterEach(() => __awaiter(this, void 0, void 0, function* () {
            if (server) {
                yield server.stop();
            }
        }));
        it("Возвращает 404 с ошибкой если категории нет", () => __awaiter(this, void 0, void 0, function* () {
            const id = 6666;
            server = yield testing_1.createTestServer();
            yield server.start();
            yield request
                .agent(server.info.uri)
                .get(`${new category_2.CategoryRoute().PATH}/${id}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                error: {
                    description: `Category with id ${id} not found`,
                    code: 404,
                }
            }));
        }));
        it("Должен вернуть 404 при обновлении не существующей категории", () => __awaiter(this, void 0, void 0, function* () {
            server = yield testing_1.createTestServer();
            yield server.start();
            const newData = {
                id: 111,
                name: "new category name",
            };
            yield request
                .agent(server.info.uri)
                .put(`${new category_2.CategoryRoute().PATH}/${newData.id}?name=${newData.name}`)
                .expect("Content-Type", /json/)
                .expect(404, JSON.stringify({
                error: {
                    description: `Category with id ${newData.id} not found`,
                    code: 404,
                }
            }));
        }));
    });
});
