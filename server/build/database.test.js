"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
describe("Database", () => {
    describe("open", () => {
        it("Должен удачно открывать соединение", () => __awaiter(this, void 0, void 0, function* () {
            const config = {
                sqlitePath: ":memory:",
            };
            const database = new database_1.Database(config);
            yield database.open();
            yield expect(database.sequelize.authenticate()).resolves.toBeUndefined();
        }));
    });
});
