"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = require("hapi");
const vision_1 = __importDefault(require("vision"));
const inert_1 = __importDefault(require("inert"));
class Server {
    constructor(config, routes, database) {
        this.database = database;
        this.hapiServer = new hapi_1.Server({
            port: config.port,
            host: config.host,
        });
        this.hapiServer.route(routes
            .map((route) => route.getHapiRoutes())
            .reduce((acc, cur) => [...acc, ...cur], []));
    }
    get info() {
        return this.hapiServer.info;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.hapiServer.register([
                { plugin: inert_1.default },
                { plugin: vision_1.default },
                {
                    plugin: require("hapi-swaggered"),
                    options: {
                        info: {
                            title: "Origami API",
                            description: "REST api для сайта origami",
                            version: "0.0.1"
                        }
                    }
                },
                {
                    plugin: require("hapi-swaggered-ui"),
                    options: {
                        title: "Example API",
                        path: "/docs",
                        swaggerEndpoint: "/swagger",
                        authorization: {
                            field: "apiKey",
                            scope: "query",
                            defaultValue: "demoKey",
                            placeholder: "Enter your apiKey here"
                        },
                        swaggerOptions: {}
                    }
                },
            ]);
            yield this.database.open();
            yield this.hapiServer.start();
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.hapiServer.stop();
            yield this.database.close();
        });
    }
}
exports.Server = Server;
