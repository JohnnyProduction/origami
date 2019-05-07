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
const sequelize_1 = require("sequelize");
class Database {
    constructor(config) {
        this.sequelize = new sequelize_1.Sequelize({
            dialect: "sqlite",
            storage: config.sqlitePath,
            logging: false,
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.sync();
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.close();
        });
    }
}
exports.Database = Database;
