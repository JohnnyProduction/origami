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
const testing_1 = require("./utils/testing");
describe("Server", () => {
    describe(".start", () => {
        it("Сервер работает, отвечает 404 по не существующему поинту", () => __awaiter(this, void 0, void 0, function* () {
            const server = yield testing_1.createTestServer();
            yield server.start();
            yield request
                .agent(server.info.uri)
                .get('/some-not-existing-point')
                .expect(404);
            yield server.stop();
        }));
    });
});
