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
const server_1 = require("./server");
const database_1 = require("./database");
const routes_1 = require("./routes");
const config_1 = require("./config");
const model_1 = require("./model");
(() => __awaiter(this, void 0, void 0, function* () {
    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    });
    const database = new database_1.Database(config_1.CONFIG);
    model_1.initAllModels(database);
    const server = new server_1.Server(config_1.CONFIG, routes_1.getAllRoutes(database), database);
    yield server.start();
    console.log(`server started on ${server.info.uri}`);
}))();
