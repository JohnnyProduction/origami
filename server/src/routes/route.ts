import { Database } from "../database";
import { ServerRoute } from "hapi";

export abstract class Route {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    public abstract getHapiRoute(): ServerRoute;
}
